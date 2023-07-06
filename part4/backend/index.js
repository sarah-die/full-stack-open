const app = require('./app'); // the actual Express application
const config = require('./utils/config');
const logger = require('./utils/logger');

app.listen(config.PORT, () => {
  // use logger to printout information
  logger.info(`Server running on port ${config.PORT}`);
});
