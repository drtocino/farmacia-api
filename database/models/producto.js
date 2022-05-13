const mongoose = require("mongoose");
const productoSchema = new mongoose.Schema({
    nombre: {type: String},
    precio: {type: String},
    imagen: {type: String},
    stock: {type: String},
    laboratorio: {type: String},
    descripcion: {type: String},
    fechaVencimiento: {type: Date},
    
})

const Producto = mongoose.model("producto",productoSchema);
module.exports = Producto;
