const bot = require(`../../index`)
const guilds = require(`../../models/guild`)
const { MessageEmbed, MessageAttachment } = require('discord.js')

bot.on('guildMemberAdd', async member => {
  const guild = await guilds.findOne({ guildId: member.guild.id })
  require(`../../functions/verification`)(member, bot)

  function format(msg) {
    let text = msg

    const terms = [
      { name: '{{user#mention}}', value: `<@${member.id}>` },
      { name: '{{user#tag}}', value: `${member.user.tag}` },
      { name: '{{user#id}}', value: `${member.id}` },
      { name: '{{server#id}}', value: `${member.guild.id}` },
      { name: '{{server#name}}', value: `${member.guild.name}` },
      { name: '{{server#membercount}}', value: `${member.guild.memberCount}` },
      { name: '{{server#humancount}}', value: `${member.guild.members.cache.filter(member => !member.user.bot)}` }
    ]

    for (let { name, value } of terms)
      text = text.replace(new RegExp(name, 'igm'), value)

    return text
  }

  if (guild.welcome) {
    const channel = member.guild.channels.cache.find(
      c => c.id === guild.welcome_channel
    )
    if (channel) {
      if (guild.welcome_embedtgl) {

        const emb = guild.welcome_embed.map(async (em) => {

          const embed = new MessageEmbed()
            .setAuthor(
              em.embed.author ?.text ? em.embed.author ?.text : '',
              em.embed.author ?.icon_url
                ? em.embed.author ?.icon_url : '', em.embed.author ?.url ? em.embed.author ?.url : ''
					)
            .setTitle(format(em.embed.title || ''))
            .setDescription(format(em.embed.description || ''))
            .setColor(em.embed.color || '#36393F')
            .setImage(em.embed.image ? em.embed.image.url : "https://i.imgur.com/8MggL9S.png")
            .setURL(em.embed.url || '')
            .setTimestamp(em.embed.timestamp ? new Date() : false)
            .setThumbnail(em.embed.thumbnail ? em.embed.thumbnail : '')
            .setFooter(format(em.embed.footer.text || ''));
          let cont = format(em.content);
          if
            (guild.welcome_dmuser) {
            await member.send({ 
              content: `${cont}`, 
              embeds: [embed] 
            }).catch(() => { })
          } else {
            channel
              .send({

                content: `${cont}`, 
                embeds: [embed]
              })
              .catch(() => { })
          }

        })
      } else {
        if (guild.welcome_dmuser) {
          let welcome_image = new MessageAttachment(`${guild.welcome_image}`)

          member
            .send({
              content: `${format(guild.welcome_message)}`,
              files: [welcome_image]
            })
            .catch(() => { })
        } else {
          let welcome_image = new MessageAttachment(`${guild.welcome_image}`)

          channel
            .send({
              content: `${format(guild.welcome_message)}`,
              files: [welcome_image]
            })
            .catch(() => { })
        }
      }
    }
 if (guild.welcome_joinrole) {

guild.welcome_joinrole.forEach(async (r) => {

await member.roles
.add(r)
.catch(() => null)
  
})
   
 } else return;
  } else return;

  if (guild.auto_nick.toLowerCase() === 'none') return;
  let nick = `${guild.auto_nick}`
  member.setNickname(`${nick}` + member.user.username).catch(() => { })
})
