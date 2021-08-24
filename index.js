console.clear()
console.log('Loading Bot');

//-------[ DEFINING DEPENDENCIES ]---------\\

const { Client, Collection, Intents } = require('discord.js');
const db = require('old-wio.db');
const { DiscordTogether } = require('discord-together');
const { buttube } = require('buttube');
const Nuggies = require("nuggies");

const bot = new Client({	allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
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

Nuggies.handleInteractions(bot)

bot.categories = fs.readdirSync("./commands/");

require( `events` ).EventEmitter.defaultMaxListeners = 200;

bot.on('interactionCreate', async(interaction) => { 
 if (!interaction.isButton()) return; 
 bot.buttube.interaction(interaction) 
})
bot.buttube.events()  

//---------[ MAKE THE BOT ONLINE ]---------\\

bot.login(process.env['TOKEN']);