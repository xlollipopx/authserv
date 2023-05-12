const { Schema, model, ObjectId } = require("mongoose")

const User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hwid: { type: String, required: false },
    hasLicence: { type: Boolean, required: true }
})

module.exports = model('User', User)