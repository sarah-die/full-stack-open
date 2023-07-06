const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

// ? set options for blogSchema
// blogSchema.set();

module.exports = mongoose.model('Blog', blogSchema);
