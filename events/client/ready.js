const bot = require('../../index')
const Discord = require('discord.js')
const ClientSchema = require('../../models/Client')
const guilds = require(`../../models/guild`)
const fetch = require("node-fetch")

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

bot.on('ready', async () => {
    
//await fetch("https://cozy-api.xx-mohit-xx.repl.co/json/reverse").then(res => console.log(res))
  
const clientschem = await ClientSchema.findOne({ clientId: bot.user.id })
	if (!clientschem) {
		await ClientSchema.create({ clientId: bot.user.id })
	}

	bot.logger.table({
		'Bot User:': `${bot.user.tag}`,
		'Guild(s):': `${bot.guilds.cache.size} Servers`,
		'Watching:': `${bot.guilds.cache.reduce(
			(a, b) => a + b.memberCount,
			0
		)} Members`,
		'Emoji(s):': `${bot.emojis.cache.size} emotes`,
		'Commands:': `${bot.slashCommands.size}`,
		'Discord.js:': `v${Discord.version}`,
		'Node.js:': `${process.version}`,
		'Plattform:': `${process.platform} ${process.arch}`,
		'Memory:': `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
			2
		)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`
	})
	bot.logger.ready('-------------------------------------', 'ready')

            let totalCommands = 0 
         bot.slashCommands.forEach(cmd => { 
                 totalCommands++ 
         }) 
         const activites = [ 
                 { name: `/invite | ${bot.guilds.cache.size} servers!`, type: 'WATCHING' }, 
                 { name: `/infoo | ${bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`, type: 'LISTENING' }, 
                 { name: `/emoji | ${bot.emojis.cache.size} emojis`, type: 'LISTENING' }, 
                 { name: `/helpp | ${totalCommands} commands!`, type: 'PLAYING' } 
         ] 
         let activity = 0 
         bot.user.setPresence({ status: 'online', activity: activites[0] }) 
         setInterval(() => { 
                 if (activity === activity.length) return (activity = 0) 
                 activity++ 
                 bot.user.setActivity( 
                         activites[Math.floor(Math.random() * activites.length)] 
                 ) 
         }, 1000 * 90)

require('../../functions/server')(bot)

bot.guilds.cache.forEach(async (guild) => { 
  const guilD = await guilds.findOne({ guildId: guild?.id}) 
    
    if (!guilD) { 
      try {
        bot.emit("guildCreate", guild)
      } catch (e) {			
        let emed = new MessageEmbed()
          .setTitle(`${bot.error} • Error Occured`)				
          .setDescription(`\`\`\`${e.stack}\`\`\``)				
          .setColor(bot.color) 			
          bot.sendhook(null, {				
            channel: bot.err_chnl,
            embed: emed			
          }) 
      } 
    } else if (guilD) return; 
})
    
})