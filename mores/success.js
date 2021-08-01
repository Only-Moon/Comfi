const Discord = require('discord.js') 

module.exports = async (text, channel, message) => {
  
  let embed = new Discord.MessageEmbed() 
       .setDescription("<:check:854889685369487401> - " + text) 
       .setFooter('Success') 
       .setTimestamp() 
       .setColor("RANDOM");
       
       await channel.send(embed)
  
}