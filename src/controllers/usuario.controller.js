'use strict'

const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwtService = require('../services/jwt');
var jwt = require('jwt-simple');
const secret = 'secretPassword';

//FUNCIONES

//FUNCIÓN PARA REGISTRAR UN USUARIO
function registrarUsuario(req, res) {
    var usuarioModel = new Usuario();
    var params = req.body;


    usuarioModel.usuario = params.usuario;
    usuarioModel.rol = 'ROL_USUARIO';
    usuarioModel.correo = params.correo;


    Usuario.find({ usuario: usuarioModel.usuario }).exec((err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Ha surgido un error' });

        if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
            return res.status(500).send(["El usuario ya está en uso"]);
        } else {
            bcrypt.hash(params.password, null, null, (err, passwordEncriptada) => {
                usuarioModel.password = passwordEncriptada;

                usuarioModel.save((err, usuarioGuardado) => {
                    if (usuarioGuardado) {
                        // Crear el token.
                        var token = jwtService.createToken(usuarioGuardado);
                        // Establecer la cookie con el token.
                        res.cookie('token', token);
                        // Enviar una única respuesta con el token y los detalles del usuario.
                        return res.status(200).json({
                            token: token,
                            id: usuarioEncontrado._id,
                            usuario: usuarioEncontrado.usuario,
                            correo: usuarioEncontrado.correo,
                        });
                    } else {
                        console.log(err)
                        return res.status(500).send({
                            mensaje: 'No se ha podido registrar el usuario, inténtalo de nuevo'
                        });
                    };
                });
            });
        };
    });
}

function login(req, res) {
    var params = req.body;
    Usuario.findOne({ usuario: params.usuario }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send(['Error en la petición de usuario']);
        if (usuarioEncontrado) {
            bcrypt.compare(params.password, usuarioEncontrado.password, (err, passCorrecta) => {
                if (passCorrecta) {
                    // Crear el token.
                    var token = jwtService.createToken(usuarioEncontrado);
                    // Establecer la cookie con el token.
                    res.cookie('token', token);
                    // Enviar una única respuesta con el token y los detalles del usuario.
                    return res.status(200).json({
                        token: token,
                        id: usuarioEncontrado._id,
                        usuario: usuarioEncontrado.usuario,
                        correo: usuarioEncontrado.correo,
                    });
                } else {
                    return res.status(401).send(['El usuario no se ha podido identificar'])
                }
            })
        } else {
            return res.status(500).send(['El usuario no se ha podido identificar']);
        }
    })
}

function verifyToken(req, res) {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "Unauthorized no Token" });

    try {
        var decoded = jwt.decode(token, secret);
        console.log('Si decodifique');
        console.log('DECODED ID: ', decoded )
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized no secret" });
    }

    Usuario.findById(decoded.sub, async (err, userFound) => {
        if (err || !userFound) return res.status(401).json({ message: "Unauthorized" });

        return res.json({
            id: userFound._id,
            usuario: userFound.usuario,
            correo: userFound.correo,
        });
    });
}



module.exports = {
    registrarUsuario,
    login,
    verifyToken,

}