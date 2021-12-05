const { CommandInteraction, MessageEmbed } = require('discord.js')
const malScraper = require('mal-scraper')

module.exports = {
	name: 'animesearch',
	description: 'Get Information About An Anime',
	options: [
		{
			name: 'name',
			description: 'The name of the anime you want to search',
			required: true,
			type: 'STRING'
		}
	],
	userperm: [''],
	botperm: [''],

	run: async (bot, interaction, args) => {
		const [name] = interaction.options.getString('name')
		const search = name
		malScraper.getInfoFromName(search).then(data => {
			if (data.rating === 'Rx - Hentai' || 'R - 17+ (violence & profanity)') {
				return interaction.editReply({
					content: `${bot.error} • Hentai or Nsfw Searching is Not Allowed !!`
				})
			} else {
				const malEmbed = new MessageEmbed()
					.setAuthor(
						`My Anime List search result for ${args}`.split(',').join(' ')
					)
					.setThumbnail(data.picture)
					.setColor(bot.color) //What ever u want color!
					.addField('Premiered', `\`${data.premiered}\``, true)
					.addField('Broadcast', `\`${data.broadcast}\``, true)
					.addField('Genres', `\`${data.genres}\``, true)
					.addField('English Title', `\`${data.englishTitle}\``, true)
					.addField('Japanese Title', `\`${data.japaneseTitle}\``, true)
					.addField('Type', `\`${data.type}\``, true)
					.addField('Episodes', `\`${data.episodes}\``, true)
					.addField('Rating', `\`${data.rating}\``, true)
					.addField('Aired', `\`${data.aired}\``, true)
					.addField('Score', `\`${data.score}\``, true)
					.addField('Favorite', `\`${data.favorites}\``, true)
					.addField('Ranked', `\`${data.ranked}\``, true)
					.addField('Duration', `\`${data.duration}\``, true)
					.addField('Studios', `\`${data.studios}\``, true)
					.addField('Popularity', `\`${data.popularity}\``, true)
					.addField('Members', `\`${data.members}\``, true)
					.addField('Score Stats', `\`${data.scoreStats}\``, true)
					.addField('Source', `\`${data.source}\``, true)
					.addField('Synonyms', `\`${data.synonyms}\``, true)
					.addField('Status', `\`${data.status}\``, true)
					.addField('Identifier', `\`${data.id}\``, true)
					.addField('Link', data.url, true)
					.setTimestamp()
					.setFooter(
						`Requested by ${interaction.member.displayName}`,
						interaction.user.displayAvatarURL({ dynamic: true })
					)

				interaction.followUp({ embeds: [malEmbed] })
			}
		})
	}
}
