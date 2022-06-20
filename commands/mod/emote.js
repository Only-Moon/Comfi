/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed, Util } = require('discord.js')
const simplydjs = require('simply-djs')

module.exports = {
	name: 'emotee',
	description: 'Add one emoji, more than one emoji, or get stats of server Emotes',
	ownerOnly: false,
  directory: "mod",
	options: [
		{
			name: 'add',
			type: 'SUB_COMMAND',
			description: 'Add emoji from other server using name or url',
			options: [
				{
					type: 'STRING',
					description: 'Server Emote or Url',
					name: 'emoji',
					required: true
				},
				{
					type: 'STRING',
					name: 'name',
					description: 'Custom Name for Emoji',
					required: false
				}
			]
		},
		{
			name: 'addmany',
			type: 'SUB_COMMAND',
			description: 'Add Multiple Emotes From another server',
			options: [
				{
					type: 'STRING',
					description: 'Emotes from other server',
					name: 'emote',
					required: true
				}
			]
		},
		{
			name: 'stats',
			type: 'SUB_COMMAND',
			description: 'Shows a list of server emotes'
		}
	],
	userperm: ['MANAGE_EMOJIS_AND_STICKERS'],
	botperm: ['MANAGE_EMOJIS_AND_STICKERS'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		let [sub] = args

		let Name = interaction.options.getString('name')

		let emoote = interaction.options.getString('emoji')
try {
		if (sub === 'add') {
			let maxLength
			if (interaction.guild.premiumTier === 'NONE') {
				maxLength = 100
			}
			if (interaction.guild.premiumTier === 'TIER_1') {
				maxLength = 200
			}
			if (interaction.guild.premiumTier === 'TIER_2') {
				maxLength = 300
			}
			if (interaction.guild.premiumTier === 'TIER_3') {
				maxLength = 500
			}
			if (interaction.guild.emojis.cache.size >= maxLength) {
		return await interaction.editReply({
					content: `${bot.error} • **Guild at max emoji cap ~ ${
						interaction.guild.emojis.cache.size
					}/${maxLength}**`
				})
			} else {
			
    const isUrl = new RegExp(
"^(https?:\\/\\/)?" +
  "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
  "((\\d{1,3}\\.){3}\\d{1,3}))" +
  "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
  "(\\?[;&a-z\\d%_.~+=-]*)?" +
  "(\\#[-a-z\\d_]*)?$",
  "i"
);
        
					let type = ''
					let name = ''
					let emote = args.join(' ').match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
					if (emote) {
						emote = emoote
						type = 'emoji'
						name = Name
					} else {
						emote = `${args.find(arg => isUrl.test(arg))}`
						name = args.find(arg => arg != emote)
						type = 'url'
					}
					let emoji = { name: '' }
					let Link
					if (type == 'emoji') {
						emoji = Util.parseEmoji(emote)
						Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
							emoji.animated ? 'gif' : 'png'
						}`
					} else {
						if (!name) return interaction.editReply('Please provide a name!')
						Link = interaction.options.getString('emoji')
					}

if (!emoji) return await interaction.editReply(`${bot.error} • Send an emote in :emoji: form`);
          
					await interaction.guild.emojis
						.create(`${Link}`, `${`${name || emoji.name}`}`)
						.then(async em => await interaction.editReply(`${bot.tick} • **Added ${em} to ${interaction.guild.name}. Slots left ~ ${				interaction.guild.emojis.cache.size
					}/${maxLength} !!**`))
				
			}
		}

		if (sub === 'addmany') {
			const emojis = args.join(' ').match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
			if (!emojis)
				return interaction.editReply(
					`${bot.error} | **Provde The emojis to add**`
				)
			let maxLength
			if (interaction.guild.premiumTier === 'NONE') {
				maxLength = 100
			}
			if (interaction.guild.premiumTier === 'TIER_1') {
				maxLength = 200
			}
			if (interaction.guild.premiumTier === 'TIER_2') {
				maxLength = 300
			}
			if (interaction.guild.premiumTier === 'TIER_3') {
				maxLength = 500
			}
			if (interaction.guild.emojis.cache.size >= maxLength) {
				interaction.editReply({
					content: `${bot.error} • **Guild at max emoji cap ~ ${
						interaction.guild.emojis.cache.size
					}/${maxLength}**`
				})
			} else {
			await interaction.deleteReply().catch(() => null)

			emojis.forEach(async emote => {
				let emoji = Util.parseEmoji(emote)
				if (emoji.id) {
					const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
						emoji.animated ? 'gif' : 'png'
					}`
					await interaction.guild.emojis
						.create(`${Link}`, `${`${emoji.name}`}`)
						.then(async em => interaction.channel.send(`${bot.tick} • **Added ${em} to ${interaction.guild.name}. Slots left ~ ${				interaction.guild.emojis.cache.size
					}/${maxLength} !!**`))
						
				}
			})
		}
      }  

		if (sub === 'stats') {
	
				let maxLength
				if (interaction.guild.premiumTier === 'NONE') {
					maxLength = 50
				}
				if (interaction.guild.premiumTier === 'TIER_1') {
					maxLength = 100
				}
				if (interaction.guild.premiumTier === 'TIER_2') {
					maxLength = 150
				}
				if (interaction.guild.premiumTier === 'TIER_3') {
					maxLength = 250
				}

				let Animated = interaction.guild.emojis.cache
					.filter(emoji => emoji.animated)
					.size.toString()

				let Emani = interaction.guild.emojis.cache
					.filter(emoji => emoji.animated)
					.map(em => em.toString())

				let EmojisAnimated =
					Emani.length < maxLength
						? Emani.join(' ')
						: Emani.length > maxLength
							? `${Emani.slice(0, maxLength).join(' ')} \`+ ${Emani.length -
									maxLength} emotes...\``
							: 'None'

				let EmojiCount = interaction.guild.emojis.cache
					.filter(emoji => !emoji.animated)
					.size.toString()

				let Em = interaction.guild.emojis.cache
					.filter(emoji => !emoji.animated)
					.map(emo => emo.toString())

				let Emojis =
					Em.length < maxLength
						? Em.join(' ')
						: Em.length > maxLength
							? `${Em.slice(0, maxLength).join(' ')} \`+ ${Em.length -
									maxLength} emotes...\``
							: 'None'

				let OverallEmoji = Number(Animated) + Number(EmojiCount)

				let Embed1 = new MessageEmbed()
					.setTitle(
						`Animated Emojis in ${interaction.guild.name} ~ ${Animated}.`
					)
					.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
					.setDescription(`${EmojisAnimated}`)
					.setColor(bot.color)

				let Embed2 = new MessageEmbed()
					.setTitle(
						`Non-Animated Emojis in ${interaction.guild.name} ~ ${EmojiCount}.`
					)
					.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
					.setDescription(`${Emojis}`)
					.setColor(bot.color)

				let pages = [Embed1, Embed2]

				simplydjs.embedPages(bot, interaction, pages, {
					slash: true,
					backEmoji: '884420649580363796',
					delEmoji: '891534962917007410',
					forwardEmoji: '884420650549272586',
					btncolor: 'SECONDARY',
					delcolor: 'SECONDARY',
					skipBtn: false
				})
      }
			} catch (e) {
  await bot.senderror(interaction, e)
			}
		
	}
}
