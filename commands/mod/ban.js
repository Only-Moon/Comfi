/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require('discord.js')
const guilds = require('../../models/guild')
const ms = require('ms')

module.exports = {
  name: 'bann',
  description: 'Different ways to ban a user',
  directory: "mod",
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

    try {

      if (sub === 'permanent') {

        const user = interaction.options.getMember('user')
        const reason =
          interaction.options.getString('reason') ||
          `Banned by ${interaction.member.username}`

        let banMember = interaction.guild.members.cache.get(args[0]) || bot.users.cache.get(args[0]) || user
        if (!banMember) {
          return await bot.errorEmbed(bot, interaction, `**User Is Not In The Guild**`)
        }

        if (banMember.user === interaction.user) {
          return await bot.errorEmbed(bot, interaction, `**You Cannot Ban Yourself**`)
        }
        const userRank = banMember.roles.highest.rawPosition
        const memberRank = interaction.member.roles.highest.rawPosition

        if (userRank >= memberRank) {
          return await bot.errorEmbed(bot, interaction, `**Cannot Ban This User due to role hierarchy !**`
          )
        }

        await interaction.guild.members.ban(banMember, {
          reason: reason.length < 1 ? 'No reason supplied.' : reason
        })
        await banMember.send(
          `**Hello, You Have Been Banned From ${interaction.guild.name}
             for - ${reason || 'No Reason'}**`).catch(() => null)

        if (reason) {
          var sembed = new MessageEmbed()
            .setColor(bot.color)
            .setDescription(
              `*${bot.error} • *${banMember.username}** has been banned for ${reason}`)

          await interaction.editReply({ embeds: [sembed] })
        } else {
          var sembed2 = new MessageEmbed()
            .setColor(bot.color)
            .setDescription(`**${banMember.user.username}** has been banned`)
          await interaction.editReply({ embeds: [sembed2] })

        }
        await bot.modlog({
          Member: banMember,
          Action: "ban",
          Reason: reason.length < 1 ? 'No reason supplied.' : reason
        }, interaction)
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
          return await bot.errorEmbed(bot, interaction, `**You cant ban that user due to the role hierarchy**`)
        }
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
          .setAuthor({ name: `${interaction.user.username}` })
          .setColor(bot.color)
          .addField('Reason:', reason.toString())
          .addField('Time (s)', regex.toString())
          .addField('Moderator:', interaction.user.username)

        await interaction.editReply({ embeds: [tbembed] })

        await bot.modlog({
          Member: tbuser,
          Action: "temporary ban",
          Reason: reason.length < 1 ? 'No reason supplied.' : reason
        }, interaction)

        await tbuser.send({ embeds: [tbuembed] }).catch(() => null)

        await interaction.guild.members
          .ban(tbuser, { reason: `${reason}` })
          .then(() => {
            setTimeout(function() {
              interaction.guild.members.unban(tbuser.id)
              interaction.channel.send({
                content: `${bot.tick} • <@${
                  tbuser.id
                  }> has been unbanned after tempban of ${regex}`
              })
            }, bot.ms(regex))
            return undefined;
          })
      }

      if (sub === 'hack') {
        const target =
          interaction.options.getMember('user') ||
          interaction.guild.members.cache.get(args[0])

        if (isNaN(target))
          return interaction.editReply(
            `${bot.error} • Please specify an ID or USERNAME`
          )

        if (target.user === interaction.user) {
          return await bot.errorEmbed(bot, interaction, `**You Cannot Ban Yourself**`)
        }
        const reason = interaction.options.getString('reason')

        if (
          target.roles.highest.comparePositionTo(
            interaction.guild.me.roles.highest
          ) >= 0
        ) {
          return await bot.errorEmbed(bot, interaction, `**Cannot Ban This User coz User's role is higher than me !**`
          )
        }

        const userRank = target.roles.highest.rawPosition
        const memberRank = interaction.member.roles.highest.rawPosition

        if (userRank >= memberRank) {
          return await bot.errorEmbed(bot, interaction, `**You cant ban that user due to the role hierarchy*j`)
        }

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

        await bot.modlog({
          Member: target,
          Action: "hack ban",
          Reason: reason.length < 1 ? 'No reason supplied.' : reason
        }, interaction)

      }

      if (sub === 'remove') {

        const userId = interaction.options.getString('user')

        bot.users.fetch(userId).then(async (user) => {
          await interaction.guild.members.unban(user.id).catch(() => {
            return interaction.editReply(`${bot.error} • **User is Not Banned**`
            )
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
            .setAuthor({
              name: interaction.user.username,
              iconURL: interaction.user.avatarURL({ dynamic: true })
            })
          await interaction.editReply({ embeds: [ban] })

          await bot.modlog({
            Member: target,
            Action: "unban",
            Reason: 'No reason supplied.'
          }, interaction)

        })
      }
    } catch (e) {
  await bot.senderror(interaction, e)
    }
  }
}