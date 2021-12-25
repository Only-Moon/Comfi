const { CommandInteraction, MessageEmbed } = require('discord.js')
const ms = require('ms')
const guilds = require('../../models/guild')

module.exports = {
  name: 'timeoutt',
  description: 'Mute 2.0 aka timeout command',
  ownerOnly: false,
  options: [
    {
      name: 'add',
      description: 'Timeout Someone',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'user',
          description: 'User To Timeout',
          type: 6,
          required: true
        },
        {
          name: 'time',
          description: 'Time Till Timeout  the user in the form of s, m, h, d',
          type: 'STRING',
          required: true
        },
        {
          name: 'reason',
          description: 'Reason To add  Timeout',
          type: 3,
          required: false
        }
      ]
    },
    {
      name: 'remove',
      description: 'Remove Timeout from Someone',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'user',
          description: 'User To Remove Timeout',
          type: 6,
          required: true
        },
        {
          name: 'reason',
          description: 'Reason To remove Timeout',
          type: 3,
          required: false
        }
      ]
    }
  ],
  userperm: ['MODERATE_MEMBERS'],
  botperm: ['MODERATE_MEMBERS'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    let [sub] = args

    const guild = await guilds.findOne({ guildId: interaction.guild.id })
    try {
      if (sub === 'add') {
        const member =
          interaction.options.getMember('user') ||
          interaction.guild.members.cache.get(args[0])
        const time = interaction.options.getString('time')

        if (member.id === interaction.member.id) {
          return interaction.editReply(
            `${bot.error} • **You Cannot Timeout Yourself!**`
          )
        }
        if (
          member.roles.highest.comparePositionTo(
            interaction.guild.me.roles.highest
          ) >= 0
        ) {
          return interaction.editReply(
            ` ${bot.error} • **Cannot Timeout This User!**`
          )
        }
        const reason = interaction.options.getString('reason') || 'NONE'

        if (member.user.bot) {
          return interaction.editReply(`${bot.error} • **Cannot Timeout Bots!**`)

        }

        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
          return interaction.editReply(`${bot.error} • **Cannot timeout this user due to role hierarchy**`)
        }
        const Time = ms(time)
        if (!Time) {
          return interaction.editReply(`${bot.error} • **Provide a valid time in d, h, m, s format**`)
        }

        if (Time <= 10000) {
         return await interaction.editReply(`${bot.error} • **Time can't be less than 10 seconds !!**`)
        }

        if (Time > 2332800000) {
        return await interaction.editReply(`${bot.error} • **Time can't be greater than 27 days !!**`)
        }

        await member.timeout(Time, `${reason}`).then(async () => {
          await member
            .send(
              `**Hello, You Have Been Timeouted In ${
              interaction.guild.name
              } for ${bot.msToTime(time)} \nReason: ${reason || 'No Reason'}**`
            )
            .catch(() => null)
        })

        const embed = new MessageEmbed()
          .setColor(bot.color)
          .setDescription(`${bot.tick} • **Successfully timeout'ed** ${member.user.tag} for ${time} with Reason: ${reason}`)

        await interaction.editReply({ embeds: [embed] })
        if (!guild.modlog) return;

        if (guild.modlog) {
          let channel = interaction.guild.channels.cache.find(
            c => c.id === guild.mod_channel
          )
          if (!channel) return

          let embeds1 = new MessageEmbed()
            .setColor(bot.color)
            .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
            .setAuthor(
              `${interaction.guild.name} Modlogs`,
              interaction.guild.iconURL()
            )
            .addField('**Moderation**', 'Timeout')
            .addField('**Member**', member.user.username.toString())
            .addField('**Moderator**', interaction.user.username)
            .addField('**Reason**', `${reason || '**No Reason**'}`)
            .addField('**Date**', interaction.createdAt.toLocaleString())
            .setFooter(interaction.guild.name, interaction.guild.iconURL())
            .setTimestamp();

          var sChannel = interaction.guild.channels.cache.get(channel)
          if (!sChannel) return;
          sChannel.send({ embeds: [embeds1] })
        }
      }

      if (sub === 'remove') {
        const member =
          interaction.options.getMember('user') ||
          interaction.guild.members.cache.get(args[0]) ||
          interaction.guild.members.cache.find(
            r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
          ) ||
          interaction.guild.members.cache.find(
            ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
          )
        const reason = interaction.options.getString("reason") || "NONE"
        if (!member)
          return interaction.editReply(
            `${bot.error} • **Please Enter A Valid User!**`
          )

        await member.timeout(null, `${reason}`)

        const sembed = new MessageEmbed()
          .setColor(bot.color)
          .setDescription(`Successfully  Removed Timeout from ${member.user.username}`)

        await interaction.editReply({ embeds: [sembed] })

        if (!guild.modlog) return;

        if (guild.modlog) {
          let channel = interaction.guild.channels.cache.find(
            c => c.id === guild.mod_channel
          )
          if (!channel) return

          let embeds1 = new MessageEmbed()
            .setColor(bot.color)
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setAuthor(
              `${interaction.guild.name} Modlogs`,
              interaction.guild.iconURL()
            )
            .addField('**Moderation**', 'timeout - remove')
            .addField('**Unmuted**', member.user.username.toString())
            .addField('**Moderator**', interaction.user.username)
            .addField('**Date**', interaction.createdAt.toString())
            .setFooter(interaction.guild.name, interaction.guild.iconURL())
            .setTimestamp()

          sChannel = interaction.guild.channels.cache.get(channel)
          if (!sChannel) return
          sChannel.send({ embeds: [embeds1] })
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

