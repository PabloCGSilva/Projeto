const blogPost = require('../models/blogPosts')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/img')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

const imageUpload = multer({
    dest: './public/img',
})


module.exports = imageUpload.array('image'), async(req, res) => {
    await blogPost.create({
        ...req.body,
        image: '/img' + imageUpload.name
    })
    res.redirect('/')
}