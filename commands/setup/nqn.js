const { CommandInteraction, MessageEmbed } = require('discord.js')
const guilds = require('../../models/guild')

module.exports = {
	name: 'nqn',
	description: 'Use animated emojis without nitro',
	ownerOnly: false,
	options: [
		{
			type: 'STRING',
			description: 'Toggle nqn',
			name: 'option',
			required: true,
			choices: [
				{
					name: 'true/on',
					value: 'true'
				},
				{
					name: 'false/off',
					value: 'false'
				}
			]
		}
	],
	userperm: ['MANAGE_GUILD'],
	botperm: ['MANAGE_GUILD'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		try {
			const toggle = interaction.options.getString('option')
			await guilds.findOneAndUpdate(
				{ guildId: interaction.guild.id },
				{
					nqn: toggle
				}
			)
			return interaction.editReply(
				`Nqn for **${interaction.guild.name}** has been set to: **${toggle}**`
			)
		} catch (err) {
			return interaction.editReply(
				`${
					bot.error
				} An error has occured [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord) \nError: ${err}`
			)
		}
	}
}
