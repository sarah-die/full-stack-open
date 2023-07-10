const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
// tests use the Express application defined in app.js which does not listen to any ports
// if the server is not already listening for connections then it is bound to an
// ephemeral port for you so there is no need to keep track of ports.
// = supertest takes care that the application being tested is started at the port that it uses internally
const app = require('../app');

// app.js module is wrapped by the supertest function into a so-called superagent object
// this object is assigned to the api variable
// tests can use it for making requests to the backend
const api = supertest(app);
const Note = require('../models/note');

// attention: each iteration of the forEach loop generates an asynchronous operation
// beforeEach will not wait for async operations to finish
// -> the await commands are not in the beforeEach function but in separate functions that beforeEach will not wait for
// -> execution of tests begins before the db state is initialized
// beforeEach(async () => {
//   await Note.deleteMany({})
//   console.log('cleared')
//
//   helper.initialNotes.forEach(async (note) => {
//     let noteObject = new Note(note)
//     await noteObject.save()
//     console.log('saved')
//   })
//   console.log('done')
// })

// fix: wait for all async operations to finish: Promise.all(promises)
// create array of Note objects, create array of promises for saving each of the items to the db
// Promise.all() = transform array of promises into a single promise
// beforeEach(async () => {
//   await Note.deleteMany({})
//
//   const noteObjects = helper.initialNotes
//       .map(note => new Note(note))
//   const promiseArray = noteObjects.map(note => note.save())
//   await Promise.all(promiseArray)
// })

// imp! Promise.all() executes the promises it receives in parallel, if order is important use for...of block
beforeEach(async () => {
  await Note.deleteMany({});

  for (let note of helper.initialNotes) {
    let noteObject = new Note(note);
    await noteObject.save();
  }
});

test('notes are returned as json', async () => {
  // testing status and content type
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  // using regex here because the value might also be "application/json; charset=utf-8"
  // with regex it is possible to check if the string contains the term
});

test('all notes are returned', async () => {
  const response = await api.get('/api/notes');

  expect(response.body).toHaveLength(helper.initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes');

  const contents = response.body.map((r) => r.content);
  // toContain: === for comparing elements
  // toContainEqual: appropriate method to check objects in arrays
  expect(contents).toContain('Browser can execute only JavaScript');
});

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const notesAtEnd = await helper.notesInDb();
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

  const contents = notesAtEnd.map((n) => n.content);
  expect(contents).toContain('async/await simplifies making async calls');
});

test('note without content is not added', async () => {
  const newNote = {
    important: true,
  };

  await api.post('/api/notes').send(newNote).expect(400);

  const notesAtEnd = await helper.notesInDb();
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
});

test('a specific note can be viewed', async () => {
  // fetch note from database
  const notesAtStart = await helper.notesInDb();
  const noteToView = notesAtStart[0];

  // call operation that is being tested
  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(resultNote.body).toEqual(noteToView);
});

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToDelete = notesAtStart[0];

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

  const contents = notesAtEnd.map((r) => r.content);

  expect(contents).not.toContain(noteToDelete.content);
});

// close database connection
afterAll(async () => {
  await mongoose.connection.close();
});
