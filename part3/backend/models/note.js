// define a new node module
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// access environment variable
// imp! add environment variables to render.com
const url = process.env.MONGODB_URI;
console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// modify objects returned by mongoose configuring the options of the schema using .set(option, value)
// 1. _id (object) to id (string)
// 2. remove --v (versioning field)
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
// export default mongoose.model("Note", noteSchema);
// public interface of the new module
module.exports = mongoose.model("Note", noteSchema);

// use like this:
// const Note = require('./models/note')
