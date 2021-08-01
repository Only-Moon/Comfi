const Discord = require('discord.js');
const { PREFIX } = require('../config.js');

// const express = require('express');
// const app = express();
// const port = 5000;
   
module.exports.run = async (bot, message) => {
   //app.get('/', (req, res) => res.send('Your bot is alive!'))

// app.listen(port, () =>
//console.log(`Your app is listening a http://localhost:${port}`)
//);
	console.log(`[INFO]: Ready on client (${bot.user.tag})`);
	console.log(
		`[INFO]: watching ${bot.commands.size} Commands, ${bot.guilds.cache.size} Servers, ${
			bot.channels.cache.size
		} channels & ${bot.users.cache.size} users`
	);
	console.log('-------------------------------------');

	const status = [ 
	  //`in ${bot.guilds.cache.size} Servers | ${bot.user.username}`, 
	//  `with ${bot.guilds.cache.reduce(
	//			(users, value) => users + value.memberCount,
		//		0
//			)} Users | ${bot.user.username}`, 
	  //`in ${bot.channels.cache.size} Channels | ${bot.user.username}`, 
	  `${PREFIX}help | Stay Safe :)`,
	  `✦ . House of Emotes ˚ ₊ ⊹`
	  ] 
	  setInterval(() => { 
	    bot.user.setActivity(status[Math.floor(Math.random() * status.length)], { type: "WATCHING" }) //You Can Set The Type To PLAYING/WATCHING/COMPETING/LISTENING. 
	    }, 5000)
}