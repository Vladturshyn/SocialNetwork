const express = require('express');
const router = express.Router();
const passport = require('passport');

const experienceController = require('../../controller/experienceController');

// Private route. Add experience to user profile.
router.post('/',passport.authenticate('jwt',{session: false}), experienceController.addExp);

// Private route. Remove experience from frofile.
router.delete('/:exp_id', passport.authenticate('jwt',{session: false}), experienceController.deleteExp);

module.exports = router;