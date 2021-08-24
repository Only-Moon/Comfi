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
      const ping = await db.ping();
      let start = Date.now();
   let em1 = new Discord.MessageEmbed()
      .setDescription("🔍 I think my ping is high...")
     .setColor("RANDOM");
  message.channel.send({embeds: [em1] }).then(m => {
    
    let end = Date.now();
    
    let embed = new Discord.MessageEmbed()
    .setAuthor("Pong!", message.author.avatarURL({ dynamic: true }))
    .addField("API Latency", Math.round(bot.ws.ping) + "ms", true) 
    .addField("Message Latency", end - start + "ms")   
      .setColor("RANDOM");
    m.edit({embeds: [embed] }).catch(e => message.channel.send(e));
    
  });
    }
};