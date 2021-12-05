const bot = require('../../index')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

bot.on('messageCreate', async message => {
	if (message.author.bot) return

	let mentionRegex = message.content.match(
		new RegExp(`^<@!?(${bot.user.id})>`, 'gi')
	)
	if (mentionRegex) {
		let totalCommands = 0
		bot.slashCommands.each(c => totalCommands++)
		const ping = new MessageEmbed()
			.setDescription(
				` > <a:tick:890113862706266112> • **Hello I'm ${
					bot.user.username
				}**!\n\n > <a:emoji_87:883033003574579260> • You can see all my commands by running \`/help\`!\n > <a:emoji_87:883033003574579260> • I have a total of **${
					bot.guilds.cache.size
				}** servers and **${
					bot.users.cache.size
				}** users!\n > <a:emoji_87:883033003574579260> • ${totalCommands} commands!`
			)
			.setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
			.setColor(bot.color)
			.setFooter(`Requested by ${message.author.username}`)
			.setTimestamp()

		let sup = new MessageButton()
			.setStyle('LINK')
			.setLabel('Join Support!')
			.setURL('https://comfibot.tk/discord')
			.setEmoji('883032991293653062')

		let inv = new MessageButton()
			.setStyle('LINK')
			.setLabel('Invite Me!')
			.setURL('https://comfibot.tk/invite')
			.setEmoji('883017868944502804')

		let dash = new MessageButton()
			.setStyle('LINK')
			.setLabel('Check Website!')
			.setURL('https://comfibot.tk/')
			.setEmoji('883017884014637066')

		let row = new MessageActionRow().addComponents(sup, inv, dash)

		message
			.reply({
				embeds: [ping],
				components: [row],
				allowedMentions: { repliedUser: false }
			})
			.catch(() => null)
	}
})
