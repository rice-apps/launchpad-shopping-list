const Item = require('./models/Item');

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;
const DB_URL = "mongodb+srv://tigerking:wphPpplcHRwNdv29@riceapps2020-21.ppsrv.gcp.mongodb.net/launchpad_2023"

// super simple example - just print Hello World in console
app.get("/example", (req, res, next) => {
    res.json({ "message": "Welcome to your Shopping List!" });
});

// ROUTE #1 - Get all shopping items
app.get("/getAll", async (req, res, next) => {
    const allItems = await Item.find()
    res.json(allItems)
})


// ROUTE #2 - Add a new shopping item
app.post("/add", async (req, res, next) => {
    const newItem = new Item({ ...req.body });
    const insertedItem = await newItem.save()
        .then(async () => {
            const allItems = await Item.find()
            res.json(allItems)
        })
        .catch(() => {
            console.log("COuld not create new item")
        });
})

// ROUTE #3 - Remove an existing shopping item
app.delete("/remove", async (req, res, next) => {
    const deleted = await Item.findOneAndDelete({name: req.body.name})
        .then(async () => {
            const allItems = await Item.find()
            res.json(allItems)
        })
        .catch(() => {
            console.log("COuld not remove item")
        })
    
})

// ROUTE #4 - Update an existing shopping item (harder)
app.put("/update", async (req, res, next) => {
    const query = {name: req.body.existingName}
    const update = {name: req.body.newName, category: req.body.newCategory}
    const updated = await Item.findOneAndUpdate(query, update)
        .then(async () => {
            const allItems = await Item.find()
            res.json(allItems)
        })
        .catch(() => {
            console.log("Could not update")
        })
    
})


// ROUTE #5 - Get shopping items that satisfy a condition/filter (harder)
app.get("/getByCat", async (req, res, next) => {
    const query = {category: req.query.category}
    const items = await Item.find(query)
    res.json(items)
})

const start = async () => {
    try {
        await mongoose.connect(
            DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            const server = app.listen(port, () => {
                const addr = server.address();
                console.log(`🛸 Server listening at http://localhost:${addr.port}`);
            });
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start()

// module.exports = app;