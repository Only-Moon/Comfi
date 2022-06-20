
/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { ContextMenuInteraction, MessageEmbed } = require('discord.js')
const moment = require('moment')
require('moment-duration-format')

module.exports = {
	name: 'userinfo',
	type: 'USER',
  description: "get user's info using context menu",
  directory: "context",
	/**
	 *
	 * @param {ContextMenuInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		try {
			const user = await bot.users.fetch(interaction.targetId)
			const data = interaction.guild.members.cache.get(user.id)
			const roles = data.roles.cache
				.map(x => x)
				.filter(z => z.name !== '@everyone')
			const permissions = data.permissions.toArray().map(perm => {
				return perm
					.toLowerCase()
					.replace(/_/g, ' ')
					.replace(/\w\S*/g, txt => {
						return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
					})
			})
			const joindate = moment(data.joinedTimestamp).format(
				'MMMM Do YYYY, H:mm:ss'
			)
			const createdate = moment(data.user.createdTimestamp).format(
				'MMMM Do YYYY, H:mm:ss'
			)
			const embed = new MessageEmbed()
				.setAuthor({name: user.tag})
				.setThumbnail(user.displayAvatarURL({ dynamic: true }))

				.setDescription(
					`\`🖊\`**Nickname: **\`${data.displayName ??
						'none'}\`\n\n\**Avatar: ** [Link](${user.displayAvatarURL({
						dynamic: true,
						format: 'png'
					})})\n\n\`⌚\`**Joined at:** ${joindate}\n\n\`⌚\`**Created at:** ${createdate}\n\n\`🤖\`**Bot:** \`${
						data.user.bot ? 'Yes' : 'No'
					}\`\n\n**Roles:**\n${roles.join(' ') ||
						'**USER DOES NOT HAVE ANY ROLES**'}\n\n**Permissions:**\n${permissions.join(
						'** | **'
					)}`
				)
				.setColor(bot.color)
				.setTimestamp()
			await interaction.followUp({ embeds: [embed] })
		} catch (e) {
  await bot.senderror(interaction, e)
		}
	}
}
