const { CommandInteraction, MessageEmbed } = require('discord.js')
const simplydjs = require('simply-djs')
const guilds = require('../../models/guild')
const users = require('../../models/users')

module.exports = {
  name: 'settings',
  description: 'Shows server setup',
  ownerOnly: false,
  userperm: [''],
  botperm: ['SEND_MESSAGES'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    const guildID = interaction.guild.id
    const messageChannel = interaction.channel
    const user = await users.findOne({
      guildId: interaction.guild.id,
      userId: interaction.user.id
    })
    const guild = await guilds.findOne({
      guildId: interaction.guild.id
    })
    try {

      const members = (await interaction.guild.members.fetch({
        time: 9999999,
        withPresences: true
      }))
        .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
        .map(m => m)

      const position = new Promise(ful => {
        for (let i = 1; i < members.length + 1; i++) {
          // @ts-ignore
          if (members[i - 1].id === interaction.member.id) ful(i)
        }
      })
      const posi = await position

      function format(msg) {
        let text = msg

        const terms = [
          {
            name: '{{user#mention}}',
            value: `<@${interaction.user.id || 'NONE'}>`
          },
          { name: '{{user#tag}}', value: `${interaction.user.tag || 'NONE'}` },
          { name: '{{user#id}}', value: `${interaction.user.id || 'NONE'}` },
          { name: '{{server#id}}', value: `${interaction.guild.id}` },
          {
            name: '{{server#name}}',
            value: `${interaction.guild.name || 'NONE'}`
          },
          {
            name: '{{server#membercount}}',
            value: `${interaction.guild.memberCount || 'NONE'}`
          },
          {
            name: '{{boost#count}}',
            value: `${interaction.guild.premiumSubscriptionCount || 'NONE'}`
          },
          {
            name: '{{join#position}}',
            value: `${getOrdinal(posi)}`
          }
        ]

        for (let { name, value } of terms)
          text = text.replace(new RegExp(name, 'igm'), value)

        return text
      }

      const auto = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - Auto Nickname`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription('You can change the settings by `/autonick`')
        .addFields({
          name: '» AutoNick',
          value: `\`\`\`\n${guild.auto_nick}\n\`\`\``
        })
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const anti = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - Anti Scam`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription('You can change the settings by `/antiscam toggle, antiscam duration, antiscam disable`')
        .addFields({
          name: '» AutoScam Toggle',
          value: `\`\`\`\n${guild.anti_scam}\n\`\`\``, inline: true
        }, {
          name: '» AutoScam Timeout Duration',
          value: `\`\`\`\n${bot.ms(guild.anti_scam_time)}\n\`\`\``
        })
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const boost = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - Boost Detector `,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription(
          'You can change the settings by `/boost message or /boost channel`'
        )
        .addFields(
          {
            name: '» Boost Toogle',
            value: `\`\`\`\n${guild.boost}\n\`\`\``
          },
          {
            name: '» Boost Embed Toogle',
            value: `\`\`\`\n${guild.boost_embedtgl}\n\`\`\``
          },
          {
            name: '» Boost Message',
            value: `${format(guild.boost_message)}`
          },
          {
            name: '» Boost Image',
            value: `\`\`\`\n${`Preview Below`}\n\`\`\``
          }
        )
        .setImage(`${guild.boost_image}`)
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const bump = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - Bump System`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription(
          'You can change the settings by `/bump toggle or /bump channel`'
        )
        .addFields(
          {
            name: '» Bump Toogle',
            value: `\`\`\`\n${guild.bump}\n\`\`\``
          },
          {
            name: '» Bump Channel',
            value: `<#${guild.bump_channel}>`
          }
        )
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const chatbot = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - Chatbot`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription(
          'You can change the settings by `/chatbot toggle or /chatbot channel`'
        )
        .addFields(
          {
            name: '» Chatbot Toogle',
            value: `\`\`\`\n${guild.chatbot}\n\`\`\``
          },
          {
            name: '» Chatbot Channel',
            value: `<#${guild.chat_channel}>`
          }
        )
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const confess = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - Confess`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription(
          'You can change the settings by `/confession enable or /confession disable`'
        )
        .addFields(
          {
            name: '» Confession Toogle',
            value: `\`\`\`\n${guild.confession}\n\`\`\``
          },
          {
            name: '» Confession Channel',
            value: `<#${guild.confess_channel}>`
          }
        )
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const leave = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - Leave`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription('You can change the settings by `/leave`')
        .addFields(
          {
            name: '» Leave Toogle',
            value: `\`\`\`\n${guild.leave}\n\`\`\``
          },
          {
            name: '» Leave Channel',
            value: `<#${guild.leave_channel}>`
          },
          {
            name: '» Leave Dm Toogle',
            value: `\`\`\`\n${guild.leave_dmuser}\n\`\`\``
          },
          {
            name: '» Leave Embed Toogle',
            value: `\`\`\`\n${guild.leave_embedtgl}\n\`\`\``
          },
          {
            name: '» Leave Message',
            value: `${format(guild.leave_message)}`
          },
          {
            name: '» Leave Image',
            value: `\`\`\`\n${`Preview Below`}\n\`\`\``
          }
        )
        .setImage(guild.leave_image)
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const leveling = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - Leveling`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription('You can change the settings by `/leveling`')
        .addFields(
          {
            name: '» Leveling Toogle',
            value: `\`\`\`\n${guild.leveling}\n\`\`\``
          },
          {
            name: '» Leveling Embed Toogle',
            value: `\`\`\`\n${guild.leveling_embedtgl}\n\`\`\``
          },
          {
            name: '» Leveling Message',
            value: `${format(guild.leveling_message)}`
          },
          {
            name: '» Leveling Channel',
            value: `<#${guild.leveling_channel}>`
          }
        )
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const logging = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - Logging`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription('You can change the settings by `/logging`')
        .addFields(
          {
            name: '» Logging Toogle',
            value: `\`\`\`\n${guild.logging}\n\`\`\``
          },
          {
            name: '» Logging Channel',
            value: `<#${guild.logging_channel}>`
          }
        )
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const membercount = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - Member Counter`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription('You can change the settings by `/membercount`')
        .addFields(
          {
            name: '» Member Counter Toogle',
            value: `\`\`\`\n${guild.member_counter || 'NONE'}\n\`\`\``
          },
          {
            name: '» Member Counter Channel Type',
            value: `\`\`\`\n${guild.member_counter_channel_type ||
              'NONE'}\n\`\`\``
          },
          {
            name: '» Member Counter Channel Name',
            value: `${guild.member_counter_channel_name || 'NONE'}`
          },
          {
            name: '» Member Counter Channel',
            value: `<#${guild.member_counter_channel || 'NONE'}>`
          }
        )
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const modlog = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - Modlogs`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription(
          'You can change the settings by `/modlog enable or /modlog disable`'
        )
        .addFields(
          {
            name: '» Modlogs Toogle',
            value: `\`\`\`\n${guild.modlog}\n\`\`\``
          },
          {
            name: '» Modlogs Channel',
            value: `<#${guild.mod_channel}>`
          }
        )
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const mute = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - Mute Role`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription(
          'You can change the settings by `/muterole enable or /muterole disable`'
        )
        .addFields(
          {
            name: '» Muterole Toggle',
            value: `\`\`\`\n${guild.mute}\n\`\`\``
          },
          {
            name: '» Mute Role',
            value: `<@&${guild.mute_role}>`
          }
        )
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const nqn = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - NQN`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription(
          'You can change the settings by `/nqn option`'
        )
        .addFields(
          {
            name: '» Nqn Toggle',
            value: `\`\`\`\n${guild.nqn}\n\`\`\``
          }
        )
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const suggest = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings -Suggestion`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription(
          'You can change the settings by `/suggestion enable or /suggestion disable`'
        )
        .addFields(
          {
            name: '» Suggestion Toogle',
            value: `\`\`\`\n${guild.suggestions}\n\`\`\``
          },
          {
            name: '» Suggestions Channel',
            value: `<#${guild.suggestions_channel}>`
          }
        )
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const ticket = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - Ticket`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription(
          'You can change the settings by `/ticket category, /ticket role, /ticket disable`'
        )
        .addFields(
          {
            name: '» Ticket Toogle',
            value: `\`\`\`\n${guild.ticket}\n\`\`\``
          },
          {
            name: '» Ticket Category',
            value: `\`\`\`\n${guild.ticket_category}\n\`\`\``
          },
          {
            name: '» Ticket Support Role',
            value: `<@&${guild.ticket_role}>`
          }
        )
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const verification = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - Verification`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription('You can change the settings by `/verification`')
        .addFields(
          {
            name: '» Verification Toogle',
            value: `\`\`\`\n${guild.verification}\n\`\`\``
          },
          {
            name: '» Verification Message',
            value: `${format(guild.verification_message)}`
          },
          {
            name: '» verification Channel',
            value: `<#${guild.verification_channel}>`
          },
          {
            name: '» Verification Role',
            value: `<@&${guild.verification_role}>`
          }
        )
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color);

      let role = [];
      const joinrole = guild.welcome_joinrole.forEach(r => {
        role.push(`<@&${r}>`)

      })

      const welcome = new MessageEmbed()
        .setAuthor({
name:          `${interaction.guild.name} - Settings - Welcome`,
iconURL:          interaction.guild.iconURL({ dynamic: true })
          })
        .setDescription('You can change the settings by `/welcome`')
        .addFields(
          {
            name: '» Welcome Toogle',
            value: `\`\`\`\n${guild.welcome}\n\`\`\``
          },
          {
            name: '» Welcome Channel',
            value: `<#${guild.welcome_channel}>`
          },
          {
            name: '» Welcome Dm Toogle',
            value: `\`\`\`\n${guild.welcome_dmuser}\n\`\`\``
          },
          {
            name: '» Welcome Embed Toogle',
            value: `\`\`\`\n${guild.welcome_embedtgl}\n\`\`\``
          },
          {
            name: '» Welcome JoinRole',
            value: `\n${role.join(` , `)}\n`
          },
          {
            name: '» Welcome Message',
            value: `${format(guild.welcome_message)}`
          },
          {
            name: '» Welcome Image',
            value: `\`\`\`\n${`Preview Below`}\n\`\`\``
          }
        )
        .setImage(guild.welcome_image)
        .setFooter({
text:          `Requested by: ${interaction.user.tag}`,
iconURL:          interaction.user.avatarURL({ dynamic: true })
                   })
        .setColor(bot.color)

      const pages = [
        anti,
        auto,
        boost,
        chatbot,
        confess,
        leave,
        leveling,
        logging,
        membercount,
        modlog,
        mute,
        suggest,
        verification,
        welcome
      ]

      simplydjs.embedPages(bot, interaction, pages, {
        firstEmoji: '884420649580363796',
        backEmoji: '884421503205134356',
        delEmoji: '891534962917007410',
        forwardEmoji: '884421235965059113',
        lastEmoji: '884420650549272586',
        btncolor: 'SECONDARY',
        delcolor: 'SECONDARY',
        skipcolor: 'SECONDARY',
        skipBtn: true,
        pgCount: true
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

function getOrdinal(input) {
  let j = input % 10,
    k = input % 100

  if (j == 1 && k != 11) return input + 'st'
  if (j == 2 && k != 12) return input + 'nd'
  if (j == 3 && k != 13) return input + 'rd'

  return input + 'th'
}