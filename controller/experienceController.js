// Load Profile models
const Profile = require('../models/Profile');

// Load experience validation
const validateExperienceInput = require('../validation/experience');

const experienceController = {};

experienceController.addExp = (request,response) =>{
    // Experience validation
    const {errors, isValid} = validateExperienceInput(request.body);
    if(!isValid){
        return response.status(400).json(errors);
    }
    Profile.findOne({user: request.user.id})
        .then(profile =>{
            const newExperience = {
                title: request.body.title,
                location: request.body.location,
                company: request.body.company,
                from: request.body.from,
                to: request.body.to,
                current: request.body.current,
                description: request.body.description,
            };
            // Add to experiens arr
            profile.experience.unshift(newExperience);
            profile.save().then(profile => response.json(profile));
        }).catch(err => response.status(404).json(err));
};

experienceController.deleteExp = (request,response) =>{
    Profile.findOne({user: request.user.id})
        .then(profile =>{
            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(request.params.exp_id)
            // Delete from array
            profile.experience.splice(removeIndex, 1);
            // Save
            profile.save().then(profile => response.json(profile));

        }).catch(err => response.status(404).json(err));
};

module.exports = experienceController;