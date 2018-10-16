const express = require('express');
const router = express.Router();
const passport = require('passport');

const profileController = require('../../controller/profileController');

// Private route. Create user profile
router.post('/', passport.authenticate('jwt', {session: false}), profileController.createProfile);

// Private route. Show user profile
router.get('/', passport.authenticate('jwt', {session: false}), profileController.listProfile);

// Public route. Show profile by handle
router.get('/handle/:handle', profileController.handleList);

// Public route. Show profile by user.id
router.get('/user/:user_id', profileController.listProfileById);

// Public route. Show all profiles
router.get('/all', profileController.listAllProfiles );
    
// Private route. Remove profile & user
router.delete('/', passport.authenticate('jwt',{session: false}), profileController.deleteProfileAndUser);

module.exports = router;