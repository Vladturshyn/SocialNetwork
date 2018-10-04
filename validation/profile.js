const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data){
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle: '';
    data.status = !isEmpty(data.status) ? data.status: '';
    data.skills = !isEmpty(data.skills) ? data.skills: '';


 
    if(!Validator.isLength(data.handle,{min:2, max:30})){
        errors.handle = "Handle needs to between 2 and 30 characters";
    }
    if(Validator.isEmpty(data.handle)){
        errors.handle = "Profile handle is require";
    }
    if(Validator.isEmpty(data.status)){
        errors.status = "Status handle is require";
    }
    if(Validator.isEmpty(data.skills)){
        errors.skills = "Skills handle is require";
    }
    // check if webs field is not empty, and then if url field is valid; 
    if(!isEmpty(data.website)){
        if(!Validator.isURL){
            errors.website = "URL not valid";
        }
    }
    if(!isEmpty(data.youtube)){
        if(!Validator.isURL){
            errors.website = "URL not valid";
        }
    }
    if(!isEmpty(data.tweeter)){
        if(!Validator.isURL){
            errors.website = "URL not valid";
        }
    }
    if(!isEmpty(data.facebook)){
        if(!Validator.isURL){
            errors.website = "URL not valid";
        }
    }
    if(!isEmpty(data.linkidin)){
        if(!Validator.isURL){
            errors.website = "URL not valid";
        }
    }
    if(!isEmpty(data.instagram)){
        if(!Validator.isURL){
            errors.website = "URL not valid";
        }
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};