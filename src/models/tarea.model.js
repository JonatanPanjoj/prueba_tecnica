const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var TareaSchema = Schema({
    tarea: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "usuarios",
    },
})

module.exports = mongoose.model('tarea', TareaSchema);