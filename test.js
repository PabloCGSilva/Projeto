const mongoose = require('mongoose')

const blogPost = require('./models/blogPosts')

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

/*blogPost.create({
title: 'ok',
    author: 'Pablo',
    body: 'ok',

}, (error, blogPost) => { console.log(error, blogPost) })*/

blogPost.find({ title: 'ok ' }, (error, blogPost) => { console.log(error, blogPost) })