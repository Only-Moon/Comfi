const bot = require(`../../index`)
const guilds = require(`../../models/guild`)
const { MessageEmbed } = require('discord.js')

bot.on('threadCreate', async thread => {
	const guild = await guilds.findOne({ guildId: thread.guild.id })

	if (!thread.guild) return;

	try {
		if (thread.joinable && !thread.joined) {
			await thread.join().catch(() => null)
		}
	} catch (e) {
		bot.sendhook(`Error Occured \n ${e.stack}`,
			{
				channel: bot.err_chnl
			})
	}

	if (!guild.logging) return;
	if (!thread.guild.me.permissions.has('VIEW_AUDIT_LOG')) return

	const AuditLogFetch = await thread.guild.fetchAuditLogs({
		limit: 1,
		type: 'THREAD_CREATE'
	})
	const Entry = AuditLogFetch.entries.first()
	const embed = new MessageEmbed()
		.setTitle(`Thread Created!`)
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
			}\n > <a:zzzghostheart:883017884014637066> • **ID:** \`${
				thread.id
			}\`\n > <a:zzzghostheart:883017884014637066> • **Mention:** <#${
				thread.id
			}>`
		})
		.setFooter('Comfi™ Logging')
		.setTimestamp()

	const logsChannel = thread.guild.channels.cache.find(
		c => c.id === guild.logging_channel
	)
	if (logsChannel) {
		logsChannel.send({ embeds: [embed] })
	}
})
