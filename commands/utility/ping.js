const Discord = require("discord.js"); 
const { db } = require('../../Database.js'); 

module.exports = {
  config: { 
    name: "ping", 
    description: "Shows ping of the bot", 
    category: 'utility', 
    usage: "ping", 
    example: "ping", 
    aliases: ['']
  }, 
  
  run: async (bot, message, args) => { 
    let start = Date.now(); 
    message.channel.send('🏓').then(m => { 
      let end = Date.now(); 
      let embed = new Discord.MessageEmbed() 
        .setAuthor("Pong!", message.author.avatarURL({ dynamic: true })) 
        .addField("API Latency", Math.round(bot.ws.ping) + "ms", true) 
        .addField("Message Latency", end - start + "ms") 
        .setColor("RANDOM"); 
      
      m.delete(); 
      message.channel.send({ embeds: [embed] 
                           });
    }); 
  }
};