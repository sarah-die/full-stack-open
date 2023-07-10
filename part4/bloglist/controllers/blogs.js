const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// route /api/blogs is defined in app.js
// here only relative routes need to be defined
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body);

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(400).json(error.message);
  }
});

module.exports = blogsRouter;
