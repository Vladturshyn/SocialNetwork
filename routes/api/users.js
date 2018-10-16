const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../../controller/userController')

// Public route. Register new user. hashing password (bcrypto).
router.post('/register', userController.registrationUser);

// Public route. Log user & check password. compare password
router.post('/login', userController.loginUser);

// Private route. Current
router.get('/current',passport.authenticate('jwt', {session: false}), userController.current);

module.exports = router;