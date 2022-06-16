// Import express
const express = require('express');
const path = require('path');
const { readAndAppend, readFromFile, writeToFile } = require('./helpers/fsUtils');

// Import notes that are saved in db.json
const notes = require('./db/db.json');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

// Initialize app variable
const app = express();

// Middleware for parsing application/json and url encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Get all notes
app.get('/api/notes', (req, res) =>{
    console.info(`GET /api/notes`);
    res.status(200).json(notes);
  });


//   Save a new note
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a new note`);
    
    // Destructuring the body object
    const { title, text } = req.body;

    // To confirm that its a valid request
    if (title && text) {
    // Variable for the object we will save
    const newNote = {
        title,
        text,
        id: uuid(),
    };
   
    // Read and append to file
    readAndAppend(newNote, './db/db.json');

    const response = {
        status: 'saved',
        body: newNote,
    };

    console.log(response);

    // For a successful request a response with status 201 alondwith a json object "response"
    res.status(201).json(`New note saved successfully`);
    } else {
        // If the request is not successful, this else element will be trigerred
        res.status(500).json('Error in saving note');
    }
});


//   Delete note
app.delete(`/api/notes/:id`, (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to delete a note ${req.body}`);
    
  // Destructuring the body object to obtain note ID
  const { id } = req.body;
  // Find array index of the note to be deleted
  const arrIndex = notes.findIndex(p => p.id == id);

  // Remove a note by splicing the original array
  const deleteNote = notes.splice(arrIndex, 1);
  console.log(deleteNote);

  // Write to file the new array
  writeToFile('./db/db.json', notes);
  return res.send();
  });

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);