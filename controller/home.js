const blogPost = require('../models/blogPosts')


module.exports = async(req, res) => {
    const blogposts = await blogPost.find({})
    console.log(blogposts)
    res.render('index', { blogposts })
}