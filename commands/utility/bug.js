/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
	name: 'bugreport',
	description: 'Report a bug',
  directory: "utility",
	ownerOnly: false,
	options: [
		{
			type: 'STRING',
			description: 'The bug',
			name: 'bug',
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
	run: async (bot, interaction, args, message) => {
		const member = interaction.member
		const reportCh = bot.channels.cache.get(
			'889149873893539900' || '863684464176922664'
		)
		if (!reportCh) return
		const query = interaction.options
			.getString('bug')
			.split('')
			.slice(0, 2000)
			.join('')
		if (!query) return interaction.followUp({ content: 'Specify a **bug**' })
		const reportEmbed = new MessageEmbed()
			.setTitle('Bug Report')
			.setDescription(
				`**Author :**\n> ${member.user.username} \n**Report :**\n> ${query}`
			)
			.setFooter({text:`Sent From ${member.guild.id}`})
			.setThumbnail(member.user.avatarURL({ dynamic: true }))
			.setTimestamp()
			.setColor(bot.color)
		interaction
			.followUp({ content: 'Report has been sent to the report channel!' })
			.catch(e => {
				interaction.followUp({
					content: `${
						bot.error
					} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
					ephemeral: true
				})
			})
		if (reportCh) {
			reportCh.send({ embeds: [reportEmbed] }).catch(() => null)
		} else return
	}
}
