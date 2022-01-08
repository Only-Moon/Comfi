const guilds = require(`../models/guild`)
const { Message } = require('discord.js')

module.exports = async bot => {

try {
  
	bot.guilds.cache.forEach(async g => {
		setTimeout(async () => {
			const guild = await guilds.findOne({ guildId: g.id })

const mem = await g.members.cache
		if (guild?.member_counter) {
				const channel = g.channels.cache.find(
					c =>
						c.id === guild.member_counter_channel &&
						c.type === guild.member_counter_channel_type
				)
				if (!channel) return
				channel.setName(
					`${guild.member_counter_channel_name}${
						mem.filter(member => !member.user.bot).size
					}`
				)
			}
		}, 3000)
	})
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
}}
