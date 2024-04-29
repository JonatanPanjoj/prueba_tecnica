'use strict'

const Tarea = require('../models/tarea.model');

async function registrarTarea(req, res) {

    try {
        const { tarea, done } = req.body;
        const newTask = new Tarea({
            tarea,
            done,
            user: req.user.sub,
        });
        await newTask.save();
        res.json(newTask);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

function editarTarea(req, res) {
    var params = req.body
    var idTarea = req.params.idTarea

    Tarea.findOneAndUpdate({ _id: idTarea },
        {
            tarea: params.tarea,
            done: params.done
        },
        { new: true, useFindAndModify: true },
        (err, tareaActualizada) => {
            if (err) return res.status(500).send({ mensaje: 'Error al actualizar la tarea' })
            return res.status(200).send({ tareaActualizada })
        })

}

function eliminarTarea(req, res) {
    var idTarea = req.params.idTarea

    Tarea.findOneAndDelete({ _id: idTarea }, (err, tareaEliminada) => {
        if (err) return res.status(500).send({ mensaje: 'La tarea no ha podido eliminarse' })
        return res.status(200).send({ mensaje: 'Tarea eliminada con Éxito' })
    })

}

function obtenerTareaId(req, res) {
    var idTarea = req.params.idTarea;

    Tarea.findById(idTarea, (err, tareaEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Ha ocurrido un error' })
        if (!tareaEncontrada) return res.status(500).send({ mensaje: 'No se ha encontrado la tarea' })
        return res.status(200).send({ tareaEncontrada });
    })
}

async function obtenerTareas(req, res) {
    try {
        const tasks = await Tarea.find({ user: req.user.sub }).populate("user");
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    registrarTarea,
    editarTarea,
    eliminarTarea,
    obtenerTareaId,
    obtenerTareas
}
