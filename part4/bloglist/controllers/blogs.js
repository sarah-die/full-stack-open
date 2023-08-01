const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');
const { isString } = require('lodash');

// route /api/blogs is defined in app.js
// here only relative routes need to be defined
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;

  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  // compare user-object
  if (blog.user.toString() === request.userId) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(403).json({ error: 'unauthorized' });
  }
});

// 5.9
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const newBlog = {
    user: isString(body.user) ? body.user : body.user.id,
    likes: body.likes,
    author: body.author,
    title: body.title,
    url: body.url,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });
  response.json(updatedBlog);
});

// Part 7.18
blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body;

  console.log('blogsRouter body: ', body);
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      $push: { comments: body.comment },
    },
    {
      new: true,
    },
  );
  console.log('blogsrouter updatedBlog: ', updatedBlog);
  response.json(updatedBlog);
});

module.exports = blogsRouter;
