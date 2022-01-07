const {
	CommandInteraction,
	MessageEmbed,
	MessageButton,
	MessageActionRow
} = require('discord.js')
const axios = require('axios')
const { version } = require('../../package.json')
const ms = require('pretty-ms')
const { version: discordjsVersion } = require('discord.js')
const moment = require('moment')

module.exports = {
	name: 'infoo',
	description: 'Information Commands',
	ownerOnly: false,
	cooldown: 10,
	options: [
		{
			name: 'banner',
			description: 'Get the banner of the specified member',
			type: 'SUB_COMMAND',
			options: [
				{
					name: 'member',
					description: 'Input member to get banner',
					type: 'USER',
					required: true
				}
			]
		},
		{
			type: 'SUB_COMMAND',
			description: `Check\'s bot\'s status`,
			name: 'bot'
		},
		{
			type: 'SUB_COMMAND',
			description: 'Information about the channel',
			name: 'channel',
			options: [
				{
					type: 'CHANNEL',
					description: 'Channel to get info about',
					name: 'name',
					required: false
				}
			]
		},
		{
			name: 'sticker',
			type: 'SUB_COMMAND',
			description: 'Information about the sticker',
			options: [
				{
					name: 'url',
					type: 'STRING',
					description: 'url of the sticker',
					required: true
				}
			]
		},
		{
			type: 'SUB_COMMAND',
			description: 'Information about server membercount',
			name: 'membercount'
		},
		{
			type: 'SUB_COMMAND',
			description: 'Information about the bot privacy policy',
			name: 'privacy'
		},
		{
			type: 'SUB_COMMAND',
			description: 'Information about the role',
			name: 'role',
			options: [
				{
					name: 'role',
					description: 'The role you want information about',
					type: 'ROLE',
					required: true
				}
			]
		},
		{
			type: 'SUB_COMMAND',
			description: 'Information about the server',
			name: 'server'
		},
		{
			type: 'SUB_COMMAND',
			description: 'Information about the user',
			name: 'user',
			options: [
				{
					type: 'USER',
					name: 'user',
					description:
						"The specified user you'd like to retrieve information for.",
					required: false
				}
			]
		},
		{
			type: 'SUB_COMMAND',
			description: 'Information about the bot uptime',
			name: 'uptime'
		}
	],
	userperm: [''],
	botperm: ['SEND_MESSAGES'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		const [subcommand] = args

		try {
			if (subcommand === 'banner') {
				const { user } = interaction.options.get('member')
				const api = process.env.TOKEN
				axios
					.get(`https://discord.com/api/users/${user.id}`, {
						headers: {
							Authorization: `Bot ${api}`
						}
					})
					.then(async (res) => {
						const { banner, accent_color } = res.data

						if (banner) {
							const extension = banner.startsWith('a_') ? '.gif' : '.png'
							const url = `https://cdn.discordapp.com/banners/${
								user.id
							}/${banner}${extension}?size=2048`

							const embed = new MessageEmbed()
								.setTitle(`${user.tag}'s Banner`)
								.setImage(`${url}`)
								.setColor(accent_color || bot.color)

							await interaction.followUp({ embeds: [embed] })
						} else {
							if (accent_color) {
								const embed = new MessageEmbed()
									.setDescription(
										`**${
											user.tag
										}** does not have a banner but they have an accent color`
									)
									.setColor(accent_color)

								await interaction.followUp({ embeds: [embed] })
							} else {
							await	interaction.followUp({
									content: `**${
										user.tag
									}** does not have a banner, they have an accent color.`
								})
							}
						}
					})
			}

			if (subcommand === 'bot') {
				let embed = new MessageEmbed()
					.setColor(bot.color)
					.setAuthor({
						name: `${bot.user.username}™ v${version}`,
						iconURL: bot.user.displayAvatarURL({ dynamic: true })
                     })
					.setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
					.addField('❯ Uptime :', `${(await bot.msToTime(bot.uptime))}`, true)
					.addField('❯ WS Ping:', `${bot.ws.ping}ms`, true)
					.addField(
						'❯ Memory:',
						`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(
							process.memoryUsage().heapUsed /
							1024 /
							1024
						).toFixed(2)} MB Heap`,
						true
					)
					.addField('❯ Guild Count:', `${bot.guilds.cache.size} guilds`, true)
					.addField(
						`❯ User Count:`,
						`${bot.guilds.cache.reduce(
							(users, value) => users + value.memberCount,
							0
						)} users`,
						true
					)
					.addField(
						'❯ Slash Commands:',
						`${bot.slashCommands.size} Commands`,
						true
					)
					.addField(
						'❯ Node:',
						`${process.version} on ${process.platform} ${process.arch}`,
						true
					)
					.addField('❯ Discord.js:', `v${discordjsVersion}`, true)
					.addField(
						'❯ Made by:',
						`Github • [Xx-Mohit-xX](https://github.com/Xx-Mohit-xX) \nDiscord • [꒰⚘݄꒱₊_❝ moonbow  ᵕ̈ 🌸#5817](https://discord.com/users/753974636508741673)`,
						true
					) //\n [Vlad44](https://github.com/xVlad44), [xxDeveloper](https://github.com/Murtatrxx) (Web)', true)
					.setFooter({ text: `Requested By ${interaction.member.displayName}`})
					.setTimestamp()

				interaction.followUp({ embeds: [embed] })
			}

			if (subcommand === 'channel') {
				let ch = interaction.options.getChannel('name')

				let channel = ch || interaction.channel
				if (!channel) return interaction.editReply(`${bot.error} • **Channel Not Found!**`)
  const rte = secondsToHms(channel.rateLimitPerUser)

				let embed = new MessageEmbed()
					.setTitle(`Channel Information for **${channel.name}**`)
					.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
					.addField('**Name**', ` \`\`\`\ ${channel.name} \`\`\`\ `, true)
					.addField('**Parent**', ` \`\`\`\ ${channel.parent.name} \`\`\`\ `, true)
					.addField('**NSFW**', ` \`\`\`\ ${channel.nsfw} \`\`\`\ `, true)
					.addField('**Channel ID**', ` \`\`\`\ ${channel.id} \`\`\`\ `)
					.addField('**Channel Type**', ` \`\`\`\ ${channel.type} \`\`\`\ `)
					.addField(
						'**Channel Threads**',
						` \`\`\`\ ${channel.threads ? channel.threads.cache.size.toString() : 'No Threads'} \`\`\`\ `
		)					
					.addField('**Slowmode**', ` \`\`\`\ ${rte} \`\`\`\ `, true)
					.addField(
						'**Channel Description**',
						` \`\`\`\ ${channel.topic || 'No Description'} \`\`\`\ `
					)
					.addField(
						'**Channel Created At**',
						` \`\`\`\ ${channel.createdAt} \`\`\`\ `
					)
					.setColor(bot.color)
				await interaction.editReply({ embeds: [embed] })
			}

			if (subcommand === 'membercount') {
        const member = await interaction.guild.members.fetch()
				const embed = new MessageEmbed()
					.setTitle(`${interaction.guild.name} • Member Count`)

					.setColor(bot.color)				
          .setThumbnail(
  interaction.guild.iconURL()
)
					.setDescription(
						`<a:stars_aesthetic:883033007836000308> Bot Count: ${member.filter(a => a.user.bot).size		}\n<a:stars_aesthetic:883033007836000308> Human Count: ${member.filter(a => !a.user.bot).size.toString()} \n<a:stars_aesthetic:883033007836000308> Total Member Count: ${interaction.guild.memberCount}`
					);

			await	interaction.followUp({ embeds: [embed] })
			}

			if (subcommand === 'sticker') {
				const sticker = interaction.options.getString('url')
				if (!sticker)
					return interacticon.editReply({
						content: `${bot.error} • **Please specify a sticker!**`
					})

				let stickerID = sticker.id
				let stickeName = sticker.name
				// let uploader = sticker.fetchUser();

				let embed = new MessageEmbed()
					.setAuthor(
						`Sticker Info`,
						interaction.user.displayAvatarURL({ dynamic: true })
					)
					.setThumbnail(`${sticker.url}`, { dynamic: true })
					.setColor(bot.color)
					.setFooter({ text:`Checker: ${interaction.user.tag}`})
					.setTimestamp()
					.addFields(
						{
							name: '__Name:__',
							value: `\`\`\`\n${stickeName}\n\`\`\``,
							inline: true
						},
						{
							name: '__ID:__',
							value: `\`\`\`\n${stickerID}\n\`\`\``,
							inline: true
						},
						{
							name: '__Created At:__',
							value: `\`\`\`\n${sticker.createdAt}\n\`\`\``,
							inline: false
						},
						{
							name: '__URL:__',
							value: `[Click Here](${sticker.url})`,
							inline: true
						},
						{
							name: '__Format:__',
							value: `\`\`\`\n${sticker.format}\n\`\`\``,
							inline: true
						}
					)
				await interaction.editReply({ embeds: [embed] })
			}

			if (subcommand === 'role') {
				const role =
					interaction.options.getRole('role') ||
					interaction.guild.roles.cache.get(args[0])

				let ishoist = role.hoist
				if (ishoist === true) ishoist = 'Yes'
				if (ishoist === false) ishoist = 'No'
				let hex = role.hexColor
					.split('')
					.slice(1)
					.join('')

				const embed = new MessageEmbed()
					.setColor(role.color)
					.setThumbnail(`https://singlecolorimage.com/get/${hex}/400x400`)
					.addFields(
						{
							name: 'Mention & ID',
							value: `${role}\n》 \`${role.id}\``
						},
						{
							name: 'Name',
							value: role.name,
							inline: true
						},
						{
							name: 'Color',
							value: `${role.hexColor}`,
							inline: true
						},
						{
							name: 'Position',
							value: `${role.position}`
						},
						{
							name: `Hoisted`,
							value: `${ishoist}`,
							inline: true
						},
						{
							name: 'Mentionable',
							value: `${role.mentionable}`,
							inline: true
						}
					)
				return await interaction.editReply({ embeds: [embed] })
			}

			if (subcommand === 'server') {
				const vanityCode = interaction.guild.vanityURLCode
        const members = await interaction.guild.members.fetch()
				let vanityInvite = `https://discord.gg/${vanityCode}`
				if (vanityCode === null) vanityInvite = 'No custom URL'
				const roles = interaction.guild.roles.cache
					.filter(r => r.id !== interaction.guild.id)
					.map(role => role.toString())
				const embed = new MessageEmbed()
					.setTimestamp()
					.setTitle('**Server Information**')
					.setColor(bot.color)
					.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
					.addField(
						`<a:wing:883032991293653062> Name of server:`,
						interaction.guild.name,
						true
					)
					.addField(
						`<a:emoji_87:883033003574579260> ID of server`,
						interaction.guild.id,
						true
					)
					.addField(
						'<a:778519044226809868:883017858446135307> Owner ID:',
						`${(await interaction.guild.fetchOwner()).id}`,
						true
					)
					.addField(
						`<a:owner:890114196308631602> Owner Name:`,
						`${(await interaction.guild.fetchOwner()).user}`,
						true
					)
					.addField(
						`<:768584793691783179:883017859444379648> No. of Members`,
						members
            .filter(member => !member.user.bot)
            .size.toString(),
						true
					)
					.addField(
						`<a:776973591891017749:883017868944502804> No. of Bots:`,
						members.cache
							.filter(member => member.user.bot)
							.size.toString(),
						true
					)
					.addField(
						`<:zz_heart_retsu_f2u:883032970468933633> Non - Animated Emojis:`,
						interaction.guild.emojis.cache
            .filter(emoji => !emoji.animated)
            .size.toString(),
						true
					)
					.addField(
						`<a:zzzghostheart:883017884014637066> Animated Emoji\'s:`,
						interaction.guild.emojis.cache
							.filter(emoji => emoji.animated)
							.size.toString(),
						true
					)
					.addField(
						`<:textchannel:890106455284392026> # of Text Channel\'s:`,
						interaction.guild.channels.cache
							.filter(channel => channel.isText())
							.size.toString(),
						true
					)
					.addField(
						`<:thread:890106257350983730> # of Thread\'s:`,
						interaction.guild.channels.cache
							.filter(channel => channel.isThread())
							.size.toString(),
						true
					)
					.addField(
						`<:voice:890106643449274398> # of Voice Channel\'s:`,
						interaction.guild.channels.cache
							.filter(channel => channel.isVoice())
							.size.toString(),
						true
					)
					.addField(
						`<:Role:890114731149508618> Total Amount of Roles:`,
						interaction.guild.roles.cache.size.toString(),
						true
					)
					.addField(
						`<a:839921866738106390:883017898984103986> Created at`,
						`${moment(interaction.guild.createdTimestamp).format(
							'LLL'
						)} | \`${moment(interaction.guild.createdTimestamp).fromNow()}\``,
						true
					)
					.addField(
						`<a:link:888754659639042068> Vanity Link`,
						`${vanityInvite}`,
						true
					)
					.addField(
						`<a:boost:888752346501382144> Boost Level`,
						interaction.guild.premiumTier.toString(),
						true
					)
					.addField(
						`<:booster_bun_HE:815802504829730827> Total Boosts`,
						interaction.guild.premiumSubscriptionCount.toString(),
						true
					)
					.addField(
						`<a:754784872265941032:883033006145691678> Verification Level`,
						interaction.guild.verificationLevel.toString(),
						true
					)
					.addField(
						`<a:amt_shootingstaws:883017879065354290> Roles [${roles.length}]`,
						roles.length < 15
							? roles.join(' | ')
							: roles.length > 15
								? `${roles.slice(0, 15).join(' | ')} | \`+ ${roles.length -
										15} roles...\``
								: 'None'
					)
					.setAuthor({name: `${interaction.guild.name}`})
				await interaction.editReply({ embeds: [embed] })
			}

			if (subcommand === 'privacy') {
				const embed = new MessageEmbed()
					.setTitle("Comfi Bot's Privacy Policy")
					.setDescription(
						" We do not store any data apart from the Commands Database and if the User Contact us from anywhere his data will be cleared, we do not store any type of personal data. We Follow all [Discord's Terms of Service](https://discord.com/terms) and [Community Guidelines](https://discord.com/guidelines)."
					)
					.setColor(bot.color)

				const row = new MessageActionRow().addComponents(
					new MessageButton()
						.setStyle('LINK')
						.setURL('https://comfibot.tk/privacy')
						.setLabel('Read More!')
				)

				await interaction.editReply({ embeds: [embed], components: [row] })
			}

			if (subcommand === 'user') {
				let user = interaction.options.getUser('user', false)
				if (!user) user = interaction.user

				let member = await interaction.guild.members
					.fetch(user.id)
					.catch(() => {})

				let roles, members, position
				if (member) {
					roles = member.roles.cache
						.sort((a, b) => b.position - a.position)
						.map(role => role.toString())
						.slice(0, -1)

					members = (await interaction.guild.members.fetch({
						time: 9999999,
						withPresences: true
					}))
						.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
						.map(m => m)

					position = new Promise(ful => {
						for (let i = 1; i < members.length + 1; i++) {
							// @ts-ignore
							if (members[i - 1].id === member.id) ful(i)
						}
					})
				}

				let png = avatar(user, 'png')
				let webp = avatar(user, 'webp')
				let jpg = avatar(user, 'jpg')
				// @ts-ignore
				let gif = avatar(user, 'gif')

				let format = user
					.displayAvatarURL({ dynamic: true })
					.substr(user.displayAvatarURL({ dynamic: true }).length - 3)

				let embed = new MessageEmbed()
					.setAuthor({name: user.tag, iconURL:  user.displayAvatarURL({ dynamic: true })})
					.setThumbnail(user.avatarURL({ dynamic: true }))
					.setDescription(
						`**[${user.username}](https://discord.com/users/${
							user.id
						})** created their account on ${moment(
							user.createdTimestamp
						).format('Do MMM YYYY')}.`
					)
					.addField(
						'User information',
						`**ID:** ${user.id}\n**Username:** ${
							user.username
						}\n**Discriminator:** #${user.discriminator}\n**Bot:** ${
							user.bot ? 'Yes' : 'No'
						}\n**Avatar:** ${
							format === 'gif'
								? `[gif](${gif})`
								: `[png](${png}) | [webp](${webp}) | [jpg](${jpg})`
						}`,
						false
					)
					.setTimestamp()
					.setColor(bot.color)

				if (member) {
					embed
						.addField(
							'Member information',
							`**Joined server:** ${moment(member.joinedTimestamp).format(
								'Do MMM YYYY'
							)}\n**Nickname:** ${member.nickname ? member.nickname : 'None'}${
								member.premiumSinceTimestamp
									? `\n**Boosting since:** ${moment(
											member.premiumSinceTimestamp
									  ).format('Do MMM YYY')}`
									: '\n'
							}**Member colour:** ${
								member.displayHexColor === '#000000'
									? 'None'
									: member.displayHexColor.toUpperCase()
							}\n**Highest role:** ${
								roles.length > 0 ? member.roles.highest.toString() : 'None'
							}\n**No. of roles:** ${roles.length || 'None'}\n\n**Roles:** ${
								!roles.length
									? 'None'
									: roles.length > 10
										? trimArray(roles).join(', ')
										: roles.join(', ')
							}`,
							false
						)
						.setFooter({text: `Join position: ${getOrdinal(await position)}`})
						.setColor(bot.color)
				}

				await interaction.followUp({ embeds: [embed] })
			}

			if (subcommand === 'uptime') {
				let days = Math.floor(bot.uptime / 86400000)
				let hours = Math.floor(bot.uptime / 3600000) % 24
				let minutes = Math.floor(bot.uptime / 60000) % 60
				let seconds = Math.floor(bot.uptime / 1000) % 60

				const embed = new MessageEmbed()
					.setTitle('Uptime')
					.setColor('#F4B3CA')
					.setDescription(
						`I am Online from **${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds}** seconds`
					)
					.setThumbnail(bot.user.displayAvatarURL())
					.setFooter({
						text: `${interaction.user.username}`,
						iconURL: interaction.user.avatarURL({ dynamic: true })
                     })
					.setAuthor({ name: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})
			await	interaction.editReply({ embeds: [embed] })
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

/**
 * Function to get the avatar formats of a user.
 * @param {import('discord.js').User} user - The user object.
 * @param {import('discord.js').AllowedImageFormat} format - The allowed image format(s).
 * @returns {string} - Returns whatever lol.
 */
function avatar(user, format) {
	return user.displayAvatarURL({ dynamic: true, format, size: 1024 })
}

/**
 * Gets the ordinal of a number (1st, 2nd, 3rd, etc)
 * @param {number} input - The number input to return an ordinal of.
 * @returns {string} - Returns the number + it's ordinal.
 * @example getOrdinal(10); -> '10th'
 */
function getOrdinal(input) {
	let j = input % 10,
		k = input % 100

	if (j == 1 && k != 11) return input + 'st'
	if (j == 2 && k != 12) return input + 'nd'
	if (j == 3 && k != 13) return input + 'rd'

	return input + 'th'
}

/**
 * Trims an array with more than x amount of objects. Useful for paginating embeds with fields more than 10 fields, etc.
 * @param {object[]} array - The array of objects.
 * @param {number} maxLen - Maximum amount of objects allowed before trimming.
 * @returns {object[]} - Returns the trimmed array of objects.
 */
function trimArray(array, maxLen = 10) {
	if (array.length > maxLen) {
		const len = array.length - maxLen
		array = array.slice(0, maxLen)
		array.push(` and ${len} more...`)
	}
	return array
}

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600); 
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);
  var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : ""; 
  var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : ""; 
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : ""; 
  var Hms = hDisplay + mDisplay + sDisplay ? hDisplay + mDisplay + sDisplay : "No Slowmode"

  return Hms
}
