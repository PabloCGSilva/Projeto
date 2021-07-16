const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb')
const blogPost = require('./models/blogPosts')
const fileUpload = require('express-fileupload')

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

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload())

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

app.post('/posts/store', async(req, res) => {
    let image = req.files.image
    image.mv(path.resolve(__dirname, './public/img', image.name),
        async(error) => {
            await blogPost.create(req.body);
            res.redirect('/')
        })

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})