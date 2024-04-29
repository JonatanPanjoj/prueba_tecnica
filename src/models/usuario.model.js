const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    usuario: String,
    password: String,
    rol: String,
    nombre: String,
    apellido: String,
    telefono: String,
    correo: String,
    imagen: String,
})

module.exports = mongoose.model('usuarios', UsuarioSchema);