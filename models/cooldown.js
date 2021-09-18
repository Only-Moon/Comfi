const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    userId: String,
    cmd: String,
    time: Number,
    cooldown: Number,
})

module.exports = mongoose.model('cooldown', schema)