const simplydjs = require('simply-djs');
const { EmbedBuilder, ButtonStyle } = require('discord.js');
const bot = require('../../index');
const guilds = require('../../models/guild');

/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

/**
 * Handles interactions from Discord.
 *
 * - Manages button roles using simply-djs.
 * - Manages suggestions using simply-djs.
 * - Manages giveaways using simply-djs.
 * - Manages tickets using simply-djs.
 *   - Creates ticket channel.
 *   - Sends ticket creation log to modlog channel.
 *   - Deletes ticket channel and logs deletion.
 */
bot.on('interactionCreate', async (interaction, args) => {
	if (interaction.isButton()) {
		// Better Button Role
		simplydjs.manageBtnRole(interaction, {
			strict: true,
			reply: {
				add: `${bot.tick} Added the {role} role to you`,
				remove: `${bot.cross} Removed the {role} role from you`
			}
		})

		// Suggestions
		simplydjs.manageSuggest(interaction, {
			deny: { color: bot.color },
			accept: { color: bot.color }
		})

		// Giveaway
		simplydjs.manageGiveaway(interaction)

		// Ticket
		const guild = await guilds.findOne({ guildId: interaction.guild.id })
		if (guild.ticket) {
			const support = guild.ticket_role
			if (!support) return

			const cat = guild.ticket_category
			if (!cat) return

			const name = guild.ticket_name || '{username}'
			if (!name) return

			simplydjs
				.manageTicket(interaction, {
					pingRoles: support,
					category: cat,
					timed: false,
					ticketname: name,
					embed: {
						title: 'Ticket Created',
						description:
							'Staff Team will be here in a while, be patient and tell the details',
						color: bot.color,
						footer: { text: 'Comfi™ Ticket System' }
					},
					buttons: {
						close: {
							style: ButtonStyle.Secondary,
							emoji: '796196175627419678'
						},
						reopen: {
							style: ButtonStyle.Secondary,
							emoji: '855791964975530004'
						},
						delete: {
							style: ButtonStyle.Secondary,
							emoji: '796196175627419678'
						},
						transcript: {
							style: ButtonStyle.Secondary,
							emoji: '905055261021061150'
						}
					}
				})
				.then((log) => {
					const ch1 = interaction.guild.channels.cache.get(log.channelId)

					if (guild.modlog) {
						const embed = new EmbedBuilder()
							.setTitle('Ticket Deleted !')
							.setDescription(
								`Ticket just got deleted by *<@${log.user.id}>* | Tag: ***${
									log.user.tag
								}***\n\nTicket Name: \`${
									ch1.name ? ch1.name : 'NONE'
								}\` | Ticket ID: \`${
									ch1.id ? ch1.id : 'NONE'
								}\`\nTicket Channel Topic: ${ch1.topic ? ch1.topic : 'NONE'}`
							)
							.setTimestamp()
							.setColor(bot.color)
							.setFooter({ text: 'Comfi™ Mod Logs' })
						const channel = interaction.guild.channels.cache.get(
							guild.mod_channel
						)
						if (channel) channel.send({ embeds: [embed] })
						// else console.log(channel)
					}
				})
		}
	}
})
