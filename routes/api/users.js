const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const keys = require('../../config/keys');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load user model
const User = require('../../models/User');

//  Register new user. add to db new user. hashing password bcrypto. validation
router.post('/register', (request, response) => {
    const {errors, isValid} = validateRegisterInput(request.body);

    //Chack validation
    if(!isValid){
        return response.status(400).json(errors);
    }

    User.findOne({email: request.body.email}).then(user => {
        if(user) {
            errors.email = "Email already exists";
            response.status(400).json({errors})
        }else {
            // use gravatar lyb. use email avatar
            const avatar = gravatar.url(request.body.email, {
                s:'200', // size
                r: 'pg', // rating
                d: 'mm'  // default v
            })
            const newUser = new User({
                name: request.body.name,
                password: request.body.password,
                avatar: request.body.avatar,
                email: request.body.email
            })
            // password hash use bcrypt
            bcrypt.genSalt(10, (err,salt) => {
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
});

// log user & check password. validation
router.post('/login', (request, response) => {
     //Chack validation
    const {errors, isValid} = validateLoginInput(request.body);

    if(!isValid){
        return response.status(400).json(errors);
    }

    const email = request.body.email;
    const password = request.body.password;
    //check user
    User.findOne({email})
        .then(user => {
            errors.email = "User not found";
            if(!user){
                response.status(404).json(errors);
            }
            //check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        // User Matched
                        // Create JWT Payload
                        const payload = { id: user.id, name: user.name, avatar: user.avatar };
                        // Sign TOKEN
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600},
                            (err, token) => {
                                response.json({ succses: true, token: 'Bearer ' + token })
                            });
                    }else{
                        // errors.password = "Password incorrect";
                        response.status(404).json({password: "Password incorrect"});
                    }
                }).catch(err => console.log(err));
        });
});

// access privat. current route
router.get('/current', 
    passport.authenticate('jwt', {session: false}),
    (request, response) => {
        response.json({
            id: request.user.id,
            name: request.user.name,
            email: request.user.email
        });
});

module.exports = router;