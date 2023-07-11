const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const bcrypt = require('bcrypt');

const api = supertest(app);
const User = require('../models/user');

describe('when there is initally one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', name: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'username',
      name: 'Matti Luukkainen',
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'password',
    };

    const result = await api.post('/api/users').send(newUser).expect(400);

    // console.log('username taken error', result.body.error);

    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
  test('creation fails with proper statuscode and message if password is missing', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
    };

    const result = await api.post('/api/users').send(newUser).expect(400);
    console.log('pw missing error', result.body.error);

    expect(result.body.error).toContain('password invalid');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'ts',
      name: 'name',
      password: 'password',
    };

    const result = await api.post('/api/users').send(newUser).expect(400);
    console.log('too short error', result.body.error);

    expect(result.body.error).toContain('User validation failed');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
