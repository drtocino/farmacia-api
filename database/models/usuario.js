const mongoose = require("mongoose");
const usuarioSchema = new mongoose.Schema({
    nombre: {type: String},
    correo: {type: String},
    usuario: {type: String},
    clave: {type: String},
    rol: {type: String},
    imagen: {type: String},
})

const Usuario = mongoose.model("usuario",usuarioSchema);
module.exports = Usuario;
