// event handlers of routes are referred to as "controllers"

// new router object -> export at the end of this file
// router object = isolated instance of middleware and routes
// ("mini application" for performing middleware and routing functions
// -> can be used for defining related routes
const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');

// notesRouter.get('/', (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes);
//   });
// });
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// post: information about user who created id are sent in userId field of request body
notesRouter.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
});

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

// export router to be available for all consumers of the module
module.exports = notesRouter;
