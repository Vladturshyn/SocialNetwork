const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create user schema constructor
const UserSchema = new Schema({
   name: {
    type: String,
    required: true
   },
   email: {
    type: String,
    required: true
   },
   avatar: {
    type: String
   },
   password: {
    type: String,
    required: true
   },
   date: {
    type: Date,
    default: Date.now
   }
})

module.exports = user = mongoose.model('users', UserSchema);