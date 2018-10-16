// Post model
const Post = require('../models/Post');
// Profile model
const Profile = require('../models/Profile');

const likeController = {};

likeController.likePost = (request,response) => {
    Profile.findOne({user: request.user.id})
        .then(profile=>{
            Post.findById(request.params.id)
                .then(post => {
                   if(post.likes.filter(like => like.user.toString() === request.user.id).length > 0) {
                        return response.status(400).json({alreadyLiked:'Post already liked this post'})
                   }
                   // Add user id to like array
                   post.likes.unshift({ user: request.user.id });
                   // save it to the db
                   post.save().then(post => response.json(post));
                })
                .catch(err => response.status(404).json({postnotFound: 'Post not found'}));
        })
};
likeController.dislikePost = (request,response) => {
    Profile.findOne({user: request.user.id})
        .then(profile=>{
            Post.findById(request.params.id)
                .then(post => {
                    // If length === 0, it means that user not in post.like array yet
                   if(post.likes.filter(like => like.user.toString() === request.user.id).length === 0) {
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
}        

module.exports = likeController;