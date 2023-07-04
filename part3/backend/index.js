require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// import Note from "./models/note"
const Note = require("./models/note");

app.use(cors());
// sending data in body in JSON format
// json-parser
app.use(express.json());
app.use(express.static("build"));

// now main purpose: offer raw data in JSON format
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// defines an event handler that is used to handle HTTP GET request to root /
// event handler accepts two params
// request = contains all HTTP request infos
// response = defines how request is responded
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// event handler that handles HTTP GET request to /notes path
// reponse = json-method
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// route for fetching a single resource
// parametric route with :-syntax
app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

// deleting resources
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

// with mongoDB
app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }
  const note = new Note({
    content: body.content,
    important: body.important ?? false, // better when default value should be changed to true
  });
  note.save().then((savedNote) => {
    // use toJSON noteSchema here -> note.js line 27
    response.json(savedNote);
  });
});

// listens to HTTP requests sent to port 3001 (see .env)
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
