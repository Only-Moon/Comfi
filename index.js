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
//bot.logger.error(`${error.stack}`)
//})
  
  const channel = bot.channels.cache.get("880101469586604032");
  const embed = new Discord.MessageEmbed()
    .setTitle(`${bot.error} unhandledRejection`)
    .setDescription(`${error.stack}`)
    .setColor("#FF5757")
    .setImage('https://giffiles.alphacoders.com/354/35481.gif')
    .setTimestamp();
  
    channel.send({ embeds: [ embed ]});
});

process.on("uncaughtException", (error) => {
//console.error(error.stack);
//  })
  
  const channel = bot.channels.cache.get("880101469586604032");
  const embed = new Discord.MessageEmbed()
    .setTitle(`${bot.error} uncaughtException`)
    .setDescription(`${error.stack}`)
    .setColor("#FF5757")
    .setImage('https://giffiles.alphacoders.com/354/35481.gif')
    .setTimestamp();
  
    channel.send({ embeds: [ embed ]}); 
})

//---------[ PROCESS ENDED ]---------\\
