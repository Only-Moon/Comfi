const { readdirSync } = require('fs')
const prefix = '/'
const create_mh = require('../../functions/menu_help')
const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
	name: 'helpp',
	description: 'Show all the Available bot Commands in Menu Form',
	ownerOnly: false,
	options: [
		{
			type: 'STRING',
			description: 'particular command',
			name: 'command',
			required: false
		}
	],
	userperm: [''],
	botperm: [''],

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (bot, interaction, args) => {
		try {
			let categories = []
			let cots = []
			if (!args[0]) {
				//categories to ignore

				let ignored = ['owner', 'admin']

				const emo = {
					anime: '<a:snowman_cs:883017868944502804>',
					context: "<a:milk_cs:883017898984103986>",
					emoji: '<a:apple_cs:883033005172605020>',
					fun: '<a:shootingstaw_cs:883017879065354290>',
					info: '<a:stars_cs:883033007836000308>',
					levels: '<a:bunny_cs:883033003574579260>',
					mod: '<a:pinkheart_cs:883033001599074364>',
					//music: "<a:music_cs:883032989901156422>",
					roles: '<a:cake2_cs:883017860488765460>',
					setup: '<a:starburst_cs:883017855187157003>',
					utility: '<a:ghost_cs:883017884014637066>'
				}

				let ccate = []
				readdirSync('./commands/').forEach(dir => {
					if (ignored.includes(dir.toLowerCase())) return
					const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`
					let nome = dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase()
					let cats = new Object()

					cats = {
						name: name,
						value: `\`/helpp ${dir.toLowerCase()}\``,
						inline: true
					}

					categories.push(cats)
					ccate.push(nome)
				})

				const embed = new MessageEmbed()
					.setTitle('Comfi™ Help')
					.setDescription(
						`My Prefix For __**${
							interaction.guild.name
						}**__ Is  __**${prefix}**__\n\nFor More Command Information, Type The Following Command:\n**${prefix}helpp settings or** **${prefix}helpp bann**`
					)
					.addFields(categories)
					.setFooter({
						text: `Requested by ${interaction.member.displayName}`,
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
					.setColor(bot.color);

				let menus = create_mh(ccate)
	   await interaction.editReply({
					embeds: [embed],
					components: menus.smenu
				})
			} else {
				let catts = []
				readdirSync('./commands/').forEach(dir => {
					if (dir.toLowerCase() !== args[0].toLowerCase()) return
					const commands = readdirSync(`./commands/${dir}/`).filter(file =>
						file.endsWith('.js')
					)
					const cmds = commands.map(command => {
						let file = require(`../../commands/${dir}/${command}`)
						if (!file.name) return 'No command name.'

						let name = file.name.replace('.js', '')

						if (bot.slashCommands.get(name).hidden) return;
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

				const command =
					bot.slashCommands.get(args[0].toLowerCase()) ||
					bot.slashCommands.find(
						c => c.aliases && c.aliases.includes(args[0].toLowerCase())
					)

				if (cots.includes(args[0].toLowerCase())) {
					const combed = new MessageEmbed()
						.setTitle(
							`__${args[0].charAt(0).toUpperCase() +
								args[0].slice(1)} Commands!__`
						)
						.setDescription(
							`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`
						)
						.addFields(catts)
						.setFooter({
							text: `Comfi™ Help`,
iconURL:							interaction.user.avatarURL({
								dynamic: true
							})
                       })
						.setTimestamp()
						.setThumbnail(
							bot.user.displayAvatarURL({
								dynamic: true
							})
						)
						.setColor(bot.color);

					return await interaction
						.editReply({
							embeds: [combed]
						})
						.catch(() => null)
				}

				if (!command) {
					const embed = new MessageEmbed()
						.setTitle(
							`Invalid command! Use \`${prefix}helpp\` for all of my commands!`
						)
						.setColor(bot.color)

					return await interaction
						.editReply({
							embeds: [embed]
						})
						.catch(() => null)
				}

				let subc = []

				if (command.options) {
					command.options.forEach(sub => {
						if (sub.type === 'SUB_COMMAND') {
							subc.push(`- **${sub.name}** \n \`${sub.description}\`\n`)
						}
					})
				}

				if (subc.length < 1 || subc === []) {
					subc = ''
				} else if (subc.length > 1) {
					subc = `${subc.toString().replaceAll(',', '')}\n`
				}

				const embed = new MessageEmbed()
					.setTitle('Command Details:')
					.addField(
						'Command:',
						command.name ? `\`${command.name}\`` : 'No name for this command.'
					)
					.addField(
						'Sub Commands:',
						subc ? subc : 'No Sub Command for this command'
					)
					.addField(
						'Usage:',
						command.usage
							? `\`${prefix}${command.name} ${command.usage}\``
							: `\`${prefix}${command.name}\``
					)
					.addField(
						'Command Description:',
						command.description
							? command.description
							: 'No description for this command.'
					)

					.setFooter({
						text: `Comfi™ Help`,
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

				return await interaction
					.editReply({
						embeds: [embed]
					})
					.catch(e => {
						let emed = new MessageEmbed()
							.setTitle(`${bot.error} • Error Occured`)
							.setDescription(`\`\`\`${e.stack}\`\`\``)
							.setColor(bot.color)

						bot.sendhook(null, {
							channel: bot.err_chnl,
							embed: emed
						})
					})
			}
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
		}
	}
}
