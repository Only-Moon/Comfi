//----------[ LOADING BOT ]----------\\

console.clear();
console.log('Loading Bot...');

//-----[ DEFINING DEPENDENCIES ]-----\\

const { Client, Collection } = require('discord.js');
const db = require('old-wio.db');
const { DiscordTogether } = require('discord-together');
const Nuggies = require('nuggies');
const Levels = require("discord-xp");

const bot = new Client({	
  allowedMentions: { 
    parse: ['users', 'roles'],
    repliedUser: true },
  intents: 32767,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER']
});

module.exports = bot;

//-------[ MAKING COLLECTIONS ]-------\\

bot.commands = new Collection();
bot.aliases = new Collection();
bot.slashCommands = new Collection();
bot.timeout = new Collection();

['command', 'event', 'slash'].forEach(handler => {
	require(`./handlers/${handler}`)(bot);
});

//--------[ PROCESS STARTED ]--------\\

bot.discordTogether = new DiscordTogether(bot, {
  token: process.env['TOKEN']
}); 

db.backup('./backup.json');
const fs = require('fs');

Nuggies.handleInteractions(bot);

Levels.setURL(process.env.Levels)

bot.categories = fs.readdirSync("./commands/");

require( `events` ).EventEmitter.defaultMaxListeners = 200;

//--------[ HANDLING ERRORS ]--------\\
/**
process.on('unhandledRejection', error => { 
  const channel = bot.channels.cache.get("880101469586604032");
  const embed = new Discord.MessageEmbed()
    .setTitle(':x: Error')
    .setDescription(`${error}`)
    .setColor('RED')
    .setImage('https://giffiles.alphacoders.com/354/35481.gif')
    .setTimestamp();
  
    channel.send({ embeds: [ embed ]});
});
*/
//-------[ MAKING BOT ONLINE ]-------\\

bot.login(process.env['TOKEN']);

//---------[ PROCESS ENDED ]---------\\