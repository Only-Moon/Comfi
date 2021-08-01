const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "volume",
        category: 'music',
        aliases: ["vol"],
        description: "Adjusts the music volume for you <3",
        usage: "vol <volume>",
    },
    run: async (bot, message, args) => {
      
      bot.buttube.volume(message, args[0]);
      
    }}