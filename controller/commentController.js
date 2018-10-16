// Post model
const Post = require('../models/Post');
// Profile model
const Profile = require('../models/Profile');

const commentController = {};

// Validation post
const validatePostInput = require('../validation/post');

commentController.createComment = (request,response) => {
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
            post.comments.unshift(newComment);
            // Save comment
            post.save().then(()=>response.json(post));
        })
        .catch(err => response.status(404).json({nopost: 'Post not found'}));
}

commentController.deleteComment = (request,response) => {
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
}

module.exports = commentController;