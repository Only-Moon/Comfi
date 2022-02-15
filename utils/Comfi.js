const Discord = require('discord.js'),
	mongoose = require('mongoose'),
	chalk = require('chalk'),
	fs = require('fs'),
  guilds = require('../models/guild')

class Comfi extends Discord.Client {
	constructor() {
		super({
			allowedMentions: {
				parse: ['users', 'roles'],
				repliedUser: false
			},
			intents: [
				'GUILDS',
				'GUILD_MEMBERS',
				'GUILD_BANS',
				'GUILD_MESSAGES',
				'GUILD_EMOJIS_AND_STICKERS',
				'GUILD_INVITES',
				'GUILD_MESSAGE_TYPING'
			],
			partials: [
				'MESSAGE',
				'CHANNEL',
				'REACTION',
				'GUILD_MEMBER',
				'GUILD',
				'USER'
			],
			restRequestTimeout: 30000,		
    })
		this.logger = require('./Logger.js')
		this.color = '#F4B3CA'
		this.error = '<a:error:890107682013474846>'
		this.tick = '<a:tick:890113862706266112>'
		this.crosss = '<a:cross:890113459868553277>'
		this.dash = 'https://comfibot.tk/'
		this.ms = require('ms')
		this.owners = require('../config.json').owners
		this.err_chnl = process.env['error_channel']
		this.login(process.env.TOKEN)
		this.categories = fs.readdirSync('./commands/')
		this.dbs(process.env.Mongoose)
		this.commands = new Discord.Collection()
		this.aliases = new Discord.Collection()
		this.slashCommands = new Discord.Collection()
		this.timeout = new Discord.Collection()
		this.init()
	}

	async resolveUser(search) {
		if (!search || typeof search !== 'string') return null
		let user = null
		search = search.split(' ').join('')
		if (search.match(/^<@!?(\d+)>$/))
			user = await this.users
				.fetch(search.match(/^<@!?(\d+)>$/)[1])
				.catch(() => {})
		if (search.match(/^!?(\w+)#(\d+)$/) && !user)
			user = this.users.cache.find(
				u =>
					u.username === search.match(/^!?(\w+)#(\d+)$/)[0] &&
					u.discriminator === search.match(/^!?(\w+)#(\d+)$/)[1]
			)
		if (search.match(/.{2,32}/) && !user)
			user = this.users.cache.find(u => u.username === search)
		if (!user) user = await this.users.fetch(search).catch(() => {})
		return user
	}
	/**
	 * @returns {Promise<GuildMember>|null}
	 * @param {string} search
	 * @param {Guild} guild
	 */
	async resolveMember(search, guild) {
		if (!search || typeof search !== 'string') return null
		search = search.split(' ').join('')
		const user = await this.resolveUser(search)
		if (!user) return null
		try {
			return await guild.members.fetch(user)
		} catch (e) {
			null
		}
	}
	/**
	 * @returns {Role|null}
	 * @param {string} search
	 * @param {Guild} guild
	 */
	resolveRole(search, guild) {
		if (!search || typeof search !== 'string') return null
		search = search.split(' ').join('')
		let role = null
		if (search.match(/^<@&!?(\d+)>$/))
			role = guild.roles.cache.get(search.match(/^<@&!?(\d+)>$/)[1])
		if (!role) role = guild.roles.cache.find(r => r.name === search)
		if (!role) role = guild.roles.cache.get(search)
		return role
	}
	/**
	 * @returns {Channel|null}
	 * @param {string} search
	 */
	resolveChannel(search) {
		if (!search) return null
		let channel = null
		channel = this.channels.cache.get(
			search
				.replace('<', '')
				.replace('#', '')
				.replace('>', '')
				.split(' ')
				.join('')
		)
		if (!channel) channel = this.channels.cache.find(c => c.name === search)
		if (!channel) channel = this.channels.cache.get(search)
		return channel
	}
	async getRandomString(length) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
		var s = ''
		for (var i = 0; i < length; i++) {
			var rnum = Math.floor(Math.random() * chars.length)
			s += chars.substring(rnum, rnum + 1)
		}
		return s
	}
	async timestamp(time, form) {
		var minutes = Math.floor(time / 1000) % 60
		var hours = Math.floor(minutes / 60) % 24
		var days = Math.floor(hours / 24) % 7
		var weeks = Math.floor(days / 7) % 1
		var d = new Date()
		var year = d.getUTCFullYear()
		var month = d.getUTCMonth()
		var day = d.getUTCDate()
		var hour = d.getUTCHours()
		var minute = d.getUTCMinutes()
		var second = d.getUTCSeconds()
		var datum = new Date(
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
			return '<t:' + datum.getTime() / 1000 + `:${form || ''}>`
		} else {
			return '<t:' + datum.getTime() / 1000 + `>`
		}
	}

	async sendhook(
		msg,
		{
      remove = false,
      channel,
			embed = null,
			name = 'COMFI HOOK',
			avatar = 'https://i.imgur.com/At2XO1M.png',
			bot = this
		}
	) {
		if (!channel || typeof channel !== 'string')
			throw new SyntaxError('Invaild Channel')
		const channel_ = await bot.resolveChannel(channel)
		let webhook = await channel_
			.fetchWebhooks()
			.then(x => x.find(x => x.name === name))
    const emb = new Discord.MessageEmbed()
    if (embed) {
emb.setTitle(embed.title)  
      emb.setDescription(embed.description.split(" ").slice(0, 4000).join(" "))
emb.setColor(bot.color)    }
    
		if (!webhook) webhook = await channel_.createWebhook(name, { avatar })
		return await webhook.send(embed ? { embeds: [emb] } : msg).then(e => {			remove ? webhook.delete() : e		
    })
	}
	async emoji(name, option) {
		let emojis = this.emojis.cache.find(x => x.name === name)
		if (!emojis) return `:${name}:`
		if (option === 'id') {
			return emojis.id
		}
		if (option === 'name') {
			return emojis.name
		}
		if (emojis) {
			return name
				.split(new RegExp(name, 'g'))
				.join(emojis.toString())
				.split(' ')
				.join('_')
		}
	}
 async msToTime(duration) {
	const ms = Math.floor((duration % 1000) / 100),
		seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60),
		hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
		days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 30);

	const day = days < 10 ? '0' + days : days;
	const hour = hours < 10 ? '0' + hours : hours;
	const minute = minutes < 10 ? '0' + minutes : minutes;
	const second = seconds < 10 ? '0' + seconds : seconds;

	return (
		day + ' Days : ' + hour + ' Hrs : ' + minute + ' Min : ' + second + ' Sec.'
	);
}

 async successEmbed(bot, interaction, argument) {
    const embed = new Discord.MessageEmbed()
        .setDescription(`${bot.tick} • ${argument}`)
        .setColor(bot.color);

    return await interaction.editReply({ embeds: [embed], allowedMentions: { repliedUser: false } });

};
 async errorEmbed(bot, interaction, argument) {
   const embed = new Discord.MessageEmbed()
      
        .setDescription(`${bot.error} • ${argument}`)
        .setColor("#FE6666");

    return await interaction.editReply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: true });
}
  
	/**
	 * @param {Member} - Guild Member
   * @param {string} Action - the mod action
   * @param {tring
} eason - the reason
   * @param {Discord.CommandInteraction} interaction - Interaction
  */
  async modlog({ Member, Action, Reason, Mod}, interaction) {
   const data = await guilds.findOne({ guildId: interaction.guild.id }); 
   if(!data.modlog) return;
  
   const channel = interaction.guild.channels.cache.get(data.mod_channel);

    let auth;
if (interaction.customId) {
  auth = interaction.user.username
} else if (!interaction.customId) {
  auth = interaction.author.username }
   const logsembed = new Discord.MessageEmbed()
   .setColor(this.color)
   .addFields({
     name: "**Modlogs**",
     value: `${Action ? (Action + "ed") : "Not Found"}`,
     inline: true
   },
   {
     name: `**${Action ? (Action.toUpperCase() + "ED") : "Not Found"}**`,
     value: `${Member.user ? Member.user.username : "Not Found"}`,
     inline: true
   },
{
     name: "**ID**",
     value: `${Member ? Member.id : "Not Found"}`,
     inline: true
   },
  {
     name: `**${Action.toUpperCase()}ED by: **`,
     value: `${auth ? auth: "Not Found"}`,
     inline: true
   },
  {
     name: "**Reason**",
     value: `${Reason ? Reason : "No Reason Provided"}`,
     inline: true
   },
  {
     name: "**Date**",
     value: `${interaction.createdAt ? interaction.createdAt.toDateString() : "Not Available"}`,
     inline: true
   })
   .setThumbnail(Member.displayAvatarURL({dynamic: true}))
   .setAuthor({name: `${interaction.guild?.name} • Modlogs`, iconURL: `${interaction.guild.iconURL() ? interaction.guild.iconURL() : this.user.displayAvatarURL({dynamic: 
true })}`})
   .setFooter({text: "Comfi™ Modlogs"});

if (channel) channel.send({ embeds: [logsembed] });
 }
      
dbs(s) {
		mongoose
			.connect(
				s,
				{
					useNewUrlParser: true,
					useUnifiedTopology: true
				}
			)
			.then(() => this.logger.log('Mongodb connected!'))
			.catch(err => this.logger.error(`${err.stack}`))
	}

	init() {
		require('../handler/index')(this)
	}
}

module.exports = Comfi
