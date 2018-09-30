const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');

// load user model
const User = require('../../models/User');

router.get('/test', (request,response)=>{
    response.json({ms:'user'})
});

router.post('/register', (request, response) => {
    User.findOne({email: request.body.email})
        .then(user => {
            if(user){
                response.status(400).json({email:'email already existed'})
            }else{
                // use gravatar lyb
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
})
module.exports = router;