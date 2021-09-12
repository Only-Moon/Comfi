const { PREFIX } = require('../config.js');
const bot = require("../index");
const express = require('express');
const app = express();
const port = 5000;

bot.on("ready", () => {
	bot.logger.ready(
		`Watching ${bot.slashCommands.size} Slashs, ${
			bot.channels.cache.size
		} Channels and ${bot.users.cache.size} Users in  ${bot.guilds.cache.size} Servers`
	, 'ready');
  
bot.logger.ready('-------------------------------------', 'ready'); 

const arrayOfStatus = [
`${bot.guilds.cache.size} servers`, 
`${bot.guilds.cache.reduce((users, value) => users + value.memberCount, 0)} members`, 
`/help | Stay Safe :)`, 
]; 

let index = 0; 
setInterval(() => { 
if (index === arrayOfStatus.length) index = 0; 

const status = arrayOfStatus[index]; 
bot.user.setActivity(`${status}`, { 
type: "WATCHING",
url: "https://www.twitch.tv/blue666opislive", 
}); index++; }, 5000); 
  
app.get('/', (req, res) => res.send('Your bot is alive!')) 

app.listen(port, () =>
bot.logger.log(`Your app is listening a http://localhost:${port}`));

});