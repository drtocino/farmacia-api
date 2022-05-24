const mongoose = require("mongoose");
const laboratorioSchema = new mongoose.Schema({
    nombre: {type: String},
    locacion: {type: String},
})

const Laboratorio = mongoose.model("laboratorio",laboratorioSchema);
module.exports = Laboratorio;