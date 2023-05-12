const { Schema, model, ObjectId } = require("mongoose")
const mongoose = require("mongoose")


const Note = new Schema({
    text: { type: String, required: true },
    dateCreated: { type: String, required: false },
    ownerName: { type: String, required: false },
    user: { type: mongoose.Types.ObjectId, ref: "User" }
})

module.exports = model('Note', Note)