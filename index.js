const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb')
const fs = require('fs');
const morgan = require('morgan');

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


// Set middlewares

app.use(express.static(__dirname + './public/img'));
app.use('./public/img', express.static('./public/img'));
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// Create multer object


//app.use(fileUpload())

//app.use(busboy());

const homeController = require('./controller/home')

app.get('/', homeController)


const newPostController = require(`./controller/newPost`)

app.get('/posts/new', newPostController)


const getPostController = require(`./controller/getPost`)

app.get('/post/:id', getPostController)

const storePostController = require(`./controller/storePost`)

app.get('/posts/store', storePostController)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})