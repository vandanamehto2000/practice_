const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    discription: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false

    }
}, { timestamps: true })

const task = new mongoose.model("task", taskSchema)
module.exports = task;