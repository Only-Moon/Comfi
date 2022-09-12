const Discord = require('discord.js'),
  mongoose = require('mongoose'),
  chalk = require('chalk'),
  fs = require('fs'),
  guilds = require('../models/guild'),
  simplydjs = require("simply-djs"),
  Economy = require("../functions/eco.js") 
  bot = require("../index")

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

class Comfi extends Discord.Client {
	constructor() {
		super({
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
				'GuildMessageTyping'
			],
			partials: [
				'Message',
				'Channel',
				'GuildMember',
				'Guild',
				'User'
			],
			restRequestTimeout: 30000
    })
    this.color = process.env["color"] || "#F4B3CA"
    this.logger = require('./Logger.js')
    this.dash = process.env['web']
    this.ms = require('ms')
    this.owners = process.env['owner'] || ["753974636508741673"]
    this.err_chnl = process.env['error_channel']
    this.support = process.env["support"] || this.dash + 'support'
    this.login(process.env.TOKEN)
    this.functions = require('../functions/function.js')
    this.btnPage = require('../functions/btnPage.js')
    this.bcolor = this.functions.color
    this.categories = fs.readdirSync('./commands/')
    this.eco = new Economy(this, process.env.Mongoose, {global:true})
    this.dbs(process.env.Mongoose)
    this.commands = new Discord.Collection()
    this.aliases = new Discord.Collection()
    this.slashCommands = new Discord.Collection()
    this.timeout = new Discord.Collection()
    this.init()
  }

   slice(limit) {

let pos = 0

function returnNextBatch (currPos, startPos, step) {
    return Number(startPos + (currPos * step))
}
let loop, loop1; 
     for (const i = 8; pos < i; pos++) {
const a = returnNextBatch(pos, 0, limit)
const b = returnNextBatch(pos, limit, limit)
     loop = a, loop1 = b
    }
  console.log(loop) 
  console.log(loop1)
  return loop, loop1
}
  
  async resolveUser(search) {
    if (!search || typeof search !== 'string') return null
    let user = null
    search = search.split(' ').join('')
    if (search.match(/^<@!?(\d+)>$/))
      user = await this.users
        .fetch(search.match(/^<@!?(\d+)>$/)[1])
        .catch(() => { })
    if (search.match(/^!?(\w+)#(\d+)$/) && !user)
      user = this.users.cache.find(
        u =>
          u.username === search.match(/^!?(\w+)#(\d+)$/)[0] &&
          u.discriminator === search.match(/^!?(\w+)#(\d+)$/)[1]
      )
    if (search.match(/.{2,32}/) && !user)
      user = this.users.cache.find(u => u.username === search)
    if (!user) user = await this.users.fetch(search).catch(() => { })
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
  
  /* 
* @param {String} name - emoji name
* @param {String} option - id or name
*/
  emoji(name, option) {
    let emojis = this.emojis.cache.find(x => x.name === name)
    if (option === 'id') {
      return emojis.id
    }
    if (option === 'name') {
      return emojis.name
    }
    if (!emojis) {
      return `:${name}:`
    } else {
      return name 
       .split(new RegExp(name, 'g')) 
       .join(emojis.toString()) 
       .split(' ') 
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
    const channel_ = await bot.resolveChannel(channel)
    let webhook = await channel_
      .fetchWebhooks()
      .then(x => x.find(x => x.name === name))
        if (!webhook) webhook = await channel_.createWebhook(name, { avatar })
    
    const emb = new Discord.EmbedBuilder()
    
    if (embed) {
      emb.setTitle(embed.title ? embed.title : `${this.emoji("error_CS")} • Error Occured. Id: ${id}`)
      emb.setDescription(embed.description ? `\`\`\`js${embed.description.split(" ").slice(0, 4000).join(" ")}\`\`\`` : `\`\`\`js${embed.description}\`\`\``)
      emb.setColor(bot.color)

return await webhook.send({ embeds: [emb] }).then(e => {
      remove ? webhook.delete() : e
    })
      
    } else if (msg) {
      emb.setTitle(`${this.emoji("error_CS")} • Error occured. Id: ${id}`)
      emb.setDescription(msg ? msg.split(" ").slice(0, 4000).join(" ") : msg)
      emb.setColor(this.color)

return await webhook.send({ embeds: [emb] }).then(e => {
      remove ? webhook.delete() : e
    })
      
    }
      }
  
  async successEmbed(bot, interaction, argument) {
    const embed = new Discord.EmbedBuilder()
      .setDescription(`${this.emoji("tick_CS")} • ${argument}`)
      .setColor(bot.color);

    if (interaction.commandId) {
    return await interaction.editReply({ embeds: [embed], allowedMentions: { repliedUser: false }, fetchReply: true }).catch(()=>{});
    } else if(!interaction.commandId) {
      interaction.channel.send({embeds: [embed], allowedMentions: {repliedUser: 
false }, fetchReply:  true}).catch(() => {})
    }
  };

	/**
	 * @param {Discord.Client} bot - Discord Client
   * @param {Discord.CommandInteraction} interaction - Interaction
   * @param {string} argument - the error
   * @param {boolean} button - for showing support button
  */
  async errorEmbed(bot, interaction, argument, button) {
    const embed = new Discord.EmbedBuilder()
      .setTitle(`${this.emoji("error_CS")} • Unknown Error Occured`)
      .setDescription(`${argument}`)
      .setColor("#FE6666");

    
 if (!button) {

    if (interaction.commandId) {
      await interaction.editReply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: true , fetchReply:  true }).catch(()=>{});
    } else if (!interaction.commandId) {
      interaction.channel.send({embeds: [embed]}).catch(()=>{});
    }  
  } else {
      const row = new  Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Link)
          .setURL(this.support)
          .setLabel('Contact Developer') 
          .setEmoji("984647916876619787")
      )

    if (interaction.commandId) {
  
      await interaction.editReply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: true , components: [row], fetchReply: 
true }).catch(()=>null)
    } else if (!interaction.commandId) {
      interaction.channel.send({embeds: [embed], components: [row]}).catch(()=>{});
    }
   
  }
  }

  /**
  * @param {Discord.CommandInteraction} interaction
  * @param {string} error
  */
  async senderror(interaction, error) {
  
  this.sendhook(error.stack, {
      channel: this.err_chnl,
      id: this.getWord()
    })
 if (interaction instanceof Discord.CommandInteraction) {
    return await this.errorEmbed(this, interaction, `> Try again after a while\n> Contact developers if error still exists\n> Error Id: ${this.getWord()}`, true)
    }
  }

 getWord() {
	let chars = '1234567890QWERTYUIOPASDFGHJKLZXCVBNMqweryuiopasdfghjklzxcvbnm'
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
    const data = await guilds.findOne({ guildId: interaction.guild.id });
    if (!data.modlog) return;

    const channel = interaction.guild.channels.cache.get(data.mod_channel);

    let auth;
    if (interaction.commandId) {
      auth = interaction.user.username
    } else if (!interaction.commandId) {
      auth = interaction.author.username
    }
    const logsembed = new Discord.EmbedBuilder()
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
          value: `${auth ? auth : "Not Found"}`,
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
      .setThumbnail(Member.displayAvatarURL({ dynamic: true }))
      .setAuthor({
        name: `${interaction.guild ?.name} • Modlogs`, iconURL: `${interaction.guild.iconURL() ? interaction.guild.iconURL() : this.user.displayAvatarURL({
          dynamic:
            true
        })}`
      })
      .setFooter({ text: "Comfi™ Modlogs" });

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
  
simplydjs.connect(s, false)     
  }
  
  init() {
    require('../handler/index')(this)
    this.once("ready", () => {
    this.error = this.emoji(process.env.error ? process.env.error : "error_CS")
    this.tick = this.emoji(process.env.tick ? process.env.tick : "tick_CS")
    this.cross = this.emoji(process.env.cross ? process.env.cross : "cross_CS")
    this.currency = this.emoji(process.env.currency ? process.env.currency : "currencyy_Blossomii")
    })
  }
}

module.exports = Comfi
