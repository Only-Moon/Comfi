const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "music-setup",
        category: 'music',
        aliases: ["setup"],
        description: "Setups the music system for you",
        usage: "setup",
    },
    run: async (bot, message, args) => {
      
     bot.buttube.setup(message)
     
    }}