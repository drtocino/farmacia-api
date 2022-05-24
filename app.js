const express = require('express');
const cors = require("cors");
const app = express();
const bcrypt = require('bcrypt');
const session = require("express-session");
const mongoose = require("./database/mongoose");

const Usuario = require("./database/models/usuario");
const Producto = require('./database/models/producto');
const Laboratorio = require('./database/models/laboratorio');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(cors({
    origin: ["http://localhost:4200"],
    credentials: true,
}))

app.use(session({
    secret: 'sesiones',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000,
    }
}))

app.use(express.json());
// const user = new Usuario({ nombre: 'Dilan',correo:"example@mail.com",usuario: 'dilan',clave: "12345678",rol: "admin",imagen: "asdf.png"});
// user.save();

// const user = new Usuario({ nombre: 'Raul',correo:"example@mail.com",usuario: 'raul',clave: "12345678",rol: "admin",imagen: "asdf.png"});
// user.save();
// const user = new Usuario({ nombre: 'Maria',correo:"ejemplo@gmail.com",usuario: 'maria',clave: "87654321",rol: "cajero",imagen: "asdf.png",activo: false});
// user.save();
// const producto = new Producto({ nombre: 'Amoxicilina',precio:28,stock: 250,laboratorio: "Inti",descripcion: "Amoxicilina 350ml",fechaVencimiento: "2022-06-20"});
// producto.save();

// const laboratorio = new Laboratorio({ nombre: 'Inti',locacion: "La Paz, Viacha"});
// laboratorio.save();
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

app.get("/getLaboratorios",(req,res) => {
    Laboratorio.find({})
    .then((list) => {
        res.send(list)
    }).catch((error) => {
        console.log(error);
    })
})

app.post("/postProducto",(req,res) => {
    console.log(req.body)
    const product = new Producto(req.body);
    product.save()
    .then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log(error);
    })
})

app.post("/postLaboratorio",(req,res) => {
    console.log(req.body)
    const lab = new Laboratorio(req.body);
    lab.save()
    .then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log(error);
    })
})

app.put("/putProducto/:id",(req,res) => {
    //console.log(req.body)
    const nombre = req.body.nombre
    const stock = req.body.stock
    const precio = req.body.precio
    Producto.updateOne({_id: req.params.id},req.body)
    .then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log(error);
    })
})

app.put("/putLaboratorio/:id",(req,res) => {
    //console.log(req.body)
    Laboratorio.updateOne({_id: req.params.id},req.body)
    .then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log(error);
    })
})

app.delete("/delProducto/:id",(req,res) => {
    //console.log(req.body)
    Laboratorio.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log(error);
    })
})

app.delete("/delLaboratorio/:id",(req,res) => {
    //console.log(req.body)
    Laboratorio.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log(error);
    })
})

app.post("/login",(req,res) => {
    //console.log(req.body);
    Usuario.findOne({usuario: req.body.user}).then((resp) => {
        console.log(resp)
        if(resp){
            if(resp.clave === req.body.pass){
                req.session.nombre = resp.nombre;
                console.log(req.session)
                res.send({exists: true,passCorrect: true,nombre: resp.nombre,rol: resp.rol});
            }else{
                res.send({exists: true,passCorrect:false});
            }
        }else{
            res.send({exists: false,passCorrect: false})
        }
    }).catch((error) => {
        console.log(error)
    })
})

app.get("/login",(req,res) => {
    console.log(req.session)
    if(req.session.nombre){
        res.send({nombre: req.session.nombre,logged: true})
    }else{
        res.send({nombre: '',logged: false})
    }
})

app.listen(3001, () => {
    console.log("Iniciando servidor en puerto 3001");
})
