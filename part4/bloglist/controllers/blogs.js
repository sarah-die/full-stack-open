const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

// route /api/blogs is defined in app.js
// here only relative routes need to be defined
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body;

    const users = await User.find({});

    console.log('TADDDDDDDAA', users);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: users[0].id,
    });

    const savedBlog = await blog.save();

    users[0].blogs = users[0].blogs.concat(savedBlog._id);
    await users[0].save();

    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(400).json(error.message);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
