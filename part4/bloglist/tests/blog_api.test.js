const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

// 4.8
test('right amount of blogs is returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

// 4.9
test('unique identifier is named id and exists', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

// 4.10
test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  };

  // verify that content is saved correctly to db
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  // total number is increased by one
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  // verify that content is saved correctly to db
  expect(blogsAtEnd[blogsAtEnd.length - 1]).toMatchObject(newBlog);
});

// 4.11*
test('if likes property is missing from the request, it wil default to value 0', async () => {
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  };

  await api.post('/api/blogs').send(newBlog).expect(201);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
});

// 4.12*
describe('creating new blogs', () => {
  const missingTitle = {
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  };

  const missingUrl = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    likes: 2,
  };

  test('does the backend respond with status 400 when title is missing', async () => {
    const response = await api
      .post('/api/blogs')
      .send(missingTitle)
      .expect(400);
    console.log('title', response.status, 'text', response.text);
  });

  test('does the backend respond with status 400 when url is missing', async () => {
    const response = await api.post('/api/blogs').send(missingUrl).expect(400);
    console.log('url', response.status, 'text', response.text);
  });
});

describe('deleting a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  });
  test('blog was removed from db', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const title = blogsAtEnd.map((b) => b.title);
    expect(title).not.toContain(blogToDelete.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
