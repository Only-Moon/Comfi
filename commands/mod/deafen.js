const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
	name: 'deafan',
	description: 'Deafen a member in Voice Channel',
	ownerOnly: false,
	options: [
		{
			type: 'USER',
			description: 'user to deafen',
			name: 'user',
			required: true
		},
		{
			type: 'STRING',
			description: 'reason to deafen',
			name: 'reason',
			required: true
		}
	],
	userperm: ['DEAFEN_MEMBERS'],
	botperm: ['DEAFEN_MEMBERS'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		try {
			let member =
				interaction.options.getMember('user') ||
				interaction.guild.members.cache.get(args[0]) ||
				interaction.guild.members.cache.find(
					r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
				)

			if (!member)
				return interaction.editReply(
					`${bot.error} • Unable to find the mentioned user in this guild.`
				)

			let reason = interaction.options.getString("reason")

			await member.voice.setDeaf(true, reason)
			interaction.editReply(`${bot.tick} • Deafened ${member.user.username} `)
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
