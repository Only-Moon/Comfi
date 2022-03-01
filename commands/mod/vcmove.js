/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
	name: 'vc-move',
	description: 'moves a member from one vc to another',
  directory: "mod",
	ownerOnly: false,
	options: [
		{
			type: 'USER',
			description: 'User to move',
			name: 'user',
			required: true
		},
		{
			type: 'CHANNEL',
			description: 'channel to move user to',
			name: 'channel',
			required: true,
			channelTypes: ['GUILD_VOICE']
		}
	],
	userperm: ['MOVE_MEMBERS'],
	botperm: ['MOVE_MEMBERS'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		let member =
			interaction.options.getMember('user') ||
			interaction.guild.members.cache.get(args[0]) ||
			interaction.guild.members.cache.find(
				r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
			)

		if (!member)
			return interaction.editReply(
				`${bot.error} • Unable to find the mentioned user in this guild.`
			)

		let channel =
			interaction.options.getChannel('channel') ||
			bot.guilds.cache.get(interaction.guild.id).channels.cache.get(args[1]) ||
			interaction.guild.channels.cache.find(
				c =>
					c.name.toLowerCase() ===
					args
						.slice(1)
						.join(' ')
						.toLocaleLowerCase()
			)
		if (!channel.type === 'GUILD_VOICE')
			return interaction.editReply(
				'Unable to locate the voice channel. Make sure to mention a voice channel not a text channel!'
			)

		try {
			await member.setChannel(channel)
			interaction.editReply(
				`${bot.tick} • Moved ${member.user.username} to <#${channel.id}> !`
			)
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
