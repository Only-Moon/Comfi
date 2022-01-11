const {
	CommandInteraction,
	MessageActionRow,
	MessageSelectMenu,
	MessageEmbed
} = require('discord.js')
const clients = require('../../models/Client')

module.exports = {
	name: 'command',
	description: "Enable or Disable Comfi's commands ",
	ownerOnly: true,
	options: [
		{
			type: 'SUB_COMMAND',
			description: 'disable a command',
			name: 'disable',
			options: [
				{
					name: 'command-name',
					type: 'STRING',
					description: 'command name to disable',
					required: true
				}
			]
		},
		{
			type: 'SUB_COMMAND',
			description: 'enable a command',
			name: 'enable',
			options: [
				{
					name: 'command-name',
					type: 'STRING',
					description: 'name of command to enable',
					required: true
				}
			]
		}
	],
	userperm: ['ADMINISTRATOR'],
	botperm: ['MANAGE_GUILD'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (bot, interaction, args) => {
		const [choice] = args

		const name = interaction.options.getString('command-name')

		if (choice === 'disable') {
			const validCommand = bot.slashCommands.find(
				cmd => cmd.name.toLowerCase() === name.toLowerCase()
			)
			if (!validCommand) {
				const embed = new MessageEmbed()
					.setDescription(` >  ${bot.crosss} • Please supply a valid command!`)
					.setColor(bot.color)

				return await interaction.editReply({ embeds: [embed] })
			}

			const client = await clients.findOne({ clientId: bot.user.id })
			client.blackListedCmds.push([validCommand.name])
			await client.save()

			const embed = new MessageEmbed()
				.setDescription(
					` >  ${bot.tick} • Command \`${
						validCommand.name
					}\` has been disabled!`
				)
				.setColor(bot.color)

			return await interaction.editReply({ embeds: [embed] })
		} else if (choice === 'enable') {
			const validCommand = bot.slashCommands.find(
				cmd => cmd.name.toLowerCase() === name.toLowerCase()
			)
			if (!validCommand) {
				const embed = new MessageEmbed()
					.setDescription(` >  ${bot.crosss} • Please supply a valid command!`)
					.setColor(bot.color)

				return await interaction.editReply({ embeds: [embed] })
			}
			const clientschema = await clients.findOne({ clientId: bot.user.id })
			if (!clientschema.blackListedCmds.includes(validCommand.name)) {
				const embed = new MessageEmbed()
					.setDescription(
						` >  ${bot.crosss} • Please supply a valid disabled command!`
					)
					.setColor(bot.color)

				return await interaction.editReply({ embeds: [embed] })
			} else if (client.blackListedCmds.includes(validCommand.name)) {
				const index = client.blackListedCmds.indexOf(validCommand)

				if (index > -1) {
					client.blackListedCmds.splice(index, 1)
				}
				await client.save()

				const embed = new MessageEmbed()
					.setDescription(
						` >  ${bot.tick} • Command \`${
							validCommand.name
						}\` has been enabled!`
					)
					.setColor(bot.color)

				return await interaction
					.editReply({ embeds: [embed] })
					.catch(() => null)
			}
		}
	}
}
