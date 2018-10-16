const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../config/keys');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Load Registration input validation
const validateRegisterInput = require('../validation/register');

// Loda Login input validation
const validateLoginInput = require('../validation/login');

const userController = {};

userController.registrationUser = (request, response) =>{
    const {errors, isValid} = validateRegisterInput(request.body);
    // Chack validation
    if(!isValid){
        return response.status(400).json(errors);
    }
    User.findOne({email: request.body.email}).then(user =>{
        if(user) {
            errors.email = "Email already exists";
            response.status(400).json({errors})
        }else {
            // Use gravatar lyb. Use email avatar
            const avatar = gravatar.url(request.body.email, {
                s:'200', // Size
                r: 'pg', // Rating
                d: 'mm'  // Default v
            })
            const newUser = new User({
                name: request.body.name,
                password: request.body.password,
                avatar: request.body.avatar,
                email: request.body.email
            })
            // Password hash. Use bcrypt
            bcrypt.genSalt(10, (err,salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => response.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
};

userController.loginUser = (request, response) =>{
    // Chack validation
    const {errors, isValid} = validateLoginInput(request.body);
    if(!isValid){
        return response.status(400).json(errors);
    }
    const email = request.body.email;
    const password = request.body.password;
    // Check user
    User.findOne({email})
        .then(user =>{
            errors.email = "User not found";
            if(!user){
                response.status(404).json(errors);
            }
            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if(isMatch){
                        // User Matched
                        // Create JWT Payload
                        const payload = { id: user.id, name: user.name, avatar: user.avatar };
                        // Sign TOKEN
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) =>{
                                response.json({ succses: true, token: 'Bearer ' + token })
                            });
                    }else{
                        // errors.password = "Password incorrect";
                        response.status(404).json({password: "Password incorrect"});
                    }
                }).catch(err => console.log(err));
        });
};

userController.current = (request, response) =>{
    response.json({
        id: request.user.id,
        name: request.user.name,
        email: request.user.email
    });
};
module.exports = userController;