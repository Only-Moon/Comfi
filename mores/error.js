const { MessageEmbed } = require('discord.js');

module.exports = async (text, channel) => { 
  let embed = new MessageEmbed() 
     .setDescription("<a:WrongCheck:829635972219011093> - " + text) 
     .setFooter(`Something went wrong!`) 
     .setTimestamp() 
     .setColor("RED");
     
     await channel.send({ embeds:[embed] });
}