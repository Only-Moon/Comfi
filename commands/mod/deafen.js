/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
	name: 'deafan',
	description: 'Deafen a member in Voice Channel',
	ownerOnly: false,
  directory: "mod",
	options: [
		{
			type: 'USER',
			description: 'user to deafen',
			name: 'user',
			required: true
		},
		{
			type: 'STRING',
			description: 'reason to deafen',
			name: 'reason',
			required: true
		}
	],
	userperm: ['DEAFEN_MEMBERS'],
	botperm: ['DEAFEN_MEMBERS'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		try {
			let member =
				interaction.options.getMember('user') ||
				interaction.guild.members.cache.get(args[0]) ||
				interaction.guild.members.cache.find(
					r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
				)

			if (!member)
        return await  bot.errorEmbed(bot, interaction, `**Unable to find the mentioned user in this guild.**`
				)

			let reason = interaction.options.getString("reason")

			await member.voice.setDeaf(true, reason)
			interaction.editReply(`${bot.tick} • Deafened ${member.user.username} `)
		} catch (e) {
  await bot.senderror(interaction, e)
		}
	}
}
