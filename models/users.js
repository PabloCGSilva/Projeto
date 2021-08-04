const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    mobile: String,
    profilepic: String
});

const user = mongoose.model('user', userSchema);

module.exports = user