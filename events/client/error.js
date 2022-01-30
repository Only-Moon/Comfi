let { MessageEmbed } = require('discord.js')
let bot = require('../../index.js')

bot
	.on('disconnect', e => bot.logger.log(`disconnect \n` + e))
	.on('reconnecting', e => bot.logger.log(`Bot is reconnecting \n` + e))
	.on('error', e => bot.logger.error(`error \n` + e))
	.on('rateLimit', err => {})
    //bot.logger.limit(err))
	.on('warn', info => bot.logger.warn(`info \n` + e))

process.on('unhandledRejection', (reason, promise) => {
	const channel = bot.channels.cache.find(c => c.id === bot.err_chnl)

if (reason.stack.includes("DiscordAPIError: Unknown Message")) return;

if (reason.stack.includes("DiscordAPIError: Unknown Interaction")) return;  

if (reason.stack.includes("DiscordAPIError: Unknown Webhook")) return;  

if (reason.stack.includes("DiscordAPIError: Invalid Webhook Token")) return;  
  
if (reason.stack.includes("DiscordAPIError: Missing Permissions")) return;  
    
	const embed = new MessageEmbed()
		.setTitle(`${bot.error} • Unhandled Rejection`)
		.setURL('https://nodejs.org/api/process.html#event-unhandledrejection')
		.setDescription(`\`\`\`${reason.stack.split("").slice(0, 3500).join("")}\`\`\``)
		.setTimestamp()
		.setImage('https://giffiles.alphacoders.com/354/35481.gif')
		.setFooter({text: 'Imagine a bot without anti-crash'})
		.setColor(bot.color)

	if (channel) {
		channel.send({ embeds: [embed] })
	} else if (!channel) {
		bot.logger.error(`${reason.stack}`)
	}
})

process.on('uncaughtException', (err, origin) => {
	const channel = bot.channels.cache.find(c => c.id === bot.err_chnl)

	const embed = new MessageEmbed()
		.setTitle(`${bot.error} • Uncaught Exception`)
		.setURL('https://nodejs.org/api/process.html#event-uncaughtexception')
		.setDescription(`\`\`\`${err.stack.split("").slice(0, 3500).join("")}\`\`\``)
		.setTimestamp()
		.setImage('https://giffiles.alphacoders.com/354/35481.gif')
		.setFooter({text:'Imagine a bot without anti-crash'})
		.setColor('#FF5757')

	if (channel) {
		channel.send({ embeds: [embed] })
	} else if (!channel) {
		bot.logger.error(`${err.stack}`)
	}
})

process.on('uncaughtExceptionMonitor', (err, origin) => {
	const channel = bot.channels.cache.find(c => c.id === bot.err_chnl)

	const embed = new MessageEmbed()
		.setTitle(`${bot.error} • Uncaught Exception Monitor`)
		.setURL(
			'https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor'
		)
		.addField('Origin', origin.toString(), true)
		.setDescription(`\`\`\`${err.stack.split("").slice(0, 3500).join("")}\`\`\``)
		.setImage('https://giffiles.alphacoders.com/354/35481.gif')
		.setTimestamp()
		.setFooter({text: 'Imagine a bot without anti-crash'})
		.setColor('#FF5757')

	if (channel) {
		channel.send({ embeds: [embed] })
	} else if (!channel) {
		bot.logger.error(`${err.stack}`)
	}
})
