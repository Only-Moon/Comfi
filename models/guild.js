const { model, Schema } = require("mongoose")

const schema = new Schema({
    // General
    guildId: String,
    premium: {type: Boolean, default: false},
    prefix: {type: String, default: "Cr!"},
    auto_nick: {type: String, default: "NONE"},

    // Suggestions
    suggestions: {type: Boolean, default: false},
    suggestions_channel: {type: String, default: "NONE"},

    // Bump
    bump: {type: Boolean, default: false},
    bump_channel: {type: String, default: "NONE"}, 
    bump_time: {type: String, default: "NONE"},
    bump_hi: {type: String, default: "NONE"},

    // Chatbot
    chatbot: {type: Boolean, default: false},
    chat_channel: {type: String, default: "NONE"}, 

    // Confess
    confession: {type: Boolean, default: false},
    confess_channel: {type: String, default: "NONE"},

    // Tickets
    ticket: {type: Boolean, default: false},
    ticket_category: {type: String, default: "NONE"},
    ticket_role: {type: String,  default: "NONE"}, 
  
    // Leveling
    leveling: {type: Boolean, default: false},
    leveling_channel: {type: String, default: "NONE"},
    leveling_message: {type: String, default: "Congrats $user.mention$ on reaching level $level$"},
    leveling_roles: {type: Array, default: []},

    
    // Auto moderation
    automod_links: {type: Boolean, default: false},
    automod_links_links: {type: Array, default: []},
    automod_links_ignoredchannels: {type: Array, default: []},
    automod_words: {type: Boolean, default: false},
    automod_words_list: {type: Array, default: []},
    anti_alt: {type: Boolean, default: false},

    
    verification: {type: Boolean, default: false},
    verification_channel: {type: String, default: "NONE"},
    verification_role: {type: String, default: "NONE"},
    verification_message: {type: String, default: "Please type the words below to gain access to the server."},


    member_counter: {type: Boolean, default: false},
    member_counter_channel: {type: String, default: "NONE"},
    member_counter_channel_type: {type: String, default: "GUILD_VOICE"},
    member_counter_channel_name: {type: String, default: "Members: "},


    // Welcome
    welcome: {type: Boolean, default: false},
    welcome_channel: {type: String, default: "NONE"},
    welcome_dmuser: {type: Boolean, default: false},
    welcome_message: {type: String, default: "Welcome {{user.mention}}"},
    welcome_embed: {type: Boolean, default: false},
    
    // Leave
    leave: {type: Boolean, default: false},
    leave_channel: {type: String, default: "NONE"},
    leave_dmuser: {type: Boolean, default: false},
    leave_message: {type: String, default: "Goodbye {{user.mention}}"},
    leave_embed: {type: Boolean, default: false},

    // Boost
    boost: {type: Boolean, default: false},
    boost_channel: {type: String, default: "NONE"},
    boost_message: {type: String, default: "{user.mention} just boosted {server}. Now We Have {boost.count} boosts"},

    // Logs
    logging: {type: Boolean, default: false},
    logging_channel: {type: String, default: "NONE"},
    modlog: {type: Boolean,  default:  false},
    mod_channel: {type: String,  default:  "NONE"}, 

    // MutedRole 
    mute: {type: Boolean, default: false},
    mute_role: {type: String, default: "NONE"},
    muted_role: {type: Array,  default: []},

// Dropdown roles 
  dropdownRoles: {type: Array, default: []},
  
})

module.exports = model("Guilds", schema)