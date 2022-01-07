const bot = require('../../index')
const Discord = require('discord.js')
const express = require('express')
const app = express()
const port = 8080
const ClientSchema = require('../../models/Client')

bot.on('ready', async () => {
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
		'Prefix:': `/`,
		'Commands:': `${bot.slashCommands.size}`,
		'Discord.js:': `v${Discord.version}`,
		'Node.js:': `${process.version}`,
		'Plattform:': `${process.platform} ${process.arch}`,
		'Memory:': `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
			2
		)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`
	})
	bot.logger.ready('-------------------------------------', 'ready')

	let totalCommands = 0
	bot.slashCommands.forEach(cmd => {
		totalCommands++
	})
	const activites = [
		{ name: `/invite | ${bot.guilds.cache.size} servers!`, type: 'WATCHING' },
		{ name: `/infoo | ${bot.users.cache.size} users!`, type: 'LISTENING' },
		{ name: `/vote | ${bot.ws.ping}ms`, type: 'LISTENING' },
		{ name: `/help | ${totalCommands} commands!`, type: 'PLAYING' }
	]
	let activity = 0
	bot.user.setPresence({ status: 'online', activity: activites[0] })
	setInterval(() => {
		if (activity === activity.length) return (activity = 0)
		activity++
		bot.user.setActivity(
			activites[Math.floor(Math.random() * activites.length)]
		)
	}, 1000 * 20)

	app.get('/', (req, res) => res.send('Your bot is alive!'))

	app.listen(port, () =>
		bot.logger.log(`Your app is listening a http://localhost:${port}`)
	)

	setInterval(() => {
		require(`../../functions/member_counter`)(bot)
	}, 60000 * 10)

setInterval(() => {
  require('../../functions/reminder')(bot)
}, 1000)
  
})
