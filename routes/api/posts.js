const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Profile model

// Validation post
const validatePostInput = require('../../validation/post');

// Public route to posts
router.get('/', (request,response)=>{
    Post.find()
        .sort({date: -1})
        .then(post => response.json(post))
        .catch(err => response.status(404).json({nopostsFound: 'Posts not found'}));
});

// Public route to post by id
router.get('/:id', (request,response)=>{
    Post.findById(request.params.id)
        .then(post => response.json(post))
        .catch(err => response.status(404).json({nopostsFound: 'Post not found with thet ID'}));
});

// Private route. create new post
router.post('/', 
    passport.authenticate('jwt',{session: false}),
    (request,response) => {

        const {errors, isValid} = validatePostInput(request.body);

        if(!isValid){
            return response.status(400).json(errors);
        }
        const newPost = new Post({
            text: request.body.text,
            name: request.body.name,
            avatar: request.body.avatar,
            user: request.user.id
        });
        newPost.save().then(post => response.json(post));
});

// Delete post. private route
router.delete('/:id', 
    passport.authenticate('jwt',{session: false}),
    (request,response) => {
        Profile.findOne({user: request.user.id})
            .then(profile=>{
                Post.findById(request.params.id)
                    .then(post => {
                        console.log(post);
                        // Chech post owner (user id != post.user)
                        if(post.user.toString() !== request.user.id){
                            return response.status(401).json({noauth: 'User not authrorize'});
                        }
                        // Delete
                        Post.remove().then(()=> response.json({success: true}))
                    })
                    .catch(err => response.status(404).json({postnotFound: 'Post not found'}));
            })
    });

// Private route for like the posts
router.post('/like/:id',
    passport.authenticate('jwt',{session: false}),
    (request,response) => {
        Profile.findOne({user: request.user.id})
            .then(profile=>{
                Post.findById(request.params.id)
                    .then(post => {
                       if(post.like.filter(like => like.user.toString() === request.user.id).length > 0) {
                            return response.status(400).json({alreadyLiked:'Post already liked this post'})
                       }
                       // Add user id to like array
                       post.like.unshift({ user: request.user.id });
                       // save it to the db
                       post.save().then(post => response.json(post));
                    })
                    .catch(err => response.status(404).json({postnotFound: 'Post not found'}));
            })
});

// Private route for unlike the posts
router.post('/unlike/:id',
    passport.authenticate('jwt',{session: false}),
    (request,response) => {
        Profile.findOne({user: request.user.id})
            .then(profile=>{
                Post.findById(request.params.id)
                    .then(post => {
                        // If length === 0, it means that user not in post.like array yet
                       if(post.like.filter(like => like.user.toString() === request.user.id).length === 0) {
                            return response.status(400).json({notLiked:'You have not liked this post'})
                       }
                       // Get remove index
                       const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(request.user.id);

                       // Splice out of arr
                       post.likes.splice(removeIndex, 1);

                       // Save it
                       post.save().then(()=> response.json(post));
                    })
                    .catch(err => response.status(404).json({postnotFound: 'Post not found'}));
            })
});

// Comment create. Private route
router.post('/comment/:id',
    passport.authenticate('jwt',{session: false}),
    (request,response) => {
        // Chack validation comment
        const {errors, isValid} = validatePostInput(request.body);

        if(!isValid){
            return response.status(400).json(errors);
        }

        Post.findById(request.params.id)
            .then(post => {
                const newComment = {
                    text: request.body.text,
                    name: request.body.name,
                    avatar: request.body.avatar,
                    user: request.user.id
                };
                // Add to array new comment
                post.comment.unshift(newComment);
                // Save comment
                post.save().then(()=>response.json(post));
            })
            .catch(err => response.status(404).json({nopost: 'Post not found'}));
});

// Delete Comment. Private route
router.delete('/comment/:id/:comment_id',
    passport.authenticate('jwt',{session: false}),
    (request,response) => {
        Post.findById(request.params.id)
            .then(post => {
                // Chack to see if comment exists
                if(post.comments.filter(comment => comment._id.toString() === request.params.comment_id).length === 0){
                    return response.status(404).json({commentnotexist: 'Comment dose not exist'})
                }
                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(request.params._id);
                
                // Splice from array
                post.comments.splice(removeIndex,1);
                
                // Save
                post.save().then(()=>response.json(post));
            })
            .catch(err => response.status(404).json({nopost: 'Post not found'}));
});

module.exports = router;