'use strict'

//Importaciones
const express = require('express');
const tareaController = require('../controllers/tarea.controller');
const md_authentication = require("../middlewares/authenticated");


//Rutas
var api = express.Router();
api.post('/registrarTarea', md_authentication.ensureAuth ,tareaController.registrarTarea);
api.put('/editarTarea/:idTarea', tareaController.editarTarea);
api.delete('/eliminarTarea/:idTarea', tareaController.eliminarTarea);
api.get('/obtenerTareaId/:idTarea', tareaController.obtenerTareaId);
api.get('/obtenerTareas', md_authentication.ensureAuth, tareaController.obtenerTareas);

//Exportación
module.exports = api;