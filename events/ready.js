const { PREFIX } = require('../config.js');
const simplydjs = require('simply-djs');
const { glob } = require("glob");
const { promisify } = require("util");

const express = require('express');
const app = express();
const port = 8000 || process.env['PORT'];
   
module.exports.run = async (bot) => {
  app.get('/', (req, res) => res.send(`Bot is alive, ws ping here: ${bot.ws.ping}ms!
`))

  app.listen(port, () => {
    console.log(`[INFO]: App is listening on port ${port}`);
  });
  
	console.log(`[INFO]: Ready on client (${bot.user.tag})`);
	console.log(
		`[INFO]: Watching ${bot.commands.size} Commands, ${bot.guilds.cache.size} Servers, ${
			bot.channels.cache.size
		} channels & ${bot.users.cache.size} users`
	);
  
	console.log('-------------------------------------');

const arrayOfStatus = [
    `${bot.guilds.cache.size} servers`,
    `${bot.guilds.cache.reduce((users, value) => users + value.memberCount, 0)} members`,
    `${PREFIX}help | Stay Safe :)`,
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
  }, 10000);
}