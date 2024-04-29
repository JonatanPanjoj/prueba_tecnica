'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Rutas 
const usuario_rutas = require('./src/routes/usuario.route');
const tarea_rutas = require('./src/routes/tarea.route');



//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', // Reemplaza esto con el origen de tus solicitudes
    credentials: true
}));

//Carga de Rutas
app.use('/api', usuario_rutas, tarea_rutas);


//Exportación
module.exports = app;