const bot = require('../../index')
const { EmbedBuilder, AttachmentBuilder } = require('discord.js')
const guilds = require('../../models/guild')

bot.on('messageCreate', async message => {

  const guild = await guilds.findOne({
    guildId: message.guild.id
  })

  function format(msg) {
    let text = msg

    const terms = [
      { name: '{{user#mention}}', value: `<@${message.member?.id}>` },
      { name: '{{user#tag}}', value: `${message.member?.user.tag}` },
      { name: '{{user#avatar}}', value: `${message.member?.avatarURL({dynamic: true})}`},
      { name: '{{server#name}}', value: `${message.guild?.name}` },
      { name: '{{server#icon}}', value: `${message.guild.iconURL({dynamic:true})}`},
      { name: '{{boost#count}}', value: `${message.guild?.premiumSubscriptionCount}` }
    ]

    for (let { name, value } of terms)
      text = text.replace(new RegExp(name, 'igm'), value)

    return text
  }

  if (guild?.boost) {
    if(message.author.bot || message.channel.type == 'DM') return;
    let messageTypes = ['USER_PREMIUM_GUILD_SUBSCRIPTION', 'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1', 'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2', 'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3']

    if(messageTypes.includes(message.type)) {
        const boostChannel = message.guild.channels.cache.get(guild.boost_channel)
        if (!boostChannel) return;

        const emb = guild.boost_embed.map(async (em) => {

          const embed = new EmbedBuilder()
            .setAuthor({
              name: em.embed.author?.text ? format(em.embed.author?.text) : '',
            avatarURL: em.embed.author?.icon_url
                ? em.embed.author?.icon_url : '', url: em.embed.author ?.url ? em.embed.author ?.url : ''
					})
            .setTitle(format(em.embed.title || ''))
            .setDescription(format(em.embed.description || ''))
            .setColor(em.embed.color || bot.color)
            .setImage(em.embed.image ? em.embed.image.url : "https://i.imgur.com/wTKiUY8.png")
            .setURL(em.embed.url || '')
            .setTimestamp(em.embed.timestamp ? new Date() : false)
            .setThumbnail(em.embed.thumbnail ? em.embed.thumbnail : '')
            .setFooter({text: format(em.embed.footer.text || '')});

          let cont = format(em.content);

          if (guild.boost_embedtgl) {
            await boostChannel.send({ content: `${cont}`, embeds: [embed], allowedMentions: { repliedUser: true } })
          } else {
            let image = new AttachmentBuilder(`${guild.boost_image}`)
            await boostChannel.send({ content: format(cont), files: [image], allowedMentions: { repliedUser: true } })
          }
        })
      } else return;
  } else return;

})