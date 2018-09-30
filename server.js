const express = require('express');
const mongoose = require('mongoose'); 

const app = express();

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

// BD config
const db = require('./config/keys').mongoURI;
// Connect to MongoBD
mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(()=>{console.log('connected succsess')})
    .catch(()=>{console.log('erorr')})

app.get("/", (request, response)=>{
    response.send('nullssss');
});

// Use routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);


const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`));