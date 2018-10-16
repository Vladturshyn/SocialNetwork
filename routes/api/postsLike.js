const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const likeController = require('../../controller/likeController');

// Private route. Like the posts
router.post('/like/:id',passport.authenticate('jwt',{session: false}), likeController.likePost);

// Private route. Dislike the posts
router.post('/unlike/:id',passport.authenticate('jwt',{session: false}),likeController.dislikePost);

module.exports = router;