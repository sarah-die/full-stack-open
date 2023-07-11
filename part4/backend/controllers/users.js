// router for dealing with users

const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  // populate: join queries to get users and related notes
  // use mongo syntax to select specific fields
  const users = await User.find({}).populate('notes', {
    content: 1,
    important: 1,
  });
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // The password sent in the request is not stored in the database.
  // We store the hash of the password that is generated with the bcrypt.hash function.
  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
