const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const like = require('./routes/api/postsLike');
const comment = require('./routes/api/postsComment');
const experience = require('./routes/api/profileExperience');
const education = require('./routes/api/profileEducation');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// BD config
const db = require('./config/keys').mongoURI;
// Connect to MongoBD
mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(()=>{console.log('connected succsess')})
    .catch(()=>{console.log('erorr')});
    
// Passport middleware
app.use(passport.initialize());

// Pasport Config (strategy)
require('./config/passport')(passport);

// Use routes
app.use('/api/profile', profile);
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/posts', like);
app.use('/api/posts/comment', comment);
app.use('/api/profile/experience', experience);
app.use('/api/profile/education', education);


const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`));