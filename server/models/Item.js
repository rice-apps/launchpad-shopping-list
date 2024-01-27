var mongoose = require("mongoose")

var ItemSchema = new mongoose.Schema({
    name: String,
    category: String
})

const Item = mongoose.model("ItemAnthony", ItemSchema);

module.exports = Item;
