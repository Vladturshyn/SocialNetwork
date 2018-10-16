const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const commentController = require('../../controller/commentController');

// Private route. Find post by id and create comment 
router.post('/:id', passport.authenticate('jwt',{session: false}), commentController.createComment);

// Private route. Find comment and delete.
router.delete('/:id/:comment_id',passport.authenticate('jwt',{session: false}),commentController.deleteComment);

module.exports = router;