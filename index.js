console.clear();
console.log('Loading Bot');

//-------[ DEFINING DEPENDENCIES ]---------\\

const { Client, Collection } = require('discord.js');
const db = require('old-wio.db');
const { DiscordTogether } = require('discord-together');
const { buttube } = require('buttube');
const Nuggies = require('nuggies');
const Discord = require("discord.js")

const bot = new Client({	
  allowedMentions: { 
    parse: ['users', 'roles'],
    repliedUser: true },
  intents: 32767
});

//---------[ MAKING COLLECTIONS ]---------\\

bot.commands = new Collection();
bot.aliases = new Collection();
bot.slashCommands = new Collection();

['command', 'event', 'slash'].forEach(handler => {
	require(`./handlers/${handler}`)(bot);
});

//--------[ START ]--------\\

bot.discordTogether = new DiscordTogether(bot, {
  token: process.env['TOKEN']
});

bot.buttube = new buttube(bot, process.env.Buttube); 

db.backup('./backup.json');
const fs = require('fs');

Nuggies.handleInteractions(bot);

bot.categories = fs.readdirSync("./commands/");

require( `events` ).EventEmitter.defaultMaxListeners = 200;

//---------[ MAIKE THE ERROR HANDLER ]---------\\
/**
process.on('unhandledRejection', error => { 
  const channel = bot.channels.cache.get("880101469586604032");
  const embed = new Discord.MessageEmbed()
    .setTitle(':x: Error')
    .setDescription(`${error}`)
    .setColor('RED')
    .setImage('https://giffiles.alphacoders.com/354/35481.gif')
    .setTimestamp()
  
    channel.send({ embeds: [ embed ]});
});
*/
//---------[ MAKE THE BOT ONLINE ]---------\\

bot.login(process.env['TOKEN']);