const { CommandInteraction, MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
	name: 'npm',
	description: 'Get info about npm package',
	ownerOnly: false,
	options: [
		{
			type: 'STRING',
			description: 'Package Name',
			name: 'npm',
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
	run: async (bot, interaction, args) => {
		let npm = interaction.options.getString('npm')

		try {
			const response = await fetch(
				`https://api.notzerotwo.ml/data/npm?api=moon_bow&package=${npm}`
			)
			const data = await response.json()

			let embed = new MessageEmbed()
				.setTitle(`Npm Info - ${data.name}`)
				.setDescription(
					`**Name: ** ${data.name} \n**Version: ** ${
						data.version
					} \n**Description :** ${data.description} \n**Author :** ${
						data.author
					} \n **License :** ${data.license}`
				)
				.setColor(bot.color)
				.setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))

				.setFooter(`Requested by ${interaction.user.tag}`)

			await interaction.editReply({ embeds: [embed] })
		} catch (err) {
			return interaction.editReply(
				`${
					bot.error
				} An error has occured. \nError: ${err} \n [Contact Support](https://comfibot.tk/discord)`
			)
		}
	}
}
