require('dotenv').config();

// const mongoUrl = 'mongodb://localhost/bloglist';
const mongoUrl = process.env.MONGODB_URI; // ToDo
const PORT = process.env.PORT;

module.exports = { mongoUrl, PORT };
