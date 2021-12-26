const bot = require('../../index')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const guilds = require('../../models/guild')

bot.on('guildMemberUpdate', async (oldMember, newMember) => {
  const oldStatus = oldMember ?.premiumSince
	const newStatus = newMember ?.premiumSince
	const guild = oldMember ?.guild

	if (!guild) return;

  const guilD = await guilds.findOne({
    guildId: guild.id
  })

  function format(msg) {
    let text = msg

    const terms = [
      { name: '{{user#mention}}', value: `<@${newMember ?.id}>` },
      { name: '{{user#tag}}', value: `${newMember ?.user.tag}` },
      { name: '{{server#name}}', value: `${guild ?.name}` },
      { name: '{{boost#count}}', value: `${guild ?.premiumSubscriptionCount}` }
    ]

    for (let { name, value } of terms)
      text = text.replace(new RegExp(name, 'igm'), value)

    return text
  }

  if (guilD ?.boost) {
    if (!oldStatus && newStatus) {
      let system = guild ?.systemChannel ?.messages.fetch()

			if (system.type === 'USER_PREMIUM_GUILD_SUBSCRIPTION') {
        const boostChannel = guild.channels.cache.get(guilD.boost_channel)
        if (!boostChannel) return;

        const emb = guilD.boost_embed.map(async (em) => {

          const embed = new MessageEmbed()
            .setAuthor(
              em.embed.author ?.text ? em.embed.author ?.text : '',
              em.embed.author ?.icon_url
                ? em.embed.author ?.icon_url : '', em.embed.author ?.url ? em.embed.author ?.url : ''
					)
            .setTitle(format(em.embed.title || ''))
            .setDescription(format(em.embed.description || ''))
            .setColor(em.embed.color || '#36393F')
            .setImage(em.embed.image ? em.embed.image.url : "https://i.imgur.com/wTKiUY8.png")
            .setURL(em.embed.url || '')
            .setTimestamp(em.embed.timestamp ? new Date() : false)
            .setThumbnail(em.embed.thumbnail ? em.embed.thumbnail : '')
            .setFooter(format(em.embed.footer.text || ''));

          let cont = format(em.content);

          if (guilD.boost_embedtgl) {
            await boostChannel.send({ content: `${cont}`, embeds: [embed], allowedMentions: { repliedUser: true } })
          } else {
            let image = new MessageAttachment(`${guilD.boost_image}`)
            await boostChannel.send({ content: format(cont), files: [image], allowedMentions: { repliedUser: true } })
          }
        })
      } else return;
    } else return;
  } else return;

  if (oldStatus && !newStatus) return;
})
