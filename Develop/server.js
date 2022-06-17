// Import express and other required files
const express = require('express');
const path = require('path');
const { readAndAppend, readFromFile, writeToFile } = require('./helpers/fsUtils');
const notes = require('./db/db.json');
const uuid = require('./helpers/uuid');


// Define port
const PORT = process.env.PORT || 3001;


// Initialize app variable
const app = express();


// Middleware for parsing application/json and url encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Make static files available for use
app.use(express.static('public'));


// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// Get all notes
app.get('/api/notes', (req, res) =>{
    console.info(`Fetch notes`);
    res.sendFile(path.join(__dirname, '/db/db.json'))
  });


//   Save a new note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a new note`);
    
    const { title, text } = req.body;

    if (title && text) {
    const newNote = {
        title,
        text,
        id: uuid(),
    };
   
    // save note to json file
    readAndAppend(newNote, './db/db.json');

    const response = {
        status: 'saved',
        body: newNote,
    };

    console.log(response);

    res.status(201).json(response);
    } else {
        res.status(500).send('Error in saving note');
    }
});


//   Delete note
app.delete(`/api/notes/:id`, (req, res) => {
  console.info(`${req.method} request received to delete a note ${req.body}`);
    
  const { id } = req.body;
  // Find array index of the note to be deleted
  const arrIndex = notes.findIndex(p => p.id == id);

  // Remove a note by splicing the original array
  const deleteNote = notes.splice(arrIndex, 1);

  // Write to file the new array
  writeToFile('./db/db.json', notes);
  
  // For a successful request a response with status 201 alondwith a json object "response"
  res.status(201).json(`Note deleted successfully`);
  });


  // Listen to port
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);