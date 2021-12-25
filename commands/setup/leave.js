const { CommandInteraction, MessageEmbed } = require('discord.js')
const guilds = require('../../models/guild')
const embedCreate = require('../../functions/embed')

module.exports = {
  name: 'leave',
  description: 'Setup Leave System',
  ownerOnly: false,
  options: [
    {
      name: 'toggle',
      description: 'Toggle the system on or off',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'option',
          description: 'options for leave toggle',
          type: 'STRING',
          required: true,
          choices: [
            {
              name: 'true/on',
              value: 'true'
            },
            {
              name: 'false/off',
              value: 'false'
            }
          ]
        }
      ]
    },
    {
      name: 'embed-toggle',
      description: 'Embed Toogle for leave system',
      type: 'SUB_COMMAND',
      options: [
        {
          type: 'STRING',
          description: 'options for leave system embed toggle',
          name: 'options',
          required: true,
          choices: [
            {
              name: 'true/on',
              value: 'true'
            },
            {
              name: 'false/off',
              value: 'false'
            }
          ]
        }
      ]
    },
    {
      name: 'dm-toggle',
      description: 'Dm Toogle for leave system',
      type: 'SUB_COMMAND',
      options: [
        {
          type: 'STRING',
          description: 'options for leave dm toggle',
          name: 'options',
          required: true,
          choices: [
            {
              name: 'true/on',
              value: 'true'
            },
            {
              name: 'false/off',
              value: 'false'
            }
          ]
        }
      ]
    },
    {
      name: 'channel',
      description: 'Channel for leave system',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'name',
          type: 'CHANNEL',
          description: 'channel for leave message',
          required: true,
          channelTypes: ['GUILD_TEXT']
        }
      ]
    },
    {
      name: 'embed',
      description: 'Setup embed for leave system',
      type: 'SUB_COMMAND'
    },
    {
      name: 'content',
      description: 'setup content for leave system when embed toggle is off',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'message',
          type: 'STRING',
          description: 'message for leave system',
          required: true
        },
        {
          name: 'image',
          type: 'STRING',
          description: 'image url for leave system',
          required: false
        }
      ]
    },
    {
      name: "help",
      description: "Help for leave system",
      type: "SUB_COMMAND"
    },
  ],
  userperm: ['MANAGE_GUILD'],
  botperm: ['MANAGE_GUILD'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    let [sub] = args
    try {
      const guild = await guilds.findOne({ guildId: interaction.guild.id })

      if (sub === 'toggle') {
        let toggle = interaction.options.getString('option')
        if (guild.leave === toggle) {
          await interaction.editReply(
            `${bot.error} •  Leave toogle is already setted as ${toggle}!!`
          )
        } else {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leave: toggle
            }
          )
          interaction.editReply(
            `${bot.tick} • **Leave has setted as ${toggle} !**`
          )
        }
      }

      if (sub === 'embed-toggle') {
        let toggle = interaction.options.getString('options')
        if (guild.leave_embedtgl === toggle) {
          await interaction.editReply(
            `${
            bot.error
            } •  Leave Embed toggle is already setted as ${toggle}!!`
          )
        } else {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leave_embedtgl: toggle
            }
          )
          interaction.editReply(
            `${bot.tick} • **Leave Embed toggle has setted as ${toggle} !**`
          )
        }
      }

      if (sub === 'dm-toggle') {
        let toggle = interaction.options.getString('options')
        if (guild.leave_dmuser === toggle) {
          await interaction.editReply(
            `${bot.error} •  Leave dm toggle is already setted as ${toggle}!!`
          )
        } else {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leave_dmuser: toggle
            }
          )
          interaction.editReply(
            `${bot.tick} • **Leave dm toggle has setted as ${toggle} !**`
          )
        }
      }

      if (sub === 'channel') {
        let channel = interaction.options.getChannel('name')
        if (guild.leave_channel === channel.id) {
          await interaction.editReply(
            `${bot.error} • ${
            channel.name
            } already exists as leave channel !!`
          )
        } else {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leave_channel: channel.id
            }
          )
          interaction.editReply(
            `${bot.tick} • **Leave Channel Has Been Set Successfully in \`${
            channel.name
            }\`!**`
          )
        }
      }

      if (sub === 'embed') {
        embedCreate(interaction, {
          name: "Leave System's",
          footer: 'Leave Embed Creator'
        }).then(async em => {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leave_embed: em
            }
          )
        })
      }

      if (sub === 'content') {
        let msg = interaction.options.getString('message')
        let img = interaction.options.getString('image')

        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            leave_message: msg
          }
        )
        interaction.editReply(
          `${
          bot.tick
          } • **Leave Content Has Been Set Successfully as \`${msg}\`!**. Used if embed toggle is off!!`
        )

        if (img) {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leave_image: img
            }
          )
          interaction.editReply(
            `${
            bot.tick
            } • **Leave Image Has Been Set Successfully in ${img}!**`
          )
        }
      }

      if (sub === "help") {

        const embed = new MessageEmbed()
          .setTitle(`Leave System variables`, bot.user.displayAvatarURL())
          .setDescription(`Need Help setting Leave system?`)
          .addFields(
            {
              name: "Commands",
              value: `\`\`\`toggle - turn on/off the leave system\nembed-toggle - make the leave message show in embed or non embed text\ndm-toggle - make the leave message send in user's dm\nchannel - sets the channel for leave system\nembed - make an embed for leave system using the embed builder\ncontent - sets the non embed content for leave system\n\`\`\``
            },
            {
              name: 'Tags',
              value: `\`\`\`{{user#mention}} - mentions the user\n{{user#tag}} - the users tag\n{{user#id}} - the users id\n{{server#membercount}} - the servers membercount\n{{server#humancount}} - humans / non bot members count of the server \n{{server#name}} - the servers name\n{{server#id}} - the servers id\n\`\`\``,
              inline: true
            }
          )
          .setColor(bot.color)
          .setFooter(`Comfi™ Leave System`);
        await interaction.editReply({ embeds: [embed] })

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
