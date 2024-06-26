'use strict'
const app = require('./app');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
const Usuario = require('./src/models/usuario.model')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/prueba', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {

    console.log('Conectado a la base de datos prueba');
    app.listen(process.env.PORT || 3000, function () {
        console.log('Se encuentra corriendo en el puerto 3000');

        var usuarioModel = new Usuario()
        usuarioModel.usuario = "ADMIN"
        var secret = '123'
        usuarioModel.nombre = "ADMIN";
        usuarioModel.apellido = "";
        usuarioModel.direccion = "ADMIN";
        usuarioModel.telefono = "N/A";
        usuarioModel.correo = "ADMIN";
        usuarioModel.imagen = "https://assets.stickpng.com/images/585e4beacb11b227491c3399.png";
        usuarioModel.rol = 'ROL_ADMIN'

        Usuario.find({ usuario: usuarioModel.usuario }).exec((err, usuarioEncontrado) => {
            if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
                return console.log('El usuario Administrador ya fue creado');
            } else {
                bcrypt.hash(secret, null, null, (err, passwordEncriptada) => {
                    usuarioModel.password = passwordEncriptada;
                    usuarioModel.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error al guardar usuario' })
                        if (usuarioGuardado) {
                            return console.log(usuarioGuardado);
                        } else {
                            return console.log('No se ha podido guardar el usuario');
                        }
                    })
                })
            }
        })
    })

}).catch(err => console.log(err))
