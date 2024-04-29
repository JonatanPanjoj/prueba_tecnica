'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secretPassword';

//Middleware
//Verifica el token de las cookies
exports.ensureAuth = function (req, res, next){

    const { token } = req.cookies;
    if (!token)
        return res
            .status(401)
            .json({ message: "No token, authorization denied" });


    try{
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({ 
                mensaje: 'El token ha expirado'
            });
        }
    }catch(error){
        return res.status(404).send({ 
            mensaje: 'El token no es válido' 
        });
    }

    req.user = payload;
    next();
}