const { EmbedBuilder, AttachmentBuilder, ChannelType } = require('discord.js');
const bot = require('../../index');
const guilds = require('../../models/guild');

/**
 * Handles boost messages by sending an embed or image to the
 * configured boost channel when a user boosts the guild.
 *
 * Checks if boosting is enabled and retrieves the boost channel.
 * Loops through the configured boost embed(s). Replaces template
 * variables in the embed content. Sends the embed or image to the
 * boost channel based on the toggle setting.
 */
bot.on('messageCreate', async (message) => {
	const guild = await guilds.findOne({
		guildId: message.guild.id
	})

	function format(msg) {
		let text = msg

		const terms = [
			{ name: '{{user#mention}}', value: `<@${message.member?.id}>` },
			{ name: '{{user#tag}}', value: `${message.member?.user.tag}` },
			{
				name: '{{user#avatar}}',
				value: `${message.member?.avatarURL({ dynamic: true })}`
			},
			{ name: '{{server#name}}', value: `${message.guild?.name}` },
			{
				name: '{{server#icon}}',
				value: `${message.guild.iconURL({ dynamic: true })}`
			},
			{
				name: '{{boost#count}}',
				value: `${message.guild?.premiumSubscriptionCount}`
			}
		]

		for (const { name, value } of terms)
			text = text.replace(new RegExp(name, 'igm'), value)

		return text
	}

	if (guild?.boost) {
		if (message.author.bot || message.channel.type == ChannelType.Dm) return
		const messageTypes = [
			'UserPremiumGuildSubscription',
			'UserPremiumGuildSubscriptionTier1',
			'UserPremiumGuildSubscriptionTier2',
			'UserPremiumGuildSubscriptionTier3'
		]

		if (messageTypes.includes(message.type)) {
			const boostChannel = message.guild.channels.cache.get(guild.boost_channel)
			if (!boostChannel) return

			const emb = guild.boost_embed.map(async (em) => {
				const embed = new EmbedBuilder()
					.setAuthor({
						name: em.embed ? em.embed?.author.text : em.author?.name,
						avatarURL: em.embed ? em.author.icon_url : em.author?.icon_url
					})
					.setTitle(format(em.embed ? em.embed?.title : em.title))
					.setDescription(format(em.embed ? em.embed : em.description))
					.setColor(
						em.embed ? em.embed?.color : em.color ? em.color : bot.color
					)
					.setImage(
						em.embed
							? em.embed?.image
							: em.image
							? em.image
							: 'https://i.imgur.com/8MggL9S.png'
					)
					.setTimestamp(
						em.embed ? em.embed?.timestamp : em.timestamp ? new Date() : null
					)
					.setThumbnail(em.embed ? em.embed?.thumbnail : em.thumbnail)
					.setFooter({
						text: format(
							em.embed
								? em.embed?.footer.text
								: em.footer
								? em.footer.text
								: null
						),
						avatarURL: em.embed
							? em.embed?.footer.icon_url
							: em.footer
							? em.footer.icon_url
							: null
					})
				const cont = format(em.embed ? em.embed?.content : null)

				if (guild.boost_embedtgl) {
					await boostChannel.send({
						content: `${cont}`,
						embeds: [embed],
						allowedMentions: { repliedUser: true }
					})
				} else {
					const image = new AttachmentBuilder(`${guild.boost_image}`)
					await boostChannel.send({
						content: format(cont),
						files: [image],
						allowedMentions: { repliedUser: true }
					})
				}
			})
		} else return
	} else return
})
