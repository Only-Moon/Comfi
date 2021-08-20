console.clear()
console.log('Loaded Comfi v2.0');
//Defining dependencies

const { Client, Collection, Intents } = require('discord.js');
const { DiscordTogether } = require('discord-together');

const bot = new Client({	allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS,
Intents.FLAGS.GUILD_VOICE_STATES]                    
     });

const {buttube} = require('buttube');
bot.buttube = new buttube(bot, "mongodb+srv://mohit841:MohitKoul@cluster0.yhyii.mongodb.net/comfi-music"); 

const db = require('old-wio.db')
db.backup('./backup.json');
const fs = require('fs');

bot.commands = new Collection();
bot.aliases = new Collection();
bot.slashCommands = new Collection();
bot.discordTogether = new DiscordTogether(bot, {
     token: process.env['TOKEN']
 });


bot.categories = fs.readdirSync("./commands/");

['command', 'event', 'slash'].forEach(handler => {
	require(`./handlers/${handler}`)(bot);
});

require( `events` ).EventEmitter.defaultMaxListeners = 200;


//bot.on('interactionCreate', async(interaction) => { 
//  if (!interaction.isButton()) return; 
// bot.buttube.interaction(interaction) 
//})
//bot.buttube.events()  

bot.login(process.env['TOKEN']);