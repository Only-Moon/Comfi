//----------[ LOADING BOT ]----------\\

console.clear();
console.log('Loading Bot...');

//-----[ DEFINING DEPENDENCIES ]-----\\

const Discord = require("discord.js");
const Comfi = require("./utils/Comfi"),	
bot = new Comfi(); 

module.exports = bot;

//--------[ HANDLING ERRORS ]--------\\

process.on('unhandledRejection', error => { 

  const channel = bot.channels.cache.find(c => c.id === "880101469586604032");
  const embed = new Discord.MessageEmbed()
    .setTitle(`${bot.error} unhandledRejection`)
    .setDescription(`${error.stack}`)
    .setColor("#FF5757")
    .setImage('https://giffiles.alphacoders.com/354/35481.gif')
    .setTimestamp();

  if(channel) {
    channel.send({ embeds: [ embed ]});
  } else if (!channel) {
    bot.logger.error(`${error.stack}`)
  }
  
})

process.on("uncaughtException", (error) => {

  const channel = bot.channels.cache.find(c => c.id === "880101469586604032");
  const embed = new Discord.MessageEmbed()
    .setTitle(`${bot.error} uncaughtException`)
    .setDescription(`${error.stack}`)
    .setColor("#FF5757")
    .setImage('https://giffiles.alphacoders.com/354/35481.gif')
    .setTimestamp();

  if(channel) {
    channel.send({ embeds: [ embed ]});
  } else if (!channel) {
    bot.logger.error(`${error.stack}`)
  }
  
})

//---------[ PROCESS ENDED ]---------\\
