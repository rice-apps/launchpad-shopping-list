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




// ROUTE #3 - Remove an existing shopping item




// ROUTE #4 - Update an existing shopping item (harder)




// ROUTE #5 - Get shopping items that satisfy a condition/filter (harder)





module.exports = app;