const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require("./database/mongoose");

const Usuario = require("./database/models/usuario");
const Producto = require('./database/models/producto');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.json());
// const user = new Usuario({ nombre: 'Dilan',correo:"example@mail.com",usuario: 'dilan',clave: "12345678",rol: "admin",imagen: "asdf.png"});
// user.save();

app.get("/getUsuarios",(req,res) => {
    Usuario.find({})
    .then((list) => {
        res.send(list)
    }).catch((error) => {
        console.log(error);
    })
})

app.get("/getProductos",(req,res) => {
    Producto.find({})
    .then((list) => {
        res.send(list)
    }).catch((error) => {
        console.log(error);
    })
})

app.post("/login",(req,res) => {
    console.log(req.body);
    res.send("Hola mundo");
})

app.listen(3001, () => {
    console.log("Iniciando servidor en puerto 3001");
})
