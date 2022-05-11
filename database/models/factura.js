const mongoose = require("mongoose");
const facturaSchema = new mongoose.Schema({
    nombre: {type: String},
    precioTotal: {type: Number},
    items: [{type: mongoose.Schema.Types.ObjectId,ref: "item"}],
    detalle: {type: String},
})

const Factura = mongoose.model("factura",productoSchema);
module.exports = Factura;