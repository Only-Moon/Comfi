const Discord = require('discord.js');
const express = require('express');
const app = express();
const port = 3000;
   
module.exports = async (bot, message) => {
   app.get('/', (req, res) => res.send('Your bot is alive!'))

app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`)
);
	console.log(`[INFO]: Ready on client (${bot.user.tag})`);
	console.log(
		`[INFO]: watching ${bot.guilds.cache.size} Servers, ${
			bot.channels.cache.size
		} channels & ${bot.users.cache.size} users`
	);
	console.log('-------------------------------------');
}