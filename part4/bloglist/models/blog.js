const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

// ? set options for blogSchema ToDo
// blogSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     // returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//     delete returnedObject.url;
//   },
// });

module.exports = mongoose.model('Blog', blogSchema);
