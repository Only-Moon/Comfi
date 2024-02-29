const Discord = require('discord.js')
const mongoose = require('mongoose')
const fs = require('fs')
const simplydjs = require('simply-djs')
const guilds = require('../models/guild')
const Economy = require('../functions/eco')
const bot = require('../index')
const Statcord = require('statcord.js')

/*
 * Comfi Bot for Discord
 * Copyright (C) 2023 Xx-Mohit-xX
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

class Comfi extends Discord.Client {
	/**
	 * Constructor for Comfi Discord client class.
	 * Sets up client options like sweepers, intents, partials etc.
	 * Initializes color, logger, owners, support server, functions,
	 * economy manager, command categories and more.
	 */
	constructor() {
		super({
			sweepers: {
				...Discord.Options.DefaultSweeperSettings,
				messages: {
					interval: 3600, // Every hour...
					lifetime: 1800 // Remove messages older than 30 minutes.
				},
				users: {
					interval: 3600, // Every hour...
					filter: () => (user) => user?.bot && user.id !== user?.client.user?.id // Remove all bots.
				}
			},
			failIfNotExists: true,
			allowedMentions: {
				parse: ['users', 'roles'],
				repliedUser: false
			},
			intents: [
				'Guilds',
				'GuildMembers',
				'GuildBans',
				'GuildInvites',
				'GuildEmojisAndStickers',
				'GuildMessages',
				'GuildMessageTyping',
				'MessageContent'
			],
			partials: ['Message', 'Channel', 'GuildMember', 'Guild', 'User'],
			restRequestTimeout: 30000
		})

		this.color = parseInt(process.env.color_name) || 0xf4b3ca
		this.logger = require('./Logger')
		this.dash = process.env.web
		this.ms = require('ms')
		this.owners = process.env.owner || ['753974636508741673']
		this.err_chnl = process.env.error_channel
		this.support = process.env.support || `${this.dash}support`
		if (!this.token) this.token = process.env.TOKEN
		this.functions = require('../functions/function')
		this.btnPage = require('../functions/btnPage').pagination
		this.bcolor = this.functions.color
		this.categories = fs.readdirSync('./commands/')
		this.eco = new Economy(this, { global: true })
		this.dbs(process.env.Mongoose)
		this.slashCommands = new Discord.Collection()
		this.timeout = new Discord.Collection()

		this.statcord = this.Statcord()
		this.init()
	}

	connect() {
		return super.login(this.token)
	}

	async getRandomString(length) {
		const chars =
			'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
		let s = ''
		for (let i = 0; i < length; i++) {
			const rnum = Math.floor(Math.random() * chars.length)
			s += chars.substring(rnum, rnum + 1)
		}
		return s
	}

	/**
	 * Converts a duration in milliseconds to a timestamp string with the given format.
	 * @param {number} time - Duration in milliseconds
	 * @param {string} [form] - Timestamp format string
	 * @returns {string} Formatted timestamp string
	 */
	async timestamp(time, form) {
		const minutes = Math.floor(time / 1000) % 60
		const hours = Math.floor(minutes / 60) % 24
		const days = Math.floor(hours / 24) % 7
		const weeks = Math.floor(days / 7) % 1
		const d = new Date()
		const year = d.getUTCFullYear()
		const month = d.getUTCMonth()
		const day = d.getUTCDate()
		const hour = d.getUTCHours()
		const minute = d.getUTCMinutes()
		const second = d.getUTCSeconds()
		const datum = new Date(
			Date.UTC(
				year,
				month,
				day + days + weeks * 7,
				hour + hours,
				minute + minutes,
				second
			)
		)
		if (form) {
			return `<t:${datum.getTime() / 1000}:${form || ''}>`
		}
		return `<t:${datum.getTime() / 1000}>`
	}

	
	/**
	 * Returns an emoji string for the given emoji name and option.
	 *
	 * @param {String} name - The name of the emoji
	 * @param {String} option - Either 'id' or 'name' to return the emoji id or name respectively
	 * @returns {String} The emoji string
	 */
	emoji(name, option) {
		const emojis = this.emojis.cache.find((x) => x.name === name)
		if (option === 'id') {
			return emojis.id
		}
		if (option === 'name') {
			return emojis.name
		}
		if (!emojis) {
			return `:${name}:`
		}
		return name
			.split(new RegExp(name, 'g'))
			.join(emojis.toString())
			.split(' ')
			.join('_')
	}

	/**
	 * Converts a duration in milliseconds to a human readable string.
	 *
	 * @param {number} duration - The duration in milliseconds.
	 * @returns {string} The human readable time string.
	 */
	async msToTime(duration) {
		const ms = Math.floor((duration % 1000) / 100)
		const seconds = Math.floor((duration / 1000) % 60)
		const minutes = Math.floor((duration / (1000 * 60)) % 60)
		const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
		const days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 30)

		const day = days < 10 ? `0${days}` : days
		const hour = hours < 10 ? `0${hours}` : hours
		const minute = minutes < 10 ? `0${minutes}` : minutes
		const second = seconds < 10 ? `0${seconds}` : seconds

		return `${day} Days : ${hour} Hrs : ${minute} Min : ${second} Sec.`
	}

	/**
	 * Sends a webhook message to the provided channel.
	 *
	 * @param {*} msg - The message content to send.
	 * @param {Object} options - Options for the webhook.
	 * @param {boolean} [options.remove] - Whether to remove the webhook after sending.
	 * @param {string} options.channel - The channel ID to send the webhook to.
	 * @param {string} [options.id] - An ID to include in the error title.
	 * @param {Object} [options.embed] - An embed object to send.
	 * @param {string} [options.name] - The webhook name.
	 * @param {string} [options.avatar] - The webhook avatar URL.
	 * @param {Discord.Client} options.bot - The Discord client.
	 * @returns {Promise<Discord.WebhookMessage|Discord.Webhook>} The sent webhook message, or the webhook if remove is false.
	 */
	async sendhook(
		msg,
		{
			remove = false,
			channel,
			id,
			embed = null,
			name = 'COMFI HOOK',
			avatar = 'https://i.imgur.com/At2XO1M.png',
			bot = this
		}
	) {
		if (!channel || typeof channel !== 'string')
			throw new SyntaxError('Invaild Channel')
		const channel_ = await bot.channels.cache.get(channel)
		let webhook = await channel_
			.fetchWebhooks()
			.then((x) => x.find((x) => x.name === name))
		if (!webhook) webhook = await channel_.createWebhook(name, { avatar })

		const emb = new Discord.EmbedBuilder()

		if (embed) {
			emb.setTitle(
				embed.title
					? embed.title
					: `${this.emoji('error_CS')} • Error Occured. Id: ${id}`
			)
			emb.setDescription(
				`\`\`\`js${embed.description.split('').slice(0, 4000).join('')}\`\`\``
			)
			emb.setColor(bot.color)

			return await webhook.send({ embeds: [emb] }).then((e) => {
				remove ? webhook.delete() : e
			})
		}
		if (msg) {
			emb.setTitle(`${this.emoji('error_CS')} • Error occured. Id: ${id}`)
			emb.setDescription(
				`\`\`\`js${msg.split('').slice(0, 3500).join('')}\`\`\``
			)
			emb.setColor(this.color)

			return await webhook.send({ embeds: [emb] }).then((e) => {
				remove ? webhook.delete() : e
			})
		}
	}

	/**
	 * Sends a success embed message to the provided interaction.
	 *
	 * @param {Object} bot The Discord bot object
	 * @param {Object} interaction The interaction object
	 * @param {string} argument The success message to display
	 */
	async successEmbed(bot, interaction, argument) {
		const embed = new Discord.EmbedBuilder()
			.setDescription(`${this.emoji('tick_CS')} • ${argument}`)
			.setColor(bot.color)

		if (interaction.commandId) {
			return await interaction
				.editReply({
					embeds: [embed],
					allowedMentions: { repliedUser: false },
					fetchReply: true
				})
				.catch(() => {})
		}
		if (!interaction.commandId) {
			interaction.channel
				.send({
					embeds: [embed],
					allowedMentions: { repliedUser: false },
					fetchReply: true
				})
				.catch(() => {})
		}
	}

	/**
	 * Creates and sends an error embed message.
	 *
	 * @param {Object} bot The Discord bot object.
	 * @param {Object} interaction The Discord interaction object.
	 * @param {string} argument The error message text.
	 * @param {string} [img] Optional image URL to include in the embed.
	 */
	async errorEmbed(bot, interaction, argument, img) {
		const embed = new Discord.EmbedBuilder()
			.setDescription(`${this.emoji('cross_CS')} • ${argument}`)
			.setColor(0xfe6666)
		if (img && bot.functions.match_regex('img', img)) {
			embed.setImage(img)
		}

		if (interaction.commandId) {
			return await interaction
				.editReply({
					embeds: [embed],
					allowedMentions: { repliedUser: false },
					fetchReply: true
				})
				.catch(() => {})
		}
		if (!interaction.commandId) {
			interaction.channel
				.send({
					embeds: [embed],
					allowedMentions: { repliedUser: false },
					fetchReply: true
				})
				.catch(() => {})
		}
	}

	/**
	 * @param {Discord.Client} bot - Discord Client
	 * @param {Discord.CommandInteraction} interaction - Interaction
	 * @param {string} argument - the error
	 * @param {boolean} button - for showing support button
	 */
	async failEmbed(bot, interaction, argument, button) {
		const embed = new Discord.EmbedBuilder()
			.setTitle(`${this.emoji('error_CS')} • Unknown Error Occured`)
			.setDescription(`${argument}`)
			.setColor(0xFE6666)

		if (button === false) {
			if (interaction.commandId) {
				await interaction
					.editReply({
						embeds: [embed],
						allowedMentions: { repliedUser: false },
						ephemeral: true,
						fetchReply: true
					})
					.catch(() => {})
			} else if (!interaction.commandId) {
				interaction.channel.send({ embeds: [embed] }).catch(() => {})
			}
		} else {
			const row = new Discord.ActionRowBuilder().addComponents(
				new Discord.ButtonBuilder()
					.setStyle(Discord.ButtonStyle.Link)
					.setURL(this.support)
					.setLabel('Contact Developer')
					.setEmoji('984647916876619787')
			)

			if (interaction.commandId) {
				await interaction
					.editReply({
						embeds: [embed],
						allowedMentions: { repliedUser: false },
						ephemeral: true,
						components: [row],
						fetchReply: true
					})
					.catch(() => null)
			} else if (!interaction.commandId) {
				interaction.channel
					.send({ embeds: [embed], components: [row] })
					.catch(() => {})
			}
		}
	}

	/**
	 * Sends an error embed to the user and logs the error.
	 *
	 * @param {Discord.Interaction} interaction - The interaction that triggered the error.
	 * @param {Error} error - The error object.
	 */
	async senderror(interaction, error) {
		const id = this.getWord()
		this.sendhook(error.stack, {
			channel: this.err_chnl,
			id
		})
		if (interaction instanceof Discord.CommandInteraction) {
			return await this.failEmbed(
				this,
				interaction,
				`> Try again after a while\n> Contact developers if error still exists\n> Error Id: ${id}`,
				true
			)
		}
	}

	/**
	 * Generates a random word to use as an identifier
	 */
	getWord() {
		const chars =
			'1234567890QWERTYUIOPASDFGHJKLZXCVBNMqweryuiopasdfghjklzxcvbnm'
		let str = ''
		for (let i = 0; i < 6; i++) {
			str += chars[Math.floor(Math.random() * chars.length)]
		}
		return str
	}

	/**
	 * Logs a moderation action to the server's mod log channel.
	 *
	 * Logs details of a moderation action taken on a member to the
	 * configured mod log channel for the guild.
	 *
	 * @param {Discord.Member} Member - The member being moderated
	 * @param {string} Action - The moderation action taken
	 * @param {string} Reason - The reason provided for the action
	 * @param {Discord.CommandInteraction} interaction - The interaction that triggered the mod action
	 */
	async modlog({ Member, Action, Reason, Mod }, interaction) {
		const data = await guilds.findOne({ guildId: interaction.guild.id })
		if (!data.modlog) return

		const channel = interaction.guild.channels.cache.get(data.mod_channel)

		let auth
		if (interaction.commandId) {
			auth = interaction.user.username
		} else if (!interaction.commandId) {
			auth = interaction.author.username
		}
		const logsembed = new Discord.EmbedBuilder()
			.setColor(this.color)
			.addFields(
				{
					name: '**Modlogs**',
					value: `${Action ? `${Action}ed` : 'Not Found'}`,
					inline: true
				},
				{
					name: `**${Action ? `${Action.toUpperCase()}ED` : 'Not Found'}**`,
					value: `${Member.user ? Member.user.username : 'Not Found'}`,
					inline: true
				},
				{
					name: '**ID**',
					value: `${Member ? Member.id : 'Not Found'}`,
					inline: true
				},
				{
					name: `**${Action.toUpperCase()}ED by: **`,
					value: `${auth || 'Not Found'}`,
					inline: true
				},
				{
					name: '**Reason**',
					value: `${Reason || 'No Reason Provided'}`,
					inline: true
				},
				{
					name: '**Date**',
					value: `${
						interaction.createdAt
							? interaction.createdAt.toDateString()
							: 'Not Available'
					}`,
					inline: true
				}
			)
			.setThumbnail(Member.displayAvatarURL({ dynamic: true }))
			.setAuthor({
				name: `${interaction.guild?.name} • Modlogs`,
				iconURL: `${
					interaction.guild.iconURL()
						? interaction.guild.iconURL()
						: this.user.displayAvatarURL({
								dynamic: true
						    })
				}`
			})
			.setFooter({ text: 'Comfi™ Modlogs' })

		if (channel) channel.send({ embeds: [logsembed] })
	}

	/**
	 * Connects to MongoDB database(s) and handles events.
	 *
	 * @param {string} s - MongoDB connection string
	 */
	dbs(s) {
		mongoose.set('strictQuery', false)
		mongoose.connect(s, {
			connectTimeoutMS: 30000,
			useUnifiedTopology: false
		})
		mongoose.Promise = global.Promise
		mongoose.connection.on('connected', () => {
			this.logger.ready('[DB] DATABASE CONNECTED')
		})
		mongoose.connection.on('err', (err) => {
			this.logger.error(`Mongoose connection error: \n ${err.stack}`)
		})
		mongoose.connection.on('disconnected', () => {
			this.logger.error('Mongoose disconnected')
		})

		simplydjs.connect(s, false)
	}

	/**
	 * Initializes the client by requiring event handlers and setting emoji constants.
	 *
	 * Requires the event handler module to handle client events.
	 *
	 * On client ready, sets constant emoji references for common emoji IDs used throughout the codebase.
	 */
	init() {
		require('../handler/index')(this)

		// setting emojis to client
		this.once('ready', () => {
			this.error = this.emoji(
				process.env.error ? process.env.error : 'error_CS'
			)
			this.tick = this.emoji(process.env.tick ? process.env.tick : 'tick_CS')
			this.cross = this.emoji(
				process.env.cross ? process.env.cross : 'cross_CS'
			)
			this.currency = this.emoji(
				process.env.currency ? process.env.currency : 'currencyy_Blossomii'
			)
		})
	}

	/**
	 * Initializes Statcord client to post server statistics.
	 * Configures Statcord client with the bot's client instance and API key.
	 * Registers event listeners to handle Statcord lifecycle events.
	 * Autoposts stats every 6 hours if not in DEV_MODE.
	 */
	Statcord() {
		const statcord = new Statcord.Client({
			client: this,
			key: process.env.statcord //statcord.com-APIKEY
		})

		this.once('ready', () => {
			if (process.env.DEV_MODE.toString() === 'false') {
				// post data to statcord
				statcord.autopost()
			}
		})
		setInterval(() => {
			statcord.on('autopost-start', () => {
				// Emitted when statcord autopost starts
				// console.log("Started autopost");
			})
		}, this.ms('6h'))
		statcord.on('post', (status) => {
			// status = false if the post was successful
			// status = "Error message" or status = Error if there was an error
			if (!status) return
			else console.error(status)
		})
		return statcord
	}
}

module.exports = Comfi
