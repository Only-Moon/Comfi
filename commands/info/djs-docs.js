const { CommandInteraction } = require('discord.js')
const axios = require('axios')
module.exports = {
	name: 'djsdocs',
	description: 'Search Djs Docs',
  directory: "info",
	options: [
		{
			name: 'query',
			type: 'STRING',
			description: 'Your query',
			required: true
		}
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		try {
			const query = interaction.options.getString('query')
			if (!query) return interaction.followUp('Please specify a query!')
			const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
				query
			)}`

			axios
				.get(url)
				.then(embed => {
					const { data } = embed

					if (data && !data.error) {
						interaction.followUp({ embeds: [data] })
					} else {
						interaction.followUp('Could not find that documentation')
					}
				})
				.catch(e => {
					let emed = new MessageEmbed()
						.setTitle(`${bot.error} • Error Occured`)
						.setDescription(`\`\`\`${e.stack}\`\`\``)
						.setColor(bot.color)

					bot.sendhook(null, {
						channel: bot.err_chnl,
						embed: emed
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
