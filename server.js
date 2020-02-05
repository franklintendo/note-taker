const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");

const PORT = 4200;

// MIDDLEWARE 
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// API ROUTE
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// READ THE EXISTING DB.JSON
// let dbJSON = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

// console.log(dbJSON);

// The app works with the saveNote function 
//that does an AJAX POST method in index.js
app.post("/api/notes", (req, res) => {
    // Contains the note object 
    const newNote = req.body;
    // Place existing note array into variable
    let dbNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    // Push new note into the note array
    dbNotes.push(newNote);

    // Add a unique id to each array item
    for (var i = 0; i < dbNotes.length;i++) {
        dbNotes[i].id = i+1;
    }

    // Turn the array into a string for storage
    const stringedNote = JSON.stringify(dbNotes);

    // Write the DB JSON file with the new note included
    fs.writeFile("./db/db.json", stringedNote, "utf8", (err, data) => {
        if(err) throw err;
      console.log("success");
    });

    // Send JSON response of updated array
    res.json(dbNotes);
});

// The app works with the deleteNote function 
//that does an AJAX DELETE method in index.js
app.delete('/api/notes/:id', function (req, res) {
    // console.log(req.params.id);
    // Take the id of the note clicked and
    // take the existing note array
    const idToDelete = parseInt(req.params.id);
    let dbJSON = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    // console.log(dbJSON);
    // console.log(idToDelete);
    // Loop through note array and check
    // for id of note clicked and compare
    // to each object id, remove offending object
    for (var i = 0; i < dbJSON.length;i++) {
        if (idToDelete === parseInt(dbJSON[i].id)) {
            dbJSON.splice(i, 1);
        }
    }

    const stringedDB = JSON.stringify(dbJSON);

    fs.writeFile("./db/db.json", stringedDB, "utf8", (err, data) => {
        if(err) throw err;
      console.log("success");
    });

    res.json(dbJSON);

  })




// HTML ROUTES

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.listen(PORT, function() {
    console.log("App listening on http://localhost/" + PORT);
  });

