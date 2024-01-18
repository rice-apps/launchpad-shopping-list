const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;
const server = app.listen(port, () => {
    const addr = server.address();
    console.log(`🛸 Server listening at http://localhost:${addr.port}`);
});

// this will be your "database"
var database = [
    {"id": 1, "name": "Milk", "category": "Food"},
    { "id": 2, "name": "Eggs", "category": "Food" },
    { "id": 3, "name": "Blender", "category": "Appliance" },
]

// super simple example - just print Hello World in console
app.get("/example", (req, res, next) => {
    res.json({ "message": "Welcome to your Shopping List!" });
});

// ROUTE #1 - Get all shopping items
app.get("/getAll", (req, res, next) => {
    res.json(database)
})


// ROUTE #2 - Add a new shopping item
app.post("/add", (req, res, next) => {
    database.push({id: database.length + 1, ...req.body})
    res.json(database)
})

// ROUTE #3 - Remove an existing shopping item
app.delete("/remove", (req, res, next) => {
    let newDatabase = database.filter((item) =>
        item.name != req.body.name 
    )
    database = newDatabase
    res.json(database)
})

// ROUTE #4 - Update an existing shopping item (harder)
app.put("/update", (req, res, next) => {
    let idx = database.findIndex((item) => item.name == req.body.existingName)
    console.log(idx)
    database[idx].name = req.body.newName
    database[idx].category = req.body.newCategory
    res.json(database)
})


// ROUTE #5 - Get shopping items that satisfy a condition/filter (harder)
app.get("/getByCat", (req, res, next) => {
    let filteredDatabase = database.filter((item) => 
        item.category == req.query.category
    )
    res.json(filteredDatabase)
})



module.exports = app;