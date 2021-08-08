const { CommandInteraction, MessageEmbed } = require("discord.js"); 

module.exports = { 
  name: "ping", 
  description: "returns websocket ping", 
  /** 
* 
* @param {Client} client 
* @param {CommandInteraction} interaction 
* @param {String[]} args 
*/ 
  run: async (bot, interaction, args) => { 
    const msg = new MessageEmbed() 
      .setDescription(`Client Latency: ${bot.ws.ping}ms`) .setColor("RANDOM") 
      .setTitle("Pong! 🏓"); 
    interaction.followUp({ embeds: [msg] }); 
  },
};