const Discord = require('discord.js')
const reveroDB = require('revero-db') 

module.exports = async (text, channel) => { 
  let embed = new Discord.MessageEmbed() 
     .setDescription("<a:WrongCheck:829635972219011093> - " + text) 
     .setFooter(`Something went wrong!`) 
     .setTimestamp() .setColor("RED");
     
     await channel.send(embed)
  
}