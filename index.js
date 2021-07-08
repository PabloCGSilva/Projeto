const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const ejs = require('ejs')

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    //    res.sendFile(path.join(__dirname + '/pages/index.html'));
    res.render('index')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post', (req, res) => {
    res.render('post')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})