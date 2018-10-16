// Load Profile models
const Profile = require('../models/Profile');

// Load education validation
const validateEducationInput = require('../validation/education');

const educationController = {};

educationController.addEducation = (request,response)=>{
    const {errors, isValid} = validateEducationInput(request.body);
    if(!isValid){
        return response.status(400).json(errors);
    }
    Profile.findOne({user: request.user.id})
        .then(profile=>{
            const newEducation = {
                school: request.body.school,
                degree: request.body.degree,
                fieldofstudy: request.body.fieldofstudy,
                from: request.body.from,
                to: request.body.to,
                current: request.body.current,
                description: request.body.description
            };
            // Add to experiens to arr
            profile.education.unshift(newEducation);
            profile.save().then(profile => response.json(profile));
        }).catch(err => response.status(404).json(err));
};

educationController.deleteEducation = (request,response)=>{
    Profile.findOne({user: request.user.id})
        .then(profile=>{
            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(request.params.edu_id);

        // delete from array
        profile.experience.splise(removeIndex, 1);
        // save
        profile.save().then(profile => response.json(profile));
        }).catch(err => response.status(404).json(err));
};

module.exports = educationController;