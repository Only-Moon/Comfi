console.clear()
console.log('Loaded Comfi v2.0');
//Defining dependencies

const { Client, Collection, Intents } = require('discord.js');

const bot = new Client({	allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]                    
     });


//const {buttube} = require('buttube');
//bot.buttube = new buttube(bot, "mongodb+srv://mohit841:MohitKoul@cluster0.yhyii.mongodb.net/comfi-music"); 
const db = require('old-wio.db')
db.backup('./backup.json');

bot.commands = new Collection();
bot.aliases = new Collection();


['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(bot);
});

require( `events` ).EventEmitter.defaultMaxListeners = 200;


//bot.on("clickButton", async (button) => { 
 // bot.buttube.button(button)});
  

bot.login(process.env['TOKEN']);