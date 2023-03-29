/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const {
	CommandInteraction,
 EmbedBuilder,
	MessageCollector
} = require('discord.js')
const guilds = require('../../models/guild')

module.exports = {
	name: 'verification',
	description: 'Setup server verification system',
  directory: "setting",
	ownerOnly: false,
	botperm: ['ManageGuild'],
	userperm: ['ManageGuild'],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		const step1 = new EmbedBuilder()
			.setTitle(`Verfication [1]`, bot.user.displayAvatarURL())
			.setDescription(
				`Would you like to enable or disabled the feature? Types: \`disable\`,\`enable\``
			)
			.setColor(bot.color)
			.setFooter({text:`You can say "cancel" at any time to cancel the process`})

		const step2 = new EmbedBuilder()
			.setTitle(`Verification [2]`, bot.user.displayAvatarURL())
			.setDescription(`What should the verification channel be?`)
			.setColor(bot.color)
			.setFooter({text:`You can say "cancel" at any time to cancel the process`})

		const step3 = new EmbedBuilder()
			.setTitle(`Verification [3]`, bot.user.displayAvatarURL())
			.setDescription(`What is the verified role?`)
			.setColor(bot.color)
			.setFooter({text:`You can say "cancel" at any time to cancel the process`})

		const step4 = new EmbedBuilder()
			.setTitle(`Verification [4]`, bot.user.displayAvatarURL())
			.setDescription(
				`What should the verfication message be?\n\`\`\`{{user#mention}} - the users id\n{{user#tag}} - the users tag\n{{user#id}} - the users id\n{{server#id}} - the server id\n{{server#name}} - the server name\n{{server#membercount}} - the server membercount\n\`\`\``
			)
			.setColor(bot.color)
			.setFooter({text:`You can say "cancel" at any time to cancel the process`})

		let steps = [step1, step2, step3, step4]
		let counter = 0
		await interaction.deleteReply().catch(() => null)
		let hoisterinteraction = await interaction.channel.send({
			embeds: [steps[counter]]
		})
		const finalData = {
			value: undefined,
			channel: undefined,
			interaction: undefined,
			role: undefined
		}
		const collector = new MessageCollector(interaction.channel)

		collector.on('collect', msg => {
			if (msg.author.id !== interaction.user.id) return
			if (msg.content.toLowerCase() === 'cancel') {
				collector.stop('0')
				hoisterinteraction.delete().catch(() => {})
			}

			switch (counter) {
				case 0:
					if (!['enable', 'disable'].includes(msg.content.toLowerCase())) {
						collector.stop('1')
						hoisterinteraction?.delete().catch(() => {})
					}

					if (msg.content.toLowerCase() === 'disable') {
						collector.stop('4')
						hoisterinteraction.delete().catch(() => {})
						return
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
					hoisterinteraction.edit({ embeds: [steps[counter]] }).catch(() => {})
					break
				case 1:
					let channel =
						msg.mentions.channels.first() ||
						interaction.guild.channels.cache.find(
							c =>
								c.id === msg.content ||
								c.name.toLowerCase() === msg.content.toLowerCase()
						)

					if (!channel) {
						collector.stop('1')
						hoisterinteraction.delete().catch(() => {})
						return
					}
					msg.delete().catch(() => {})
					finalData['channel'] = channel.id
					counter++
					hoisterinteraction.edit({ embeds: [steps[counter]] }).catch(() => {})
					break
				case 2:
					let role =
						msg.mentions.roles.first() ||
						interaction.guild.roles.cache.find(
							c =>
								c.id === msg.content ||
								c.name.toLowerCase() === msg.content.toLowerCase()
						)

					if (!role) {
						collector.stop('1')
						hoisterinteraction.delete().catch(() => {})
						return
					}
					msg.delete().catch(() => {})
					finalData['role'] = role.id
					counter++
					hoisterinteraction.edit({ embeds: [steps[counter]] }).catch(() => {})
					break
				case 3:
					if (msg.content.lengt >= '4096') {
						collector.stop('3')
						hoisterMessage.delete().catch(() => {})
						return
					}

					finalData['message'] = msg.content
						.split('')
						.slice(0, 4096)
						.join('')
					msg.delete().catch(() => {})
					hoisterinteraction.delete().catch(() => {})
					collector.stop('2')
					break
			}
		})

		collector.on('end', async (collected, reason) => {
			if (reason === '0') {
        return await  bot.errorEmbed(bot, interaction, `Process has been stopped!`
				)
			}
			if (reason === '1') {
        return await  bot.errorEmbed(bot, interaction, `There was an error with your anwser, please make sure to follow the steps!`
				)
			}
			if (reason === '3') {
        return await  bot.errorEmbed(bot, interaction, ` Verification Message  should not contain more than 1024 characters`
				)
			}
			if (reason === '4') {
				await guilds.findOneAndUpdate(
					{ guildId: interaction.guild.id },
					{
						verification: false
					}
				)
        return await bot.successEmbed(bot, interaction, `Verification have now been disabled!`
				)
			}
			if (reason === '2') {
				await guilds.findOneAndUpdate(
					{ guildId: interaction.guild.id },
					{
						verification: true,
						verification_channel: finalData.channel,
						verification_message: finalData.message,
						verification_role: finalData.role
					}
				)
        return await bot.successEmbed(bot, interaction, `Verification data has now been setup!`
				)
			}
		})
	}
}