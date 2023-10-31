const express=require('express')

const blog=express.Router()

const blog_stats=require('../controller/blog_stats');

blog.get('/blog-stats',blog_stats.getBlogs)
blog.get('/blog-search',blog_stats.searchBlog)




module.exports=blog