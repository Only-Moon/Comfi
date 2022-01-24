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
						name: `${bot.user.username}™ Information`,
						iconURL: bot.user.displayAvatarURL({ dynamic: true })
                     })
					.setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
					.addField('↠ Made with love by', '꒰⚘݄꒱₊_❝ moonbow  ᵕ̈ 🌸#5817', true)
					.addField('↠ You can find me on', `${bot.guilds.cache.size} guilds`, true)
					.addField(
						`↠ I am watching over`,
						`${bot.guilds.cache.reduce(
							(users, value) => users + value.memberCount,
							0
						)} users`,
						true
					)
					.addField(
						'↠ I have a total of',
						`${bot.slashCommands.size} commands`,
						true
					)
         // .addField('↠ Please Consider donating', 'to support comfi development and hosting', true);         
				await interaction.followUp({ embeds: [embed] })
			}

			if (subcommand === 'channel') {
				let ch = interaction.options.getChannel('name')

				let channel = ch || interaction.channel
				if (!channel) return interaction.editReply(`${bot.error} • **Channel Not Found!**`)
  const rte = secondsToHms(channel.rateLimitPerUser)

				let embed = new MessageEmbed()
					.setTitle(`✧ Channel Information for **${channel.name}**`)
					.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
					.addField('↦ **Name**', ` \`\`\`\ ${channel.name} \`\`\`\ `, true)
					.addField('↦ **Parent**', ` \`\`\`\ ${channel.parent ? channel.parent.name : "Parent Not Found"} \`\`\`\ `, true)
					.addField('↦ **NSFW**', ` \`\`\`\ ${channel.nsfw} \`\`\`\ `, true)
					.addField('↦ **Channel ID**', ` \`\`\`\ ${channel.id} \`\`\`\ `)
					.addField('↦ **Channel Type**', ` \`\`\`\ ${channel.type} \`\`\`\ `)
					.addField(
						'↦ **Channel Threads**',
						` \`\`\`\ ${channel.threads ? channel.threads.cache.size.toString() : 'No Threads'} \`\`\`\ `
		)					
					.addField('↦ **Slowmode**', ` \`\`\`\ ${rte} \`\`\`\ `, true)
					.addField(
						'↦ **Channel Description**',
						` \`\`\`\ ${channel.topic || 'No Description'} \`\`\`\ `
					)
					.addField(
						'↦ **Channel Created At**',
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
						`✗Bot Count: ${member.filter(a => a.user.bot).size		}\n✗Human Count: ${member.filter(a => !a.user.bot).size.toString()} \n✗Total Member Count: ${interaction.guild.memberCount}`
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
							name: '↝__Name:__',
							value: `\`\`\`\n${stickeName}\n\`\`\``,
							inline: true
						},
						{
							name: '↝__ID:__',
							value: `\`\`\`\n${stickerID}\n\`\`\``,
							inline: true
						},
						{
							name: '↝__Created At:__',
							value: `\`\`\`\n${sticker.createdAt}\n\`\`\``,
							inline: false
						},
						{
							name: '↝__URL:__',
							value: `[Click Here](${sticker.url})`,
							inline: true
						},
						{
							name: '↝__Format:__',
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
							name: '↝Mention & ID',
							value: `${role} • \`${role.id}\``
						},
						{
							name: '↝Name',
							value: role.name,
							inline: true
						},
						{
							name: '↝Color',
							value: `${role.hexColor}`,
							inline: true
						},
						{
							name: '↝Position',
							value: `${role.position}`
						},
						{
							name: `↝Hoisted`,
							value: `${ishoist}`,
							inline: true
						},
						{
							name: '↝Mentionable',
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
						`↣ Name of server:`,
						interaction.guild.name,
						true
					)
					.addField(
						`↣ ID of server`,
						interaction.guild.id,
						true
					)
					.addField(
						'↣ Owner ID:',
						`${(await interaction.guild.fetchOwner()).id}`,
						true
					)
					.addField(
						`↣ Owner Name:`,
						`${(await interaction.guild.fetchOwner()).user}`,
						true
					)
					.addField(
						`↣ No. of Members`,
		 members
            .filter(member => !member.user.bot)
            .size.toString(),
						true
					)
					.addField(
						`↣ No. of Bots:`,
						members
							.filter(member => member.user.bot)
							.size.toString(),
						true
					)
					.addField(
						`↣ Non - Animated Emojis:`,
						interaction.guild.emojis.cache
            .filter(emoji => !emoji.animated)
            .size.toString(),
						true
					)
					.addField(
						`↣ Animated Emoji\'s:`,
						interaction.guild.emojis.cache
							.filter(emoji => emoji.animated)
							.size.toString(),
						true
					)
					.addField(
						`↣ # of Text Channel\'s:`,
						interaction.guild.channels.cache
							.filter(channel => channel.isText())
							.size.toString(),
						true
					)
					.addField(
						`↣ # of Thread\'s:`,
						interaction.guild.channels.cache
							.filter(channel => channel.isThread())
							.size.toString(),
						true
					)
					.addField(
						`↣ # of Voice Channel\'s:`,
						interaction.guild.channels.cache
							.filter(channel => channel.isVoice())
							.size.toString(),
						true
					)
					.addField(
						`↣ Total Amount of Roles:`,
						interaction.guild.roles.cache.size.toString(),
						true
					)
					.addField(
						`↣ Created at`,
						`${moment(interaction.guild.createdTimestamp).format(
							'LLL'
						)} | \`${moment(interaction.guild.createdTimestamp).fromNow()}\``,
						true
					)
					.addField(
						`↣ Vanity Link`,
						`${vanityInvite}`,
						true
					)
					.addField(
						`↣ Boost Level`,
						interaction.guild.premiumTier.toString(),
						true
					)
					.addField(
						`↣ Total Boosts`,
						interaction.guild.premiumSubscriptionCount.toString(),
						true
					)
					.addField(
						`↣ Verification Level`,
						interaction.guild.verificationLevel.toString(),
						true
					)
					.addField(
						`↣ Roles [${roles.length}]`,
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

		let flags = user.flags.toArray().join(`\n`);

		if (!flags) {
			flags = "None";
		}

		flags = flags.replace(
			"HOUSE_BRAVERY",
			"• HypeSquad Bravery"
		);
		flags = flags.replace(
			"EARLY_SUPPORTER",
			"• Early Supporter"
		);
		flags = flags.replace(
			"VERIFIED_DEVELOPER",
			"• Verified Bot Developer"
		);
		flags = flags.replace(
			"EARLY_VERIFIED_DEVELOPER",
			"• Verified Bot Developer"
		);
		flags = flags.replace(
			"HOUSE_BRILLIANCE",
			"• HypeSquad Brilliance"
		);
		flags = flags.replace(
			"HOUSE_BALANCE",
			"• HypeSquad Balance"
		);
		flags = flags.replace(
			"DISCORD_PARTNER",
			"• Partner"
		);
		flags = flags.replace(
			"HYPESQUAD_EVENTS",
			"• Hypesquad Events"
		);
		flags = flags.replace(
			"DISCORD_CLASSIC",
			"• Discord Classic"
		);
        
		let nitroBadge = user.displayAvatarURL({
			dynamic: true
		});
        
		if (nitroBadge.includes("gif")) {
			flags =
				flags +
				"• Nitro";
		}

		const row = new MessageActionRow().addComponents(
			new MessageButton()
			.setCustomId("banner")
			.setLabel("Banner")
			.setStyle("SECONDARY")
      .setEmoji("883017858446135307"),

			new MessageButton()
			.setCustomId("permissions")
			.setLabel("Permissions")
			.setStyle("SECONDARY")
      .setEmoji("883017898984103986")
		)
      
				let roles, members, position
				if (member) {
					roles = member.roles.cache
						.sort((a, b) => b.position - a.position)
						.map(role => role.toString())
            .filter(x => x.name !== "@everyone")
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
					.addFields(
          {
						name: 'User information',
						value: `**ID:** ${user.id}\n**Username:** ${
							user.username
						}\n**Discriminator:** #${user.discriminator}\n**Bot:** ${
							user.bot ? 'Yes' : 'No'
						}\n**Flags: ** ${flags} \n**Avatar:** ${
							format === 'gif'
								? `[gif](${gif})`
								: `[png](${png}) | [webp](${webp}) | [jpg](${jpg})`
						}`,
            inline: true,
          })
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

		const msg = await interaction.followUp({ 
      embeds: [embed], 
      components: [row] 
    })

		const filter = async (inter) => {

			if (inter.user.id !== interaction.user.id) {
				inter.reply({
					content: `${bot.error} • **This is not your buttons**`,
					ephemeral: true
				});
				return false;
			};
			return true;
		}

		const collector = msg.createMessageComponentCollector({
			filter,
			componentType: 'BUTTON',
		})

		collector.on("collect", async (int) => {

			if (int.customId === "banner") {
				await int.deferUpdate()
				axios.get(`https://discord.com/api/users/${member ? member.id : user.id}`, {
						headers: {
							Authorization: `Bot ${bot.token}`
						},
					})
					.then(async (res) => {
						const {
							banner,
							accent_color
						} = res.data;

						if (banner) {
							const extension = banner.startsWith("a_") ? ".gif" : ".png";
							const url = `https://cdn.discordapp.com/banners/${member.id}/${banner}${extension}?size=2048`;
              
							const embed = new MessageEmbed()
								.setTitle(`${member ? member.user.tag : user.tag}'s Banner`)
								.setImage(`${url}`)
								.setColor(accent_color ? accent_color : bot.color)

						await int.followUp({
								embeds: [embed],
								ephemeral: true
							})
						} else {
if (accent_color) {
								const embed = new MessageEmbed()
									.setDescription(
										`**${
											member ? member.user.tag : user.tag
										}** does not have a banner but they have an accent color`
									)
									.setColor(accent_color)

								await int.followUp({ embeds: [embed], ephemeral:true })
							} else {
							        await  int.followUp({content: `**${
										member ? member .user.tag : user.tag
									}** does not have a banner, nor an accent color.`,
            ephemeral: true
                                                 })
							}
						}

					})
			}

      let permissions;
    if (member) {
      
        permissions = member.permissions.toArray().map(perm => {
                return perm
                  .toLowerCase()
                  .replace(/_/g, " ") 
                  .replace(/\w\S*/g, txt => {
                  
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                  });
              });
    } else {
     permissions = "Permissions Not Found".split(`,`);
    }

      
			if (int.customId === "permissions") {
				await int.deferUpdate()
				const gay1 = new MessageEmbed()
					.setTitle(`${member ? member.user.tag : user.tag}'s Permissions`)
					.setDescription(`${permissions.join(`\n<a:p_arrowright4:884420650549272586> `)}`)
					.setColor(bot.color);
			await int.followUp({
					embeds: [gay1],
					ephemeral: true
				})

			}
		})
        
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
