const bot = require('../../index')
const simplydjs = require('simply-djs')
const guilds = require('../../models/guild')
const users = require('../../models/users')
const { Collection, MessageEmbed } = require('discord.js')
const Timeout = new Collection()

bot.on('messageCreate', async message => {
	if (message.author.bot) return
	if (!message.guild) return

	const guild = await guilds.findOne({ guildId: message.guild.id })
	if (!guild) {
		await guilds.create({ guildId: message.guild.id })
	}

	require(`../../functions/afk`)(message)

	if (guild.leveling) {
		if (message.author.bot) return
		const userOnLevel = await users.findOne({
			userId: message.author.id,
			guildId: message.guild.id
		})
		if (!userOnLevel) {
			await users.create({
				userId: message.author.id,
				guildId: message.guild.id
			})
		}
		require(`../../functions/leveling`)(message, bot)
	}

	if (guild.nqn) {
		simplydjs.nqn(message)
	}

	let p
	let mentionRegex = message.content.match(
		new RegExp(`^<@!?(${bot.user.id})>`, 'gi')
	)
	if (mentionRegex) {
		p = `${mentionRegex}`
	} else {
		p = 'Cr!'
	}

	if (!message.content.startsWith(p)) return;
	if (!message.guild) return
	if (!message.member) message.member = await message.guild.fetchMember(message)
	const args = message.content
		.slice(p.length)
		.trim()
		.split(/ +/g)
	const cmd = args.shift().toLowerCase()
	if (cmd.length == 0) return
	const command =
		bot.commands.get(cmd.toLowerCase()) ||
		bot.commands.get(bot.aliases.get(cmd.toLowerCase()))

	if (!command) return
	if (command) {
		const user = await users.findOne({
			userId: message.author.id,
			guildId: message.guild.id
		})
		if (!user) {
			await users.create({
				userId: message.author.id,
				guildId: message.guild.id
			})
		}

		command.run(bot, message, args)
	}
})
