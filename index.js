console.clear()
console.log('Loaded Comfi v2.0');
//Defining dependencies

require('discord-reply');
const Nuggies = require('nuggies');
const { Client, Collection } = require('discord.js');
const Discord = require('discord.js');
const bot = new Client({	disableMentions: 'everyone',	
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const {buttube} = require('buttube');
require('discord-buttons')(bot);
bot.buttube = new buttube(bot, "mongodb+srv://mohit841:MohitKoul@cluster0.yhyii.mongodb.net/comfi-music"); 


const db = require('old-wio.db');
db.backup('./backup.json');
const smartestchatbot = require('smartestchatbot')
const scb = new smartestchatbot.Client()

bot.commands = new Collection();
bot.aliases = new Collection();


['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(bot);
});

require( `events` ).EventEmitter.defaultMaxListeners = 200;


Nuggies.handleInteractions(bot)

bot.on("clickButton", async (button) => { 
  bot.buttube.button(button)});
  

bot.login(process.env.TOKEN);