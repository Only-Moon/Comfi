/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const imdb = require('imdb-api')
const {
  CommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ApplicationCommandOptionType,
  ActionRowBuilder 
} = require('discord.js')

module.exports = {
  name: 'imdb',
  description: 'Search anime, movie, game or series from imdb !!',
  ownerOnly: false,
  cooldown: 15,
  directory: "info",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      description: 'Name to search',
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
  run: async (bot, interaction, args) => {
    try {
      const name = interaction.options.getString("name")
      const imob = new imdb.Client({ apiKey: '5e36f0db' })

      let movie = await imob.get({ name: `${name}` })

      if (!movie) {
        return await  bot.errorEmbed(bot, interaction, `{}**Movie not found**`)
      }
      let poster
      if (movie.poster == 'N/A') {
        poster = 'https://images.app.goo.gl/ZGf8fjdWPoAX16tD8'
      } else {
        poster = movie.poster
      }
      let embed = new EmbedBuilder()
        .setTitle(movie.title.toString())
        .setColor(bot.color)
        .setThumbnail(`${poster}`)
        .setDescription(movie.plot.toString())
        .setFooter({ text: `Ratings: ${movie.rating}` })
        .addFields({name: 'Country', value: movie.country, inline: true},
      {name: 'Languages', value: movie.languages, inline: true},
                  {name: 'Type', value: movie.type, inline: true})

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL(`${movie.imdburl}`)
          .setLabel('Imdb Url!')
      )

      await interaction.editReply({ embeds: [embed], components: [row] })
    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
}
