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
    const newNote = req.body;
    let dbNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    dbNotes.push(newNote);

    const stringedNote = JSON.stringify(dbNotes);

    fs.writeFile("./db/db.json", stringedNote, "utf8", (err, data) => {
        if(err) throw err;
      console.log("success");
    });
    res.json(dbNotes);
});

app.delete('/api/notes/:id', function (req, res) {
    res.send('Got a DELETE request at /user')
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

