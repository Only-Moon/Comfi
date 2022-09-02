/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const users = require(`../../models/users`)

module.exports = {
	name: 'afk',
	description: 'Sets your afk in the server',
  directory: "mod",
	ownerOnly: false,
	options: [
		{
			type: ApplicationCommandOptionType.String,
			description: 'Reason for going AFK',
			name: 'reason',
			required: true
		}
	],
	botperm: [""],
	userperm: [""],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		try {
			const user = await users.findOne({ userId: interaction.user.id })
			if (!user) {
				await users.create({ userId: interaction.user.id })
			}
			setTimeout(async () => {
				const reason = args.join(' ') || 'No reason'
				const date = Date.now()

				await users.findOneAndUpdate(
					{ userId: interaction.user.id },
					{
						afk: true,
						afk_reason: reason,
						afk_set: date
					}
				)

				const embed = new EmbedBuilder()
					.setDescription(`You have been set to afk\n**Reason :** ${reason}`)
					.setColor(bot.color)
					.setAuthor({
					name: `${interaction.user.username}`,
						iconURL: interaction.user.avatarURL({ dynamic: true })
            })
					.setFooter({text: 'Type a message to remove your AFK'})

				if (interaction.member.manageable)
					interaction.member.setNickname(
						'[AFK] ' + interaction.member.displayName
					)

				await interaction.editReply({ embeds: [embed] })
			}, 1000)
		} catch (e) {
  await bot.senderror(interaction, e)
		}
	}
}
