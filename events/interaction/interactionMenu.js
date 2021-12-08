const bot = require('../../index')
const { readdirSync } = require('fs')
const prefix = '/'
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

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
					.setFooter(
						`Comfi™ Help`,
						interaction.user.avatarURL({
							dynamic: true
						})
					)
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

    
    
	}
})
