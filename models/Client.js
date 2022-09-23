const { model, Schema } = require('mongoose');

/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const schema = new Schema({
  clientId: String,
  blackListedCmds: { type: Array, default: [] },
  blackListedUsers: { type: Array, default: [] },
  blackListedServers: { type: Array, default: [] },
  commands: { type: Array, default: [] },
});

module.exports = model('Client', schema);
