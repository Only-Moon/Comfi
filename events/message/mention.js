const bot = require('../../index')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

bot.on('messageCreate', async message => {
	if (message.author.bot) return;

	let mentionRegex = message.content.match(
		new RegExp(`^<@!?(${bot.user.id})>`, 'gi')
	)
	if (mentionRegex) {
		let totalCommands = 0
		bot.slashCommands.each(c => totalCommands++)
		const ping = new MessageEmbed()
			.setDescription(
				` > ɛiɜ • **Hello I'm ${
					bot.user.username
				}**. Rewrite of <@873473703470563378> specially for this server!!\n\n > ↛ • You can see all my commands by running \`/helpp\`!\n > ↛ • I have a total of **${
					bot.users.cache.size
				}** users, ${bot.emojis.cache.size} emojis and ${totalCommands} commands !!`
			)
			.setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
			.setColor(bot.color)
			.setFooter({text: `Requested by ${message.author.username}`})
			.setTimestamp()

		let sup = new MessageButton()
			.setStyle('LINK')
			.setLabel('Join Support!')
			.setURL('https://miyuchan.tk/support')
			.setEmoji('883032991293653062')

		let dash = new MessageButton()
			.setStyle('LINK')
			.setLabel('Check Website!')
			.setURL('https://miyuchan.tk/')
			.setEmoji('883017884014637066')

		let row = new MessageActionRow().addComponents(sup, dash)

    
		await message
			.reply({
				embeds: [ping],
				components: [row],
				allowedMentions: { repliedUser: false }
			})
			.catch((e) => {
        bot.sendhook(
          `Error Occured \n ${e.stack}`
        , {
          channel: bot.err_chnl
        })
      })
	}
})
