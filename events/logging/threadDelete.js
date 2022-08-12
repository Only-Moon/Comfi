const bot = require(`../../index`)
const guilds = require(`../../models/guild`)
const { EmbedBuilder, AuditLogEvent  } = require('discord.js')

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

bot.on('threadDelete', async thread => {
	const guild = await guilds.findOne({ guildId: thread.guild.id })

	if (!thread.guild) return;

	try {
		await thread.leave().catch(() => null)
      } catch (e) {
        let emed = new EmbedBuilder()
          .setTitle(`${bot.error} • Error Occured`)
          .setDescription(`\`\`\`${e.stack}\`\`\``)
          .setColor(bot.color)

        bot.sendhook(null, {
          channel: bot.err_chnl,
          embed: emed
        })
  }

	if (!guild.logging) return;
	if (!thread.guild.me.permissions.has('VIEW_AUDIT_LOG')) return;

	const AuditLogFetch = await thread.guild.fetchAuditLogs({
		limit: 1,
		type: AuditLogEvent.ThreadDelete
	})
	const Entry = AuditLogFetch.entries.first()
	const embed = new EmbedBuilder()
		.setTitle(`Thread Deleted!`)
		.setColor(bot.color)
		.setDescription(
			`> <a:stars_aesthetic:883033007836000308> • **Author:** <@${
				Entry.executor.id
			}>`
		)
		.addFields({
			name: 'Thread',
			value: `> <a:zzzghostheart:883017884014637066> • **Name:** ${
				thread.name
			}\n > <a:zzzghostheart:883017884014637066> • **ID:** \`${thread.id}\``
		})
		.setFooter({text:'Comfi™ Logging'})
		.setTimestamp()

	const logsChannel = thread.guild.channels.cache.find(
		c => c.id === guild.logging_channel
	)
	if (logsChannel) {
		logsChannel.send({ embeds: [embed] })
	}
})
