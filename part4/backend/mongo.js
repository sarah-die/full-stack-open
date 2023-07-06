// execute with: node mongo.js <password>

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = encodeURIComponent(process.argv[2])

const url = `mongodb+srv://sarahfullstack:${password}@full-stack-open-part3c.mwctwwg.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

// define a new schema for a note and the matching model
// schema = tells mongoDB how the objects are to be stored in the database
// The idea behind Mongoose is that the data stored in the database is given a schema
// at the level of the application that defines the shape of the documents stored
// in any given collection.
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// create a new object
const note = new Note({
  content: 'HTML is Easy',
  important: true,
})

const note2 = new Note({
  content: 'some text',
  important: true,
})

const note3 = new Note({
  content: 'some more text',
  important: true,
})

// save an object
// save().then(eventhandler)
// close() is necessary to finish the execution
// note.save().then((result) => {
//   console.log("note saved!");
//   note2.save().then((result) => {
//     console.log("note saved!");
//     note3.save().then((result) => {
//       console.log("note saved!");
//       mongoose.connection.close();
//     });
//   });
// });

// fetching objects from the database
// find with empty object {} -> get all notes stored
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})
