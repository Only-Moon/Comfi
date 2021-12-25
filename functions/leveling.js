const { Message, MessageAttachment, MessageEmbed, Channel } = require('discord.js')
const bot = require('../index')
const guilds = require(`../models/guild`)
const users = require(`../models/users`)

/**
 *
 * @param {Message} message
 * @param {Channel} channel
 */
module.exports = async (message, bot) => {
  const guild = await guilds.findOne({ guildId: message.guild.id })
  if (guild.leveling) {
    const amount = Math.floor(Math.random() * 15) + 1

    const user = await users.findOne({
      userId: message.author.id,
      guildId: message.guild.id
    })
    await users.findOneAndUpdate(
      { userId: message.author.id, guildId: message.guild.id },
      {
        xp: Number(user.xp) + amount
      }
    )
    const user3 = await users.findOne({
      userId: message.author.id,
      guildId: message.guild.id
    })

    if (guild.leveling_roles.length > 0) {
      guild.leveling_roles.map(async l => {
        if (l.level <= user3.level) {
          await message.member.roles.add(l.id).catch(() => null)
        }
        if (l.level > user3.level) {
          await message.member.roles.remove(l.id).catch(() => null)
        }
      })
    }
    if (user3.xp >= user.requiredXp) {
      await users.findOneAndUpdate(
        { userId: message.author.id, guildId: message.guild.id },
        {
          level: Number(user.level) + 1,
          requiredXp: Number(user.requiredXp) * 1.5
        }
      )
      const user2 = await users.findOne({
        userId: message.author.id,
        guildId: message.guild.id
      })

      function format(msg) {
        let text = msg

        const terms = [
          { name: '{{user#mention}}', value: `<@${message.author.id}>` },
          { name: '{{user#tag}}', value: `${message.author.tag}` },
          { name: '{{user#id}}', value: `${message.author.id}` },
          { name: '{{server#id}}', value: `${message.guild.id}` },
          { name: '{{server#name}}', value: `${message.guild.name}` },
          {
            name: '{{server#membercount}}',
            value: `${message.guild.membercount}`
          },
          { name: '{{level}}', value: `${user2.level}` },
          { name: '{{xp}}', value: `${user2.xp}` },
          { name: '{{requiredXp}}', value: `${user2.requiredXp}` }
        ]

        for (let { name, value } of terms)
          text = text.replace(new RegExp(name, 'igm'), value)

        return text
      }

        const channel = message.guild.channels.cache.find(
          c => c.id === guild.leveling_channel
        )
    

        if (guild.leave_embedtgl) {

          const emb = guild.leave_embed.map(async (em) => {

            const embed = new MessageEmbed()
              .setAuthor(
                em.embed.author ?.text ? em.embed.author ?.text : '',
                em.embed.author ?.icon_url
                  ? em.embed.author ?.icon_url : '', em.embed.author ?.url ? em.embed.author ?.url : ''
					)
              .setTitle(format(em.embed.title || ''))
              .setDescription(format(em.embed.description || ''))
              .setColor(em.embed.color || '#36393F')
              .setImage(em.embed.image ? em.embed.image.url : "")
              .setURL(em.embed.url || '')
              .setTimestamp(em.embed.timestamp ? new Date() : false)
              .setThumbnail(em.embed.thumbnail ? em.embed.thumbnail : '')
              .setFooter(format(em.embed.footer.text || ''));
            const cont = format(em.content);
            if (!channel) {
              return message
                .reply({ content: `${cont}`, embeds: [embed] })
                .catch(() => null)
            } else if (guild.leveling_channel === 'message') {
        return message
          .reply({ content: `${cont}`, embeds: [embed] })
          .catch(() => null)
              
            } else {
              return channel
                .send({ content: `${cont}`, embeds: [embed] })
                .catch(() => null)
            }
          })
        } else {
const image = new MessageAttachment(guild.leveling_image)
          if (!channel) {
            return message
              .reply({ content: `${format(guild.leveling_message)}`, files: [image] })
              .catch(() => null)
          } else if (guild.leveling_channel === 'message') {
        return message
          .reply({ content: `${format(guild.leveling_message)}`, files: [image] })
          .catch(() => null)
      } else {
            return channel
              .send({ content: `${format(guild.leveling_message)}`, files: [image]})
              .catch(() => null)
          }
        };
      } else return;
    } else return;
  }
