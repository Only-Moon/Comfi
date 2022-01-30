const bot = require(`../../index`)
const guilds = require(`../../models/guild`)
const { MessageEmbed, MessageAttachment } = require('discord.js')

bot.on('guildMemberAdd', async member => {

  try {
  
  const guild = await guilds.findOne({ guildId: member.guild.id })
  require(`../../functions/verification`)(member, bot)

					const members = (await member.guild.members.fetch({
						time: 9999999,
						withPresences: true
					}))
						.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
						.map(m => m)

					const position = new Promise(ful => {
						for (let i = 1; i < members.length + 1; i++) {
							// @ts-ignore
							if (members[i - 1].id === member.id) ful(i)
						}
					})
  
  const posi = await position 
  
  function format(msg) {
    let text = msg

    const terms = [
      { name: '{{user#mention}}', value: `<@${member.id}>` },
      { name: '{{user#tag}}', value: `${member.user.tag}` },
      { name: '{{user#id}}', value: `${member.id}` },
      { name: '{{user#avatar}}', value: `${member.avatarURL({dynamic: true})}`},
      { name: '{{server#id}}', value: `${member.guild.id}` },
      { name: '{{server#name}}', value: `${member.guild.name}` },
      { name: '{{server#icon}}', value: `${member.guild.iconURL({dynamic:true})}`},
      { name: '{{server#membercount}}', value: `${member.guild.memberCount}` },
      { name: '{{server#humancount}}', value: `${member.guild.members.cache.filter(member => !member.user.bot)}` },
      { name: '{{join#position}}', value: `${getOrdinal(posi)}`}
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
            .setAuthor({ name: 
              em.embed.author ?.text ? em.embed.author ?.text : '',
          avatarURL:  em.embed.author?.icon_url
                ? em.embed.author?.icon_url : '', url: em.embed.author?.url ? em.embed.author ?.url : ''
					})
            .setTitle(format(em.embed.title || ''))
            .setDescription(format(em.embed.description || ''))
            .setColor(em.embed.color ? em.embed.color : bot.color)
            .setImage(em.embed.image ? em.embed.image.url : "https://i.imgur.com/8MggL9S.png")
            .setURL(em.embed.url || '')
            .setTimestamp(em.embed.timestamp ? new Date() : false)
            .setThumbnail(em.embed.thumbnail ? em.embed.thumbnail : '')
            .setFooter({text: format(em.embed.footer.text || '')});
          let cont = format(em.content);
          if
            (guild.welcome_dmuser) {
            await member.send({ 
              content: `${cont}`, 
              embeds: [embed] 
            }).catch(() => null)
          } else {
            channel
              .send({

                content: `${cont}`, 
                embeds: [embed], allowedMentions: { repliedUser:  true }
              })
              .catch(() => null)
          }

        })
      } else {
        if (guild.welcome_dmuser) {
          let welcome_image = new MessageAttachment(`${guild.welcome_image}`)

          member
            .send({
              content: `${format(guild.welcome_message)}`,
              files: [welcome_image], allowedMentions: { repliedUser:  true }
            })
            .catch(() => null)
        } else {
          let welcome_image = new MessageAttachment(`${guild.welcome_image}`)

          channel
            .send({
              content: `${format(guild.welcome_message)}`,
              files: [welcome_image], allowedMentions: { repliedUser:  true }
            })
            .catch(() => null)
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
    
})

function getOrdinal(input) {
	let j = input % 10,
		k = input % 100

	if (j == 1 && k != 11) return input + 'st'
	if (j == 2 && k != 12) return input + 'nd'
	if (j == 3 && k != 13) return input + 'rd'

	return input + 'th'
            }