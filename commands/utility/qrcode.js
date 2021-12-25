const { CommandInteraction } = require('discord.js')

module.exports = {
	name: 'qrcode',
	description: 'Generate a qr code from a link',
	ownerOnly: false,
	options: [
		{
			name: 'link',
			description: 'The Link to generate a qr code from',
			required: true,
			type: 'STRING'
		}
	],
	userperm: [''],
	botperm: [''],

	/**
	 * @param {CommandInteraction} interaction
	 * @param {string[]} args
	 */
	run: async (bot, interaction, args) => {
		try {
			const { Utils } = require('djs-utils')
			const util = new Utils({
				args: args,
				slashCommand: true,
				interaction: interaction,
				embedFooter: `Requested by ${interaction.member.displayName}`, //The Footer of the embed
				embedTitle: 'Generated A QR Code', //The title of the embed
				embedColor: bot.color //The color of the embed! (Use Hex codes or use the color name)
			})
			util.qrcode()
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
