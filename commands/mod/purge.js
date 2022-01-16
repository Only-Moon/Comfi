const { CommandInteraction } = require('discord.js'),
	ms = require('ms')

module.exports = {
	name: 'purge',
	description: 'delete x amount of messages',
	userperm: ['MANAGE_MESSAGES'],
	botperm: ['MANAGE_MESSAGES'],
	ownerOnly: false,
	options: [
		{
			name: 'amount',
			type: 'INTEGER',
			description: 'Number of messages to delete',
			required: true,
			min_value: 1,
			max_value: 99
		}
	],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		try {
			let amount = interaction.options.getInteger('amount')

			if (amount > 99)
				return interaction.followUp({
					content: `${bot.error} You cannot delete more than 100 messages`
				})

			const messages = await interaction.channel.messages.fetch({
				limit: amount + 1
			})

			const filtered = messages.filter(
				msg => Date.now() - msg.createdTimestamp < ms('14 days')
			)

			await interaction.channel.bulkDelete(filtered)

			interaction.channel
				.send({
					content: `I've cleared \`${filtered.size - 1}\` messages :broom:`
				})
				.then(msg => {
					setTimeout(() => {
						if (!msg.deleted) msg.delete()
					}, bot.ms('15s'))
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
