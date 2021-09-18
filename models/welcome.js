const mongoose = require("mongoose"); 

const schema = new mongoose.Schema({ 
  GuildID: String, 
  Embed: { type: Object, default: {
                    title: null,
                    description: null,
                    color: null,
                    image: null,
                    thumbnail: null,
                    footer: null,
  }   
         },
  Channel: String,
  Toggle: Boolean,
})

module.exports = new mongoose.model("welcome", schema);