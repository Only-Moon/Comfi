const { ContextMenuInteraction, MessageEmbed } = require('discord.js')
//const moment = require('moment')
//require('moment-duration-format')

module.exports = {
	name: 'UserInfo',
	type: 'USER',
	/**
	 *
	 * @param {ContextMenuInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
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
		const joindate = await bot.timestamp(data.joinedTimestamp)
      //.format(
			//'MMMM Do YYYY, H:mm:ss a'
		//)
		const createdate = await bot.timestamp(data.user.createdTimestamp)
//.format(
		//	'MMMM Do YYYY, H:mm:ss a'
	//	)
		const embed = new MessageEmbed()
			.setAuthor(user.tag)
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
		interaction.followUp({ embeds: [embed] }).catch((e) => {
        bot.sendhook(
          `Error Occured \n ${e.stack}`
        ), {
          channel: bot.err_chnl
        } 
        interaction.followUp({
          embeds: [
            {
        description: `${bot.error} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
        color: bot.color,  
           },
        ]
        });
        })
	}
}
