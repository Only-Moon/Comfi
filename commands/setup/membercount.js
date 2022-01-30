const {
	CommandInteraction,
	MessageEmbed,
	MessageCollector
} = require('discord.js')
const guilds = require('../../models/guild')

module.exports = {
	name: 'membercount',
	description: 'Setup the member counting system',
  directory: "setting",
	ownerOnly: false,
	botperm: ['MANAGE_GUILD'],
	userperm: ['ADMINISTRATOR'],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		const step1 = new MessageEmbed()
			.setTitle(`Membercount system! [1]`, bot.user.displayAvatarURL())
			.setDescription(
				`Would you like to enable or disabled the feature? Types: \`disable\`,\`enable\``
			)
			.setColor(bot.color)
			.setFooter(`You can say "cancel" at any time to cancel the process`)

		const step2 = new MessageEmbed()
			.setTitle(`Membercount system! [2]`, bot.user.displayAvatarURL())
			.setDescription(`Mention a channel or type \`new\` to make a new channel`)

		const step3 = new MessageEmbed()
			.setTitle(`Membercount system! [2]`, bot.user.displayAvatarURL())
			.setDescription(
				`What type of channel should the member counter channel be? (Types: \`text\`,\`voice\`)`
			)

		const step4 = new MessageEmbed()
			.setTitle(`Membercount system! [3]`, bot.user.displayAvatarURL())
			.setDescription(
				`What name of member counter channel be? (For eg: \`Members: \`\`00\`)`
			)
			.setColor(bot.color)
			.setFooter(`You can say "cancel" at any time to cancel the process`)

		let steps = [step1, step2, step3, step4]
		let counter = 0
		await interaction.deleteReply().catch(() => null)
		let hoisterMessage = await interaction.channel.send({
			embeds: [steps[counter]]
		})
		const finalData = {
			value: undefined,
			channel: undefined,
			channel_type: undefined,
			channel_name: undefined
		}
		const collector = new MessageCollector(interaction.channel)

		collector.on('collect', async msg => {
			if (msg.author.id !== interaction.user.id) return
			if (msg.content.toLowerCase() === 'cancel') {
				collector.stop('0')
				hoisterMessage.delete().catch(() => {})
			}

			switch (counter) {
				case 0:
					if (!['enable', 'disable'].includes(msg.content.toLowerCase())) {
						collector.stop('1')
						hoisterMessage.delete().catch(() => {})
					}

					if (msg.content.toLowerCase() === 'disable') {
						collector.stop('4')
						hoisterMessage.delete().catch(() => {})
					}

					let val = false
					if (msg.content.toLowerCase() === 'enable') {
						val = true
					} else {
						val = false
					}

					finalData['value'] = val
					msg.delete().catch(() => {})
					counter++
					hoisterMessage.edit({ embeds: [steps[counter]] }).catch(() => {})
					break
				case 1:
					let channel =
						msg.mentions.channels.first() ||
						interaction.guild.channels.cache.find(
							c =>
								c.id === msg.content ||
								c.name.toLowerCase() === msg.content.toLowerCase()
						)
					if (channel) {
						msg.delete().catch(() => {})
						finalData['channel'] = channel.id
						finalData['channel_type'] = channel.type
						finalData['channel_name'] = channel.name

      channel.setName(`${channel.name}${interaction.guild.members.cache.filter(member => !member.user.bot).size}`).catch(() => null)
						hoisterMessage.delete().catch(() => {})
						collector.stop('2')
					} else if (msg.content.toLowerCase() === 'new') {
						counter++
						hoisterMessage.edit({ embeds: [steps[counter]] }).catch(() => {})
					}
					break
				case 2:
					if (!['text', 'voice'].includes(msg.content.toLowerCase())) {
						collector.stop('1')
						hoisterMessage.delete().catch(() => {})
					}
					let type
					if (msg.content.toLowerCase() === 'text') {
						type = 'GUILD_TEXT'
					}
					if (msg.content.toLowerCase() === 'voice') {
						type = 'GUILD_VOICE'
					}
					const channel2 = await interaction.guild.channels.create(
						`Members: ${interaction.guild.memberCount}`,
						{
							type: type
						}
					).catch(() => null)
					if (channel2.type === 'GUILD_VOICE') {
						interaction.guild.roles.cache.forEach(r => {
							channel2.permissionOverwrites.create(r.id, {
								CONNECT: false
							})
						})
					}
					msg.delete().catch(() => {})
					finalData['channel'] = channel2.id
					finalData['channel_type'] = type

					hoisterMessage.delete().catch(() => {})
					collector.stop('2')
					break
				case 2:
					finalData['channel_name'] = msg.content
					msg.delete().catch(() => {})
					hoisterMessage.delete().catch(() => {})
					collector.stop('2')
					break
			}
		})

		collector.on('end', async (collected, reason) => {
			if (reason === '0') {
				return interaction.channel.send({
					content: `${bot.crosss} • Process has been stopped!`
				})
			}
			if (reason === '1') {
				return interaction.channel.send({
					content: `${
						bot.error
					} • There was an error with your anwser, please make sure to follow the steps!`
				})
			}
			if (reason === '4') {
				await guilds.findOneAndUpdate(
					{ guildId: interaction.guild.id },
					{
						member_counter: false
					}
				)
				return interaction.channel.send({
					content: `${bot.tick} • Counting have now been disabled!`
				})
			}
			if (reason === '2') {
				await guilds.findOneAndUpdate(
					{ guildId: interaction.guild.id },
					{
						member_counter: true,
						member_counter_channel: finalData.channel,
						member_counter_channel_type: finalData.channel_type,
						member_counter_channel_name: finalData.channel_name
					}
				)
				return interaction.channel.send({
					embeds: [new MessageEmbed().setTitle(`${
						bot.tick
					} • Counting data has now been setup!`).setDescription(`**The channel updates every 10 minutes** \n(Don't worry Channel Name will Update with the name you specified 
very soon)`).setColor(bot.color)]
				})
			}
		})
	}
}
