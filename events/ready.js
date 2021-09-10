const { PREFIX } = require('../config.js');
const bot = require("../index");
const express = require('express');
const app = express();
const port = 5000;

bot.on("ready", () => {
	console.log(`[INFO]: Ready on client (${bot.user.tag})`);
	console.log(
		`[INFO]: Watching ${bot.commands.size} Commands \n[INFO]: Watching ${bot.slashCommands.size} SlashCommands \n[INFO]: Watching ${bot.guilds.cache.size} Servers \n[INFO]: Watching ${
			bot.channels.cache.size
		} channels \n[INFO]: Watching ${bot.users.cache.size} users`
	);
  
	console.log('-------------------------------------');

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
    });
    index++;
  }, 5000); 
  
app.get('/', (req, res) => res.send('Your bot is alive!')) 

app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`));

});