const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation profile
const validateProfileInput = require('../../validation/profile');

// Load Profile models
const Profile = require('../../models/Profile');

// Load User models
const User = require('../../models/User');

// create private route to profile
router.get('/', 
    passport.authenticate('jwt', { session: false } ), 
    (request, response) => {
        const errors = {};
        Profile.findOne({user: request.user.id})
            .populate('user', ['name','avatar'])
            .then(profile =>{
                if(!profile){
                    errors.noprofile = "no profile";
                    return response.status(404).json(errors);
                }else{
                    response.json(profile);
                }
            }).catch(err => response.status(404).json(errors));
});

// create public route to profile by handle
router.get('/handle/:handle', (request,response) => {
    const errors = {};
    Profile.findOne({ handle: request.params.handle})
        .populate('user', ['name','avatar'])
        .then(profile =>{
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                response.status(404).json(errors);   
            }
            response.json(profile);
        })
        .catch(err => response.status(404).json(err));
});

// create public route to profile by user.id
router.get('/user/:user_id', (request,response) => {
    const errors = {};
    Profile.findOne({ user: request.params.user_id})
        .populate('user', ['name','avatar'])
        .then(profile =>{
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                response.status(404).json(errors);   
            }
            response.json(profile);
        })
        .catch(err => response.status(404).json({profile: 'There is no profile for this user'}));
});

// create public route to all profiles
router.get('/all', (request,response) => {
    const errors = {};
    Profile.find()
        .populate('user', ['name','avatar'])
        .then(profiles =>{
            if(!profiles){
                errors.noprofiles = 'There is no profiles';
                response.status(404).json(errors);   
            }
            response.json(profiles);
        })
        .catch(err => response.status(404).json({profiles: 'There is no profile for this user'}));
});

// create user profile
router.post('/', 
    passport.authenticate('jwt', { session: false } ),
    (request, response)=>{
    
    const {errors, isValid} = validateProfileInput(request.body);

    // check validation
    if(!isValid){
        // return
        return response.status(400).json(errors);
    }
    // get fields
    const profileFields = {};
    profileFields.user = request.user.id;
    if(request.body.handle) profileFields.handle = request.body.handle;
    if(request.body.company) profileFields.company = request.body.company;
    if(request.body.website) profileFields.website = request.body.website;
    if(request.body.location) profileFields.location = request.body.location;
    if(request.body.status) profileFields.status = request.body.status;
    if(request.body.bio) profileFields.bio = request.body.bio;
    if(request.body.githubsurname) profileFields.githubsurname = request.body.githubsurname;
    // skils - split into arr
    if(typeof request.body.skills !== 'undefined'){
        profileFields.skills = request.body.skills.split(',');
    }
    // social
    profileFields.social = {};
    if(request.body.youtube) profileFields.social.youtube = request.body.youtube;
    if(request.body.tweeter) profileFields.social.tweeter = request.body.tweeter;
    if(request.body.facebook) profileFields.social.facebook = request.body.facebook;
    if(request.body.instagram) profileFields.social.instagram = request.body.instagram;
    if(request.body.linkedin) profileFields.social.linkedin = request.body.linkedin;

    Profile.findOne({user: request.user.id})
        .then(profile =>{
            if(profile){
                Profile.findOneAndUpdate(
                    { user: request.user.id },
                    { $set: profileFields },
                    {new: true})
                    .then(profile => response.json(profile));
            }else{
                // check handle exists
                Profile.findOne({ handle: profileFields.handle }).then(profile =>{
                    if(profile){
                        errors.handle = "This handle already exists";
                        response.status(400).json(errors)
                    }
                    // save profile
                    new Profile(profileFields).save().then(profile => response.json(profile));
                });
            }
        });
});

// delete profile & user
router.delete('/',
    passport.authenticate('jwt',{session: false}),
        (request,response)=>{
            Profile.findOneAndRemove({user: request.user.id})
                .then(()=>{
                    User.findOneAndRemove({_id: request.user.id})
                        .then(()=>{
                            response.json({success: true});
                        })
                })
        })



module.exports = router;