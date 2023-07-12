const logger = require('./logger');
const jwt = require('jsonwebtoken');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// 4.20*
// middleware to isolate token from header
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization) {
    if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '');

      // check validity from token
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' });
      }

      request.userId = decodedToken.id;
    } else {
      // return to stop following middleware from executing
      return response
        .status(401)
        .json({ error: 'invalid authorization schema' });
    }
  }

  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  // title or url are missing -> ValidationError -> 400 bad request (4.12*)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  tokenExtractor,
  errorHandler,
};
