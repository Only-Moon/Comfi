const bot = require('../../index')
const { readdirSync } = require('fs')
const prefix = '/'
const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
	MessageSelectMenuMenu
} = require('discord.js')
const data = require("../../models/Client")

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

bot.on('interactionCreate', async interaction => {
	if (interaction.isSelectMenu()) {
		if (interaction.customId === 'help-menus') {
			let { values } = interaction
			let value = values[0]
			let catts = []
			let cots = []
			readdirSync('./commands/').forEach(dir => {
				if (dir.toLowerCase() !== value.toLowerCase()) return
				const commands = readdirSync(`./commands/${dir}/`).filter(file =>
					file.endsWith('.js')
				)
				const cmds = commands.map(command => {
					let file = require(`../../commands/${dir}/${command}`)

					if (!file.name) return 'No command name.'
					let name = file.name.replace('.js', '')
					if (bot.slashCommands.get(name).hidden) return

					let des = bot.slashCommands.get(name).description
					let emo = bot.slashCommands.get(name).emoji
					let emoe = emo ? `${emo} - ` : ''

					let obj = {
						cname: `${emoe}\`${name}\``,
						des
					}

					return obj
				})

				let dota = new Object()
				cmds.map(co => {
					if (co == undefined) return
					dota = {
						name: `${cmds.length === 0 ? 'In progress.' : co.cname}`,
						value: co.des ? co.des : 'No Description',
						inline: true
					}

					catts.push(dota)
				})

				cots.push(dir.toLowerCase())
			})

			if (cots.includes(value.toLowerCase())) {
				const combed = new MessageEmbed()
					.setTitle(
						`__${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`
					)
					.setDescription(
						`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`
					)
					.addFields(catts)
					.setFooter({
						name: `Comfi™ Help`,
						iconURL: interaction.user.avatarURL({
							dynamic: true
						})
})
					.setTimestamp()
					.setThumbnail(
						bot.user.displayAvatarURL({
							dynamic: true
						})
					)
					.setColor(bot.color)

				await interaction.deferUpdate()

				return interaction.message
					.edit({
						embeds: [combed]
					})
					.catch(e => {
						bot.sendhook(`Error Occured \n ${e.stack}`),
							{
								channel: bot.err_chnl
							}
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
					})
			}
		}

		if (interaction.customId === 'b-panel') {
			await interaction.deferReply({ ephemeral: true })
			const memberId = interaction.values[0]
			const member = interaction.guild.members.cache.get(memberId)

			const options = data.BlackListedUser.map(b => {
				const members = interaction.guild.members.cache.get(b)

				return {
					label: members.user.username,
					value: members.user.id,
					description: 'No description'
				}
			})

			const components = [
				new MessageActionRow().addComponents(
					new MessageSelectMenu()
						.setCustomId('b-panel')
						.setMaxValues(1)
						.addOptions(options)
				)
			]

			const button = new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId('yes')
					.setLabel('Yes')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId('no')
					.setLabel('No')
					.setStyle('DANGER')
			)

			if (data?.BlackListedUser?.includes(member.id)) {
				const filter = i => {
					i.deferUpdate()
					return i.user.id === interaction.user.id
				}
				await interaction
					.followUp({
						content:
							'Do you want to remove this member from the Blacklist database ?',
						components: [button],
						ephemeral: true
					})
					.then(async i => {
						const collector = i.channel.createMessageComponentCollector({
							filter,
							componentType: 'BUTTON',
							time: 10000
						})

						collector.on('collect', async i => {
							if (i.customId === 'yes') {
								const index = data.BlackListedUser.indexOf(member.id)

								if (index > -1) {
									data.BlackListedUser.splice(index, 1)
								}
								await data.save()
								interaction.followUp({
									content:
										'Successfully removed member from the Blacklist database.',
									components,
									ephemeral: true
								})
							} else {
								interaction.followUp({
									content:
										'Cancelled removed member from the Blacklist database.',
									components,
									ephemeral: true
								})
							}
						})

						collector.on('end', async collected => {
							await interaction.followUp({
								content:
									'Looks like you didnt select the options to remove member from the Blacklist database.',
								components,
								ephemeral: true
							})
						})
					})
			} else return
		}
	}
})
