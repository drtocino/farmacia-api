const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
    producto: {type: String},
    cantidad: {type: Number},
    subTotal: {type: Number},
})

const Item = mongoose.model("item",itemSchema);
module.exports = Item;
