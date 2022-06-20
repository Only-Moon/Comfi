/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

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
  directory: "info",
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

          return interaction.followUp({ embeds: [embed] });
        })
    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
}
