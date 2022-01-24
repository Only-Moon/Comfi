const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
	name: 'lockdown',
	description: 'Locks whole server incase of raids, etc',
	ownerOnly: false,
	options: [
		{
			type: 'STRING',
			description: 'enable or disable server lockdown',
			name: 'option',
			required: true,
			choices: [
				{
					name: 'true/on',
					value: 'true'
				},
				{
					name: 'false/off',
					value: 'false'
				}
			]
		}
	],
	userperm: ['MANAGE_CHANNELS'],
	botperm: ['MANAGE_CHANNELS'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		try {
			let arg = interaction.options.getString('option')

			const channels = interaction.guild.channels.cache.filter(
				ch => ch.type !== 'GUILD_CATEGORY'
			)
			if (arg === 'true') {
      setTimeout(async () => {
				channels.forEach(async (channel) => {
					await channel.permissionOverwrites
						.create(interaction.guild.roles.everyone, {
							SEND_MESSAGES: false
						})
				})

				let lockEmbed = new MessageEmbed()

					.setThumbnail(
						`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`
					)
					.setAuthor({name: 
						`${interaction.guild.name} Modlogs`,
iconURL:						interaction.guild.iconURL()
                     })
					.setDescription(`**\n\n${bot.tick} • Done! Server Fully Locked! 🔒**`)
					.setColor(bot.color)
				return await interaction.editReply({ embeds: [lockEmbed] })
}, 20000)			
      } else if (arg === 'false') {

        setTimeout(async () => {				channels.forEach(async channel => {
					await channel.permissionOverwrites.create(
						interaction.guild.roles.everyone,
						{
							SEND_MESSAGES: true
						}
					)
				})

				let lockEmbed2 = new MessageEmbed()
					.setColor(bot.color)
					.setThumbnail(
						`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`
					)
					.setAuthor({name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL()})
					.setDescription(
						`**\n\n${bot.tick} • Done! Server Fully Unlocked! 🔓**`
					)
				return interaction.editReply({ embeds: [lockEmbed2] })
	        }, 20000)		
      }
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
