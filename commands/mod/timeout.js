const { CommandInteraction, MessageEmbed } = require('discord.js')
const ms = require('ms')
const guilds = require('../../models/guild')

module.exports = {
  name: 'timeoutt',
  description: 'Mute 2.0 aka timeout command',
  directory: "mod",
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

        if (member.communicationDisabledUntilTimestamp >= Date.now()) {
          return await interaction.editReply(`${bot.error} • **${member.user.tag} is already timeout'ed**`)
        } else {

          await member.timeout(Time, `${reason}`).then(async () => {

            let embed1 = new MessageEmbed()
              .setTitle(`__Timeout'ed__`)
              .setDescription(
                `${bot.tick} • **Moderator: **${
                interaction.user.tag
                } \n${bot.tick} • **Guild: **${interaction.guild.name}\n${bot.tick} • **Reason: **${reason ? reason : "No Reason Provided"} \n${bot.tick} • **Time: **${time}`
              )
              .setColor(bot.color)
            await member
              .send({ embeds: [embed1] })
              .catch(() => null)
          })

          let embed2 = new MessageEmbed()
            .setTitle('**__Timeout Report__**')
            .setDescription(
              `${bot.tick} • Timeout'ed **${member.user.tag}** \n${
              bot.tick
              } • Time: ${time}\n${
              bot.tick
              } • Reason: ${reason ? reason : "No Reason Provided"}`
            )
            .setColor(bot.color)
          await interaction.editReply({ embeds: [embed2] })

await bot.modlog({ Member: member, 
                  Action: "timeout", 
                  Reason: reason.length < 1 ? 'No reason supplied.' : reason
                 }, interaction)
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
        const reason = interaction.options.getString("reason")
        if (!member)
          return interaction.editReply(
            `${bot.error} • **Please Enter A Valid User!**`
          )
        if (member.communicationDisabledUntilTimestamp <= Date.now()) {
          return await interaction.editReply(`${bot.error} • **${member.user.tag} is not timeout'ed**`)
        } else {
          await member.timeout(null, `${reason}`)

          const embed = new MessageEmbed()
            .setTitle('**__Timeout Report__**')
            .setAuthor(`Request Successful`, bot.user.displayAvatarURL())
            .setDescription(
              `**Successfully deleted timeout for** ${
              member.user.tag
              } \n**Reason: **${reason ? reason : "No Reason Provided"}`
            )
            .setColor(bot.color);
          await interaction.editReply({ embeds: [embed] })

await bot.modlog({ Member: member, 
                  Action: "timeout remov", 
                  Reason: reason.length < 1 ? 'No reason supplied.' : reason
                 }, interaction)
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

