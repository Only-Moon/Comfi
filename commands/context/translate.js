const { ContextMenuInteraction, MessageEmbed } = require('discord.js')
const translate = require('@iamtraction/google-translate')

module.exports = {
	name: 'translate',
  description: "translate user's message using context menu",
  directory: "context",
	type: 'MESSAGE',
	userperm: [''],
	botperm: [''],
	/**
	 *
	 * @param {ContextMenuInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		try {
			const msg = await interaction.channel.messages.fetch(interaction.targetId)

			const translated = await translate(msg.content, { to: 'en' })
			const embed = new MessageEmbed()
				.setFooter(`${interaction.user.tag}`)
				.setTimestamp()
				.addField('Text To Translate:', `\`\`\`${msg.content}\`\`\``)
				.addField('Translateted Text:', `\`\`\`${translated.text}\`\`\``)
				.setColor(bot.color)

			interaction.followUp({ embeds: [embed] }).catch(e => {
				bot.sendhook(`Error Occured \n ${e.stack}`, {
					channel: bot.err_chnl
				})
			})
		} catch (e) {
			let emed = new MessageEmbed()
				.setTitle(`${bot.error} • Error Occured`)
				.setDescription(`\`\`\`${e.stack}\`\`\``)
				.setColor(bot.color)

			bot.sendhook(null, {
				channel: bot.err_chnl,
				embed: emed
			})

			interaction.followUp({
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
	}
}
