const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  // login via username and password
  const { username, password } = request.body;

  // check if user exists
  const user = await User.findOne({ username });

  // pw correct
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  // password incorrect / user nonexistent
  // 401 = unauthorized
  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
