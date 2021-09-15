const mongoose = require('mongoose')

const autorole = new mongoose.Schema({
    guild: String,
    role: String
})

module.exports = mongoose.model("autorole", autorole);