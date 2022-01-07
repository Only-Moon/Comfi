const imdb = require('imdb-api')
const {
  CommandInteraction,
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require('discord.js')

module.exports = {
  name: 'imdb',
  description: 'Search anime, movie, game or series from imdb !!',
  ownerOnly: false,
  options: [
    {
      type: 'STRING',
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
        return interaction.editReply(`${bot.error} • Movie not found`)
      }
      let poster
      if (movie.poster == 'N/A') {
        poster = 'https://images.app.goo.gl/ZGf8fjdWPoAX16tD8'
      } else {
        poster = movie.poster
      }
      let embed = new MessageEmbed()
        .setTitle(movie.title.toString())
        .setColor(bot.color)
        .setThumbnail(`${poster}`)
        .setDescription(movie.plot.toString())
        .setFooter({text: `Ratings: ${movie.rating}`})
        .addField('Country', movie.country, true)
        .addField('Languages', movie.languages, true)
        .addField('Type', movie.type, true)

      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle('LINK')
          .setURL(`${movie.imdburl}`)
          .setLabel('Imdb Url!')
      )

      await interaction.editReply({ embeds: [embed], components: [row] })
    } catch (e) {
      let emed = new MessageEmbed()
        .setTitle(`${bot.error} • Error Occured`)
        .setDescription(`\`\`\`${e ? e.stack : e}\`\`\``)
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
              } Error, try again later \n Error: ${e ? e : "Not Found"} \n [Contact Support](https://comfibot.tk/discord) `,
            color: bot.color
          }
        ]
      })
    }
  }
}
