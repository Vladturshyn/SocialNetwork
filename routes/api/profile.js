const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile models
const Profile = require('../../models/Profile');
// Load User Profile models
const User = require('../../models/User');
// Get user profile
router.get('/', 
    passport.authenticate('jwt', { session: false } ),
    (request, response)=>{
    const errors = {};
    Profile.findOne({user: request.user.id})
        .then(profile =>{
            errors.noprofile = "There is no profile for this user"
            if(!profile){
                response.status(404).json(errors);
            }else{
                response.json(profile);
            }
        }).catch(err => console.log(err));
})
module.exports = router;