const express = require('express');
const router = express.Router();
const passport = require('passport');

const educationController = require('../../controller/educationController');

// Private route. Add education to profile
router.post('/', passport.authenticate('jwt',{session: false}), educationController.addEducation);

// Private route. Remove education from profile
router.delete('/:edu_id', passport.authenticate('jwt',{session: false}), educationController.deleteEducation);

module.exports = router;