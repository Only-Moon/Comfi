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
	constructor() {
		super({
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

		this.color = process.env.color || '#F4B3CA'
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

	/*
	 * @param {String} name - emoji name
	 * @param {String} option - id or name
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

	async errorEmbed(bot, interaction, argument, img) {
		const embed = new Discord.EmbedBuilder()
			.setDescription(`${this.emoji('cross_CS')} • ${argument}`)
			.setColor(bot.color)
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
			.setColor('#FE6666')

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
	 * @param {Discord.CommandInteraction} interaction
	 * @param {string} error
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
	 * @param {Discord.Member} Member - Guild Member
   * @param {string} Action - the mod action
   * @param {string
} Reason - the reason
   * @param
   * @param {Discord.CommandInteraction} interaction - Interaction
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

	dbs(s) {
		mongoose.set('strictQuery', false)
		mongoose.connect(s, {
			connectTimeoutMS: 20000,
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

		statcord.on('autopost-start', () => {
			// Emitted when statcord autopost starts
			// console.log("Started autopost");
		})

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
