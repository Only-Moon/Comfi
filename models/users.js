const { model, Schema } = require("mongoose")

const schema = new Schema({
    // General
    userId: String,
    guildId: String,
    staff: {type: Boolean, default: false},

    // Mod
    warns: {type: Object, default: []},

    // Leveling
    level: {type: Number, default: 0},
    xp: {type: Number, default: 0},
    requiredXp: {type: Number, default: 500},
  
    // Afk
    afk: {type: Boolean, default: false},
    afk_reason: String,
    afk_set: String,

  // Cooldown
    cmd: {type: String}, 
    time: {type: Number, default: 0}, 
    cooldown: {type: Number, default: 0},

 // Profile
    UserName: { type: String, default: null },
    UserPfp: { type: String, default: null },
    UserBanner: { type: String, default:  null },
    UserAge: { type: Number, default: 0 },
    UserHobby: { type: String, default: null },
    CustomId: { type: String, default: null },
  
})

module.exports = model("Users", schema)