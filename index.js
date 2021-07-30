const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb')
const blogPost = require('./models/blogPosts')
    //const fileUpload = require('express-fileupload')
const fs = require('fs');
const morgan = require('morgan');

//const busboy = require('connect-busboy');
const multer = require('multer')
    //const bp = require('body-parser')


mongoose.connect('mongodb://localhost/my_database')

const url = 'mongodb://localhost/my_database'

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected to ' + url);
        db.close();
    }
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/img')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

// Set middlewares

app.use(express.static(__dirname + './public/img'));
app.use('./public/img', express.static('./public/img'));
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// Create multer object
const imageUpload = multer({
    dest: './public/img',
})

//app.use(fileUpload())

//app.use(busboy());

app.get('/', async(req, res) => {
    const blogposts = await blogPost.find({})
    console.log(blogposts)
    res.render('index', { blogposts })
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post/:id', async(req, res) => {
    const blogposts = await blogPost.findById(req.params.id)
    res.render('post', { blogposts })
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

/*
app.post('/posts/store', (req, res) => {
    blogPost.create(req.body)
    res.redirect('/')
})*/

app.post('/posts/store', imageUpload.array('image'), async(req, res) => {
    await blogPost.create({
        ...req.body,
        image: '/img' + imageUpload.name
    })
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})