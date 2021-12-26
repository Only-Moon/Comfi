const { CommandInteraction, MessageEmbed } = require('discord.js')
const guilds = require('../../models/guild')
const ms = require('ms')

module.exports = {
  name: 'bann',
  description: 'Different ways to ban a user',
  ownerOnly: false,
  options: [
    {
      name: 'permanent',
      description: 'Permanently Ban Someone from your Server',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'user',
          description: 'User To Ban',
          type: 'USER',
          required: true
        },
        {
          name: 'reason',
          description: 'Reason To Ban',
          type: 'STRING',
          required: true
        }
      ]
    },
    {
      name: 'temporary',
      description: 'Temporary Ban a User',
      type: 'SUB_COMMAND',
      options: [
        {
          type: 'USER',
          description: 'User to tempmute',
          name: 'user',
          required: true
        },
        {
          type: 'STRING',
          description: 'Time till tempban',
          name: 'time',
          required: true
        },
        {
          type: 'STRING',
          description: 'Reason to tempban',
          name: 'reason',
          required: true
        }
      ]
    },
    {
      name: 'hack',
      description: 'Hack/forceban a user without them knowing it',
      type: 'SUB_COMMAND',
      options: [
        {
          type: 'USER',
          description: 'user to hackban',
          name: 'user',
          required: true
        },
        {
          type: 'STRING',
          description: 'reason to hackban',
          name: 'reason',
          required: true
        }
      ]
    },
    {
      name: 'remove',
      description: 'Unban Someone',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'user',
          description: 'UserId To Unban',
          type: 'STRING',
          required: true
        }
      ]
    }
  ],
  userperm: ['BAN_MEMBERS'],
  botperm: ['BAN_MEMBERS'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    let [sub] = args

    const guild = await guilds.findOne({ guildId: interaction.guild.id })

    if (sub === 'permanent') {
      try {
        const user = interaction.options.getUser('user')
        const reason =
          interaction.options.getString('reason') ||
          `Banned by ${interaction.member.username}`

        let banMember = interaction.guild.members.cache.get(args[0]) || user
        if (!banMember)
          return interaction.editReply('**User Is Not In The Guild**')
        if (banMember === interaction.user)
          return interaction.editReply('**You Cannot Ban Yourself**')

        const userRank = user.member.roles.highest.rawPosition
        const memberRank = interaction.member.roles.highest.rawPosition

        if (userRank >= memberRank) {
          return interaction.editReply(
            ` ${bot.error} • **Cannot Ban This User due to role hierarchy!**`
          )
        }

        await interaction.guild.members.ban(banMember, {
          reason: reason.length < 1 ? 'No reason supplied.' : reason
        })
        banMember.send(
          `**Hello, You Have Been Banned From ${interaction.guild.name}
             for - ${reason || 'No Reason'}**`).catch(() => null)

        if (reason) {
          var sembed = new MessageEmbed()
            .setColor(bot.color)
            .setDescription(
              `**${banMember.username}** has been banned for ${reason}`)

          await interaction.editReply({ embeds: [sembed] })
        } else {
          var sembed2 = new MessageEmbed()
            .setColor(bot.color)
            .setDescription(`**${banMember.username}** has been banned`)
          await interaction.editReply({ embeds: [sembed2] })

        }
        if (!guild.modlog) return;

        let channel = interaction.guild.channels.cache.find(
          c => c.id === guild.mod_channel)

        if (channel == null) return;

        if (!channel) return;

        if (guild.modlog) {
          const embed = new MessageEmbed()
            .setAuthor(
              `${interaction.guild.name} Modlogs`,
              interaction.guild.iconURL()
            )
            .setColor(bot.color)
            .setThumbnail(banMember.displayAvatarURL({ dynamic: true }))
            .setFooter(interaction.guild.name, interaction.guild.iconURL())
            .addField('**Moderation**', 'ban')
            .addField('**Banned**', banMember.username.toLocaleString())
            .addField('**ID**', `${banMember.id}`)
            .addField('**Banned By**', `${interaction.user.username}`)
            .addField('**Reason**', `${reason || '**No Reason**'}`)
            .addField('**Date**', `${interaction.createdAt.toDateString()}`)
            .setTimestamp()

          var sChannel = interaction.guild.channels.cache.get(channel)
          if (!sChannel) return
          sChannel.send({ embeds: [embed] })
        } else return;
      } catch (e) {
        let emed = new MessageEmbed()
          .setTitle(`${bot.error} • Error Occured`)
          .setDescription(`\`\`\`${e.stack}\`\`\``)
          .setColor(bot.color);

        bot.sendhook(null, {
          channel: bot.err_chnl,
          embed: emed
        })
        interaction.followUp({
          embeds: [
            {
              description: `${
                bot.error} \n
               Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
              color: bot.color
            }
          ]
        })

      }
    }

    if (sub === 'temporary') {
      const reason = interaction.options.getString('reason')

      const tbuser =
        interaction.options.getMember('user') ||
        interaction.guild.members.cache.get(args[0])
      const regex = interaction.options.getString('time')
      if (tbuser === interaction.member) {
        return interaction.editReply(
          `${bot.error} Really!! Are you going to ban yourself..`
        )
      }

      if (tbuser.roles.highest.comparePositionTo(interaction.guild.me.roles.highest) >= 0
      ) {
        return interaction.editReply(
          ` ${bot.error} • **Cannot bans User!**`
        )
      }

      const userRank = tbuser.roles.highest.rawPosition
      const memberRank = interaction.member.roles.highest.rawPosition

      if (userRank >= memberRank) {
        return interaction.editReply(`${bot.error} • You cant ban that user due to the role hierarchy`)
      }

      try {
        if (!reason) reason = 'No Reason Provided'
        const tbuembed = new MessageEmbed()
          .setTitle(' You have been banned!')
          .setColor(bot.color)
          .addField('Reason:', reason.toString())
          .addField('Time (s)', regex.toString())
          .addField('Moderator:', interaction.user.username)

        const tbembed = new MessageEmbed()
          .setTitle('Action: Tempban')
          .addField('User:', tbuser.toString())
          .setAuthor(`${interaction.user.username}`)
          .setColor(bot.color)
          .addField('Reason:', reason.toString())
          .addField('Time (s)', regex.toString())
          .addField('Moderator:', interaction.user.username)

        interaction.editReply({ embeds: [tbembed] })

        tbuser.send({ embeds: [tbuembed] }).catch(() => null)

        interaction.guild.members
          .ban(tbuser, { reason: `${reason}` })
          .then(() => {
            setTimeout(function() {
              interaction.guild.members.unban(tbuser.id)
              interaction.channel.send({
                content: `${bot.tick} • <@${
                  tbuser.id
                  }> has been unbanned after tempban of ${regex}`
              })
            }, ms(regex))
            return undefined
          })
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

    if (sub === 'hack') {
      const target =
        interaction.options.getUser('user') ||
        interaction.guild.members.cache.get(args[0])
      if (isNaN(target))
        return interaction.editReply(
          `${bot.error} • Please specify an ID or USERNAME`
        )

      if (target === interaction.user)
        return interaction.editReply('**You Cannot Ban Yourself**')

      const reason = interaction.options.getString('reason')

      if (
        target.member.roles.highest.comparePositionTo(
          interaction.guild.me.roles.highest
        ) >= 0
      ) {
        return interaction.editReply(
          ` ${bot.error} • **Cannot Mute This User!**`
        )
      }

      const userRank = user.member.roles.highest.rawPosition
      const memberRank = interaction.member.roles.highest.rawPosition

      if (userRank >= memberRank) {
        return interaction.editReply(`${bot.error} • You cant ban that user due to the role hierarchy`)
      }


      try {
        await interaction.guild.members.ban(target, {
          reason: reason.length < 1 ? 'No reason supplied.' : reason
        })
        const embed2 = new MessageEmbed()
          .setColor(bot.color)
          .setDescription(
            `${bot.tick} • ${
            target.user.id
            } **were successfully banned. User was not notified!**`
          )
        await interaction.editReply({ embeds: [embed2] })
        if (!guild.modlog) return

        if (guild.modlog) {
          let channel = interaction.guild.channels.cache.find(
            c => c.id === guild.mod_channel
          )
          if (!channel) return
          const embed = new MessageEmbed()
            .setAuthor(
              `${interaction.guild.name} Modlogs`,
              interaction.guild.iconURL()
            )
            .setColor(bot.color)
            .setFooter(interaction.guild.name, interaction.guild.iconURL())
            .addField('**Moderation**', 'ban')
            .addField('**ID**', `${target}`)
            .addField('**Banned By**', interaction.user.username.toString())
            .addField('**Reason**', `${reason || '**No Reason**'}`)
            .addField('**Date**', interaction.createdAt.toString())
            .setTimestamp()

          var sChannel = interaction.guild.channels.cache.get(channel)
          if (!sChannel) return
          sChannel.send({ embeds: [embed] })
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

    if (sub === 'remove') {
      try {
        const userId = interaction.options.getString('user')

        bot.users.fetch(userId).then(async user => {
          await interaction.guild.members.unban(user.id).catch(() => {
            return interaction.editReply({
              content: `${bot.crosss} • User is Not Banned`
            })
          })
          const ban = new MessageEmbed()
            .setColor(bot.color)
            .setTimestamp()
            .addFields(
              {
                name: `Unbanned :`,
                value: `<@${userId}>`,
                inline: true
              },
              {
                name: `Moderator :`,
                value: `<@${interaction.user.id}>`,
                inline: true
              }
            )
            .setAuthor(
              interaction.user.username,
              interaction.user.avatarURL({ dynamic: true })
            )
          interaction.editReply({ embeds: [ban] }).catch(() => {
            return interaction.editReply({
              content: `${bot.crosss} • User is Not Banned`
            })
          })
        })
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
}
