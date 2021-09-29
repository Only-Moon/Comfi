const { model, Schema } = require("mongoose")

const schema = new Schema({
    clientId: String,
    blackListedCmds: {type: Array, default: []},
    blackListedUsers: {type: Array, default: []},
    blackListedServers: {type: Array, default: []},
})

module.exports = model("Client", schema)