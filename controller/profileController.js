// Load validation profile
const validateProfileInput = require('../validation/profile');

// Load Profile models
const Profile = require('../models/Profile');

// Load User models
const User = require('../models/User');

const profileController = {};

profileController.createProfile = (request, response)=>{
    const {errors, isValid} = validateProfileInput(request.body);
    // Check validation
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
                // Check handle exists
                Profile.findOne({ handle: profileFields.handle }).then(profile =>{
                    if(profile){
                        errors.handle = "This handle already exists";
                        response.status(400).json(errors)
                    }
                    // Save profile
                    new Profile(profileFields).save().then(profile => response.json(profile));
                });
            }
        });
};

profileController.listProfile = (request, response) => {
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
};

profileController.handleList = (request,response) => {
    const errors = {};
    Profile.findOne({ handle: request.params.handle})
        .populate('user', ['name','avatar'])
        .then(profile =>{
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                response.status(404).json(errors);   
            }
            response.json(profile);
        });
};

profileController.listProfileById = (request,response) => {
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
};

profileController.listAllProfiles = (request,response) => {
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
};

profileController.deleteProfileAndUser = (request,response)=>{
    Profile.findOneAndRemove({user: request.user.id})
        .then(()=>{
            User.findOneAndRemove({_id: request.user.id})
                .then(()=>{
                    response.json({success: true});
                })
        })
};


module.exports = profileController;