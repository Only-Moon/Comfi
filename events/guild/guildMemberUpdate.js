const bot = require('../../index')
const { MessageEmbed } = require('discord.js')
const guilds = require('../../models/guild')

bot.on('guildMemberUpdate', async (oldMember, newMember) => {
	const oldStatus = oldMember?.premiumSince
	const newStatus = newMember?.premiumSince
	const guild = oldMember.guild

	if (!guild) return

	const guilD = await guilds.findOne({
		guildId: guild.id
	})

	function format(msg) {
		let text = msg

		const terms = [
			{ name: '{{user#mention}}', value: `<@${newMember.id}>` },
			{ name: '{{user}}', value: `${newMember.user.tag}` },
			{ name: '{{server}}', value: `${guild.name}` },
			{ name: '{{boostcount}}', value: `${guild.premiumSubscriptionCount}` }
		]

		for (let { name, value } of terms)
			text = text.replace(new RegExp(name, 'igm'), value)

		return text
	}

	if (guilD.boost) {
		if (!oldStatus && newStatus) {
			const boostChannel = guild.channels.cache.get(guilD.boost_channel)
			if (!boostChannel) return

			const boostMessage = guilD.boost_message

			let boost = new MessageEmbed()
				.setTitle(`${guild.name} Got Boosted`)
				.setDescription(format(guilD.boost_message))
				.setImage(guilD.boost_image)
				.setColor(bot.color)
				.setThumbnail(guild.iconURL({ dynamic: true }))

			if (guilD.boost_embed) {
				boostChannel.send({ embeds: [boost] })
			} else {
				boostChannel.send({ content: format(guilD.boost_message) })
			}
		}
	} else {
		return
	}
	if (oldStatus && !newStatus) return
})
