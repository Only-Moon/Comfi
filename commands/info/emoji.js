const {
	CommandInteraction,
	MessageEmbed,
	MessageButton,
	MessageActionRow,
	Util
} = require('discord.js')
const simplydjs = require('simply-djs')

module.exports = {
	name: 'emoji',
	description: 'Enlarge an one or more than one emote',
	ownerOnly: false,
	options: [
		{
			type: 'STRING',
			description: 'Emojis to Enlarge',
			name: 'name',
			required: true
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
			const emojis = args.join(' ').match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)

			if (!emojis) {
				return interaction
					.editReply({
						content: `${bot.error} • Enter A Valid Emoji in :emoji: form`
					})
					.then(msg => {
						setTimeout(() => {
							if (!msg.deleted) msg.delete()
						}, bot.ms('15s'))
					})
			} else if (emojis) {
				if (emojis.length === 1) {
					const emote = interaction.options.getString('name')

					const emo = Util.parseEmoji(emote)

					if (!emo.name || !emo.id)
						return interaction.editReply(`${bot.error} Invalid emote argument`)

					const res = `https://cdn.discordapp.com/emojis/${emo.id}.${
						emo.animated ? 'gif' : 'png'
					}`

					const img = `https://cdn.discordapp.com/emojis/${emo.id}.${
						emo.animated ? 'gif' : 'png'
					}`

					let embed = new MessageEmbed()
						.setColor(bot.color)
						.setAuthor(
							'Enlarged Emoji',
							interaction.user.avatarURL({ dynamic: true })
						)
						.setImage(`${img}`)
						.setDescription(`${emo.name} ${emo.id}`)

					const row = new MessageActionRow().addComponents(
						new MessageButton()
							.setStyle('SECONDARY')
							.setCustomId(`backEmoji`)
							.setEmoji('884420649580363796')
							.setDisabled(true),
						new MessageButton()
							.setStyle('LINK')
							.setURL(`${res}`)
							.setLabel('Download!'),
						new MessageButton()
							.setStyle('SECONDARY')
							.setCustomId('forwardEmoji')
							.setEmoji('884420650549272586')
							.setDisabled(true)
					)

					interaction
						.followUp({
							embeds: [embed],
							components: [row]
						}).catch(() => null)
				} else if (emojis.length > 1) {
					const emote = interaction.options.getString('name')

					let pages = []

					emojis.forEach(emoji => {
						const emo = Util.parseEmoji(emoji)

						if (!emo.name || !emo.id)
							return interaction.editReply(
								`${bot.error} Invalid emote argument`
							)

						const res = `https://cdn.discordapp.com/emojis/${emo.id}.${
							emo.animated ? 'gif' : 'png'
						}`

						let embed = new MessageEmbed()
							.setColor(bot.color)
							.setAuthor(
								'Enlarged Emoji',
								interaction.user.avatarURL({ dynamic: true })
							)
							.setImage(`${res}`)
							.setDescription(`${emo.name} ${emo.id}`)

						pages.push(embed)
					})

					simplydjs.embedPages(bot, interaction, pages, {
						backEmoji: '884420649580363796',
						delEmoji: '891534962917007410',
						forwardEmoji: '884420650549272586',
						btncolor: 'SECONDARY',
						delcolor: 'SECONDARY',
						skipBtn: false,
            pgCount: true,
					})
				}
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
