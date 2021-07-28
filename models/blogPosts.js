const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogPostSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    meta: {
        votes: Number,
        favs: Number
    },
    image: String
});

const blogPost = mongoose.model('blogPost', blogPostSchema);

module.exports = blogPost