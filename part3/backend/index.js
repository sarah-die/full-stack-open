const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// import Note from "./models/note"
const Note = require("./models/note");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// sending data in body in JSON format
// json-parser
app.use(express.static("build"));
app.use(express.json());
app.use(requestLogger);
app.use(cors());

// defines an event handler that is used to handle HTTP GET request to root /
// event handler accepts two params
// request = contains all HTTP request infos
// response = defines how request is responded
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// event handler that handles HTTP GET request to /notes path
// response = json-method
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// route for fetching a single resource
// parametric route with :-syntax
app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      // console.log(error); // log the error!
      // response.status(400).send({ error: "malformatted id" });
      // remember: next() is the third parameter from middleware function
      // -> next with no parameter = execution moves on to next route or middleware
      // -> next with parameter = continue to error handler middleware
      next(error);
    });
});

// deleting resources with mongoDB
app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// with mongoDB
app.post("/api/notes", (request, response, next) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important ?? false, // ?? better when default value should be changed to true
  });

  note
    .save()
    .then((savedNote) => {
      // use toJSON noteSchema here -> note.js line 27
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

// update data
app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  // findByAndUpdate receives a regular JS object, not a new Note object
  // imp! by default the updatesNote parameter receives the original document without modifications
  // { new: true } = event handler will be called with new modified document
  // runValidators: to validate everything even when a note is edited
  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

// handler of requests with unknown endpoint imp! place it always here
app.use(unknownEndpoint);
// imp! this has to be the last loaded middleware
app.use(errorHandler);

// listens to HTTP requests sent to port 3001 (see .env)
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
