const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const keys = require('../../config/keys');

// load user model
const User = require('../../models/User');

//  register new user. add to db new user. hashing password bcrypto
router.post('/register', (request, response) => {
    User.findOne({email: request.body.email})
        .then(user => {
            if(user){
                response.status(400).json({email:'email already existed'})
            }else{
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

// log user & check password
router.post('/login', (request, response) => {

    const email = request.body.email;
    const password = request.body.password;

    //check user
    User.findOne({email})
        .then(user => {
            if(!user){
                response.status(404).json({email: "user not found"})
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
                        return response.json({password: 'password is incorect'})
                    }
                })
        })
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