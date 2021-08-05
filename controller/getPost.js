const blogPost = require('../models/blogPosts')

module.exports = async(req, res) => {
    const blogposts = await blogPost.findById(req.params.id)
    res.render('post', { blogposts })
}