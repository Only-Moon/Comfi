const bot = require('../../index')
const simplydjs = require('simply-djs')
const guilds = require('../../models/guild')
const users = require('../../models/users')
const { Collection, MessageEmbed } = require('discord.js')
const scam = require("../../functions/jsons/scam")
const Timeout = new Collection()

bot.on('messageCreate', async message => {
	if (message.author.bot) return;
	if (!message.guild) return;
  if (!message.author) return;

  try {
  
	const guild = await guilds.findOne({ guildId: message.guild.id })
	if (!guild) {
		await guilds.create({ guildId: message.guild.id })
	}

	require(`../../functions/afk`)(message)

	if (guild.leveling) {
		if (message.author.bot) return;
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
  if (guild.anti_scam) {

if (scam.some(word => message.content.toLowerCase().includes(word))) {
          await message.delete()
const time = guild.anti_scam_time
          const embed = new MessageEmbed()
              .setTitle(`Scam Link Detected !!`)
              .setColor(bot.color)
              .setDescription(`**${message.author.tag}** sent a scam link/said a bad word: ||${message.content.toLowerCase()}|| and has been timeout'ed for ${time ? bot.ms(time) : "12 hours"}`)
            .setThumbnail(message.author.displayAvatarURL({dynamic: true }))
              .setFooter({text: `This is a new feature, report to my support server if it doesn't work properly <3`, iconURL: bot.user.displayAvatarURL({ dynamic: true })});

            await message.channel.send({ embeds: [embed] }).then((msg) => {
  setTimeout(() => { if(!msg.deleted) msg.delete() }, bot.ms('2m'))
  });
          
             
         // Timeout the User for 12h
         const member = message.guild.members.cache.get(message.author)
         const timeout = await message.member.timeout(time ? time : 43200000, "Sending Scam links").catch(() => null)

         const embed2 = new MessageEmbed()
         .setTitle(`Scam Link Detected !!`)
         .setDescription(`Dear ${message.author.tag}\nYou have received this because you have sent a not-allowed message.\nServer: **${message.guild.name}**\nMessage: ||${message.content.toLowerCase()}||\n\nYour timeout will be removed automatically in exactly **${time ? bot.ms(time) : "12 Hours"}**.`)
         .setColor(bot.color)
         .setFooter({text: `To: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
         .setTimestamp();

         await message.author.send({ embeds: [embed2]})

        if (!guild.modlog) return;

        if (guild.modlog) {
          let channel = message.guild.channels.cache.find(
            c => c.id === guild.mod_channel
          )
          if (!channel) return;
          const embed = new MessageEmbed()
            .setAuthor({
name:               `${message.guild.name} - Modlogs`,
iconURL: message.guild.iconURL()
              })
            .setColor(bot.color)
            .setFooter({text: message.guild.name, iconURL: message.guild.iconURL()})
            .addField('**Moderation**', 'antiscam')
            .addField('**ID**', `${message.author.id}`)
            .addField('**Timeout\'ed for sending: **', `||${message.content.toLowerCase()}||`)
            .addField('**Reason**', `**Sending Scam Links !!**`)
            .addField('**Date**', message.createdAt.toString())
            .setTimestamp();

          var sChannel = message.guild.channels.cache.get(channel)
          if (sChannel) {
          sChannel.send({ embeds: [embed] })
          } else return;
        } else return;
        }
    
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
	if (!message.guild) return;
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

} catch (e) {
			let emed = new MessageEmbed()
				.setTitle(`${bot.error} • Error Occured`)
				.setDescription(`\`\`\`${e.stack}\`\`\``)
				.setColor(bot.color)

			bot.sendhook(null, {
				channel: bot.err_chnl,
				embed: emed
			})

			message.channel.send({
				embeds: [
					{
						description: `${
							bot.error
						} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
						color: bot.color
					}
				]
			})
}
  
})
