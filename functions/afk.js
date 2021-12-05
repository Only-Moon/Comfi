const bot = require('../index')
const users = require(`../models/users`)
const { MessageEmbed, Message } = require('discord.js')
/**
 *
 * @param {Message} message
 */

module.exports = async message => {
	if (message.author.bot) return
	const member = message.mentions.members.first() || message.member
	if (member) {
		const user = await users.findOne({ userId: member.id })
		if (user) {
			if (user.afk) {
				if (message.author.id === member.id) {
					await users.findOneAndUpdate(
						{ userId: member.id },
						{
							afk: false,
							afk_reason: 'None',
							afk_set: Date.now()
						}
					)

					if (message.member.manageable) {
						message.member.setNickname('').catch(() => null)
					}

					let embed = new MessageEmbed()
						.setTitle(`Afk Removed`)
						.setDescription(
							`Welcome back ${message.author.tag} \nGreat to see you!!`
						)
						.setColor(bot.color)

					return message
						.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
						.then(msg => {
							setTimeout(() => {
								if (!msg.deleted) msg.delete()
							}, bot.ms('30s'))
						})
				} else {
					message.delete().catch(() => null)

					let afk = new MessageEmbed()
						.setTitle(`**User Afk**`)
						.setDescription(
							`${
								message.mentions.members.first().user.tag
							} **is now afk** \nReason: **${
								user.afk_reason
							}** \nDuration: **<t:${Math.floor(user.afk_set / 1000)}:R>**`
						)
						.setColor(bot.color)

					return message.channel
						.send({ embeds: [afk], allowedMentions: { repliedUser: false } })
						.then(msg => {
							setTimeout(() => {
								if (!msg.deleted) msg.delete()
							}, bot.ms('30s'))
						})
				}
			}
		}
	}
}
