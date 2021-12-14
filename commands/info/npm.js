import got from 'got'
const { CommandInteraction } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
	name: 'npm',
	description: 'Get Information of a NPM Package',
	type: 'CHAT_INPUT',
  userperm: [],
  botperm: [],
  ownerOnly: false,
	options: [
		{
			name: 'package',
			type: 'STRING',
			required: true,
			description: 'The Name of the Package'
		}
	],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		const name = interaction.options.getString('package')
		const url = 'https://api.discube.gq/npm?package=' + name
		got(url).then(async response => {
			const pkg = JSON.parse(response.body)
			if (!pkg)
				return await interaction.editReply({
					content: `${bot.error} • Could not find that package!`
				})
      
			const embed = new Discord.MessageEmbed()
				.setTitle('NPM Package Info Of: ' + pkg.name)
				.addField('Name', pkg.name, true)
				.addField('Version', pkg.version, true)
				.addField('Description', pkg.description, true)
				.addField('Author Name', pkg.author.name, true)
				.addField('Publisher Name', pkg.publisher.username, true)
				.addField('Keywords', pkg.keywords, true)
				.addField('Created On', pkg.created, true)
				.addField('URL', pkg.links.npm, true)
				.setURL(pkg.links.npm)
				.setColor(bot.color)
			return await interaction.editReply({
				embeds: [emed]
			}).catch((e) => {
        bot.sendhook(
          `Error Occured \n ${e.stack}`
        , {
          channel: bot.err_chnl
        })
      })
		})
	}
}