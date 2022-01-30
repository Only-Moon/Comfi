const shorten = require('isgd')
const {
	CommandInteraction,
	MessageEmbed,
	MessageButton,
	MessageActionRow
} = require('discord.js')

module.exports = {
	name: 'linkshorten',
	description: 'Shorten your Url to is.gd format !!',
  directory: "utility",
	ownerOnly: false,
	options: [
		{
			type: 'STRING',
			description: 'link to shorten',
			name: 'link',
			required: true
		},
		{
			type: 'STRING',
			description: 'Short name for url',
			name: 'name',
			required: true
		}
	],
	userperm: [''],
	botperm: [''],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args, message) => {
		try {
			if (!args[0]) {
				shorten.shorten(args[0], function(res) {
					if (res.startsWith('Error:'))
						return interaction.editReply(
							`<a:Attention:883349868062576701> Provide a valid url **${res}**`
						)
				})
			} else {
				shorten.custom(args[0], args[1], function(res) {
					if (res.startsWith('Error:'))
						return interaction.editReply(
							`<a:Attention:883349868062576701> **${res}**`
						)

					const row = new MessageActionRow().addComponents(
						new MessageButton()
							.setStyle('LINK')
							.setURL(`${res}`)
							.setLabel('Your Shortened Url!')
					)

					const embed = new MessageEmbed()
						.setAuthor(
							`${interaction.user.username}`,
							interaction.user.avatarURL({ dynamic: true })
						)
						.setDescription(`Here is your shortened url \n ${res}`)
						.setColor(bot.color)

					interaction.editReply({
						embeds: [embed],
						components: [row]
					})
				})
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
