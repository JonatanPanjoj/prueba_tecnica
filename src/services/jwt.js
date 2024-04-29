'use strict';

//Importaciones
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secretPassword';

exports.createToken = function (user){
    var payload={
        sub: user._id,
        usuario: user.usuario,
        rol: user.rol,
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono,
        correo: user.correo,
        imagen: user.imagen,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }

    return jwt.encode(payload, secret);
}
