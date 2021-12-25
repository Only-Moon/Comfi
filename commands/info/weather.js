const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
	name: 'weather',
	description: 'Gives the weather of a city',
	options: [
		{
			name: 'city',
			description: 'The city you want the weather of',
			type: 'STRING',
			required: true
		}
	],
	userperm: [''],
	botperm: [''],
	ownerOnly: false,

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		try {
			const weather = require('weather-js')
			const [city] = args
			if (!city)
				return interaction.followUp({ content: `Please Provide a valid city` })

			let degreetype = 'c'
			await weather
				.find({ search: city, degreeType: degreetype }, function(err, result) {
					if (err || result === undefined || result.length === 0)
						return interaction.followUp('Unknown City, Please Try Again.')
					let current = result[0].current
					let location = result[0].location

					const embed = new MessageEmbed()
						.setAuthor(current.observationpoint)
						.setDescription(`> ${current.skytext}`)
						.setThumbnail(current.imageUrl)
						.setTimestamp()
						.setColor(0xdc143c)
						.addField('Latitude', `${location.lat}`, true)
						.addField('Longitude', `${location.long}`, true)
						.addField('Feels Like', `${current.feelslike}° Degrees`, true)
						.addField('Degree Type', `${location.degreetype}`, true)
						.addField('Winds', `${current.windsdisplay || 'None'}`, true)
						.addField('Humidity', `${current.humidity}%`, true)
						.addField('Timezone', `GMT ${location.timezone}`, true)
						.addField('Temperature', `${current.temperature}° Degrees`, true)
						.addField('Observation Time', `${current.observationtime}`, true)

					return interaction.followUp({ embeds: [embed] })
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
