const bot = require("../../index");
const express = require('express');
const app = express();
const port = 3000;

bot.on("ready", async () => {
	bot.logger.ready(
		`Watching ${bot.slashCommands.size} Slashs, ${
			bot.channels.cache.size
		} Channels and ${bot.users.cache.size} Users in  ${bot.guilds.cache.size} Servers`
	, 'ready');
  
bot.logger.ready('-------------------------------------', 'ready'); 

let totalCommands = 0
    bot.slashCommands.forEach((cmd) => {
        totalCommands++
    })
    const activites = [
        {name: `/invite | ${bot.guilds.cache.size} servers!`, type: "WATCHING"},
        {name: `/infoo | ${bot.users.cache.size} users!`, type: "LISTENING"},
        {name: `/vote | ${bot.ws.ping}ms`, type: "LISTENING"},
        {name: `/help | ${totalCommands} commands!`, type: "PLAYING"},
    ]
    let activity = 0
    bot.user.setPresence({status: "online", activity: activites[0]})
    setInterval(() => {
        if(activity === activity.length) return activity = 0;
        activity++
        bot.user.setActivity(activites[Math.floor(Math.random() * activites.length)])
    }, 1000 * 20); 
  
app.get('/', (req, res) => res.send('Your bot is alive!')) 

app.listen(port, () =>
bot.logger.log(`Your app is listening a http://localhost:${port}`));

setInterval(() => {
        require(`../../functions/member_counter`)(bot)
    }, 60000 * 10);
      
});