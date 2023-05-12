const { Schema, model, ObjectId } = require("mongoose")
const mongoose = require("mongoose")


const UserShareMap = new Schema({
    userOne: { type: mongoose.Types.ObjectId, ref: "User" },
    userTwo: { type: mongoose.Types.ObjectId, ref: "User" }
})

module.exports = model('UserShareMap', UserShareMap)