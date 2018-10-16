// Post model
const Post = require('../models/Post');
// Profile model
const Profile = require('../models/Profile');
// Validation post
const validatePostInput = require('../validation/post');

const postController = {};

postController.findPosts = (request,response)=>{
    Post.find()
        .sort({date: -1})
        .then(post => response.json(post))
        .catch(err => response.status(404).json({nopostsFound: 'Posts not found'}));
};

postController.findPostById = (request,response)=>{
    Post.findById(request.params.id)
        .then(post => response.json(post))
        .catch(err => response.status(404).json({nopostsFound: 'Post not found with thet ID'}));
};

postController.createPost = (request,response) => {
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
};

postController.deletePostById = (request,response) => {
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
                    post.remove().then(()=> response.json({success: true}))
                })
                .catch(err => response.status(404).json({postnotFound: 'Post not found'}));
        })
};


module.exports = postController;