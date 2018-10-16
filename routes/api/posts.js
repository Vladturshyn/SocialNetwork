const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const postController = require('../../controller/postController');

// Public route. Get to posts
router.get('/', postController.findPosts);

// Public route. Get to post by id
router.get('/:id', postController.findPostById);

// Private route. Create new post
router.post('/',passport.authenticate('jwt',{session: false}), postController.createPost);

// Private route. Delete post by id
router.delete('/:id',passport.authenticate('jwt',{session: false}), postController.deletePostById);

module.exports = router;