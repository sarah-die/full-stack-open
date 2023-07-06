const http = require('http')
// import http from "http"
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.static('build'))

// http-method: createServer
// event-handler is registered that is called everytime an HTTP request is made to the address
// statuscode: 200, contentType: text/plain
// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'text/plain' })
//     response.end('Hello World')
// })

// now main purpose: offer raw data in JSON format
let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
]

// define new routes
// defines an event handler that is used to handle HTTP GET request to root /
// event handler accepts to params
// request = contains all HTTP request infos
// response = defines how request is responded
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// event handler that handles HTTP GET request to /notes path
// reponse = json-method
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

// route for fetching a single resource
// parametric route with :-syntax
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)

  // when there is no note the variable is set to undefined and the response is 200
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

// deleting resources
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})

// adding new notes -> HTTP POST request
// sending data in body in JSON format
// json-parser
app.use(express.json())

// event-handler can access data from the body property of the request
// json-parser: takes request json-data, transforms it into js and attaches it to the body
// property of the request object before the route handler is called
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)
  response.json(note)
})

// listens to HTTP requests sent to prt 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
