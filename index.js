console.clear()
console.log('Loaded Comfi v2.0');
//Defining dependencies

require('discord-reply');
const Nuggies = require('nuggies');
const { Client, Collection } = require('discord.js');
const Discord = require('discord.js');
const bot = new Client({	disableMentions: 'everyone',	
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const {quickbuttube} = require('buttube');
require('discord-buttons')(bot);
bot.buttube = new quickbuttube(bot);

const smartestchatbot = require('smartestchatbot');
const scb = new smartestchatbot.Client()
const db = require('old-wio.db');
db.backup('./backup.json');


bot.commands = new Collection();
bot.aliases = new Collection();


['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(bot);
});

require( `events` ).EventEmitter.defaultMaxListeners = 200;


bot.on('clickButton', button => { Nuggies.handleInteractions(bot, button);});


bot.on("clickButton", async (button) => { 
  bot.buttube.button(button)});
  

bot.login(process.env.TOKEN);