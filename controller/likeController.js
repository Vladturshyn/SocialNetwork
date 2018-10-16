// Post model
const Post = require('../models/Post');
// Profile model
const Profile = require('../models/Profile');
// Validation post

const likeController = {};

postController.findPosts = (request,response)=>{
    Post.find()
        .sort({date: -1})
        .then(post => response.json(post))
        .catch(err => response.status(404).json({nopostsFound: 'Posts not found'}));
};

module.exports = likeController;