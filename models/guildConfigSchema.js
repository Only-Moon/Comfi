const { Schema, Model } = require('mongoose');

const schema = new Schema({
  guildId: Schema.Types.String,
  prefix: {
    default: '/',
    type: Schema.Types.String
  },
});

module.exports = new Model('guild-config', schema);