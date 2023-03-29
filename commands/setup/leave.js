/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, EmbedBuilder, AttachmentBuilder, ApplicationCommandOptionType, ChannelType } = require('discord.js')
const guilds = require('../../models/guild')
const embedCreate = require('../../functions/embed')

module.exports = {
  name: 'leave',
  description: 'Setup Leave System',
  ownerOnly: false,
  directory: "setting",
  options: [
    {
      name: 'toggle',
      description: 'Toggle the system on or off',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'option',
          description: 'options for leave toggle',
          type: ApplicationCommandOptionType.String,
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
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          type: ApplicationCommandOptionType.String,
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
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          type: ApplicationCommandOptionType.String,
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
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'name',
          type: ApplicationCommandOptionType.Channel,
          description: 'channel for leave message',
          required: true,
          channelTypes: [ChannelType.GuildText]
        }
      ]
    },
    {
      name: 'embed',
      description: 'Setup embed for leave system',
      type: ApplicationCommandOptionType.Subcommand 
    },
    {
      name: 'content',
      description: 'setup content for leave system when embed toggle is off',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'message',
          type: ApplicationCommandOptionType.String,
          description: 'message for leave system',
          required: true
        },
        {
          name: 'image',
          type: ApplicationCommandOptionType.Attachment,
          description: 'image url for leave system',
          required: false
        }
      ]
    },
    {
      name: "help",
      description: "Help for leave system",
      type: ApplicationCommandOptionType.Subcommand
    },
  ],
  userperm: ['ManageGuild'],
  botperm: ['ManageGuild'],
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
        if (guild.leave.toString() === toggle) {
          return await bot.errorEmbed(bot, interaction, `**Leave toogle is already setted as ${toggle}!!**`
          )
        } else {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leave: toggle
            }
          )
          return await bot.successEmbed(bot, interaction, `**Leave has setted as ${toggle} !**`
          )
        }
      }

      if (sub === 'embed-toggle') {
        let toggle = interaction.options.getString('options')
        if (guild.leave_embedtgl.toString() === toggle) {
          return await bot.errorEmbed(bot, interaction, `**Leave Embed toggle is already setted as ${toggle} !**`
          )
        } else {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leave_embedtgl: toggle
            }
          )
          return await bot.successEmbed(bot, interaction, `**Leave Embed toggle has setted as ${toggle} !**`
          )
        }
      }

      if (sub === 'dm-toggle') {
        let toggle = interaction.options.getString('options')
        if (guild.leave_dmuser.toString() === toggle) {
          return await bot.errorEmbed(bot, interaction, `**Leave dm toggle is already setted as ${toggle} !**`
          )
        } else {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leave_dmuser: toggle
            }
          )
          return await bot.successEmbed(bot, interaction, `**Leave dm toggle has setted as ${toggle} !**`
          )
        }
      }

      if (sub === 'channel') {
        let channel = interaction.options.getChannel('name')
        if (guild.leave_channel === channel.id) {
          return await bot.errorEmbed(bot, interaction, `**${
            channel.name
            } already exists as leave channel !**`
          )
        } else {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leave_channel: channel.id
            }
          )
          return await bot.successEmbed(bot, interaction, `**Leave Channel Has Been Set Successfully in \`${
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
        let img = interaction.options.getString('image').url

        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            leave_message: msg
          }
        )
        return await bot.successEmbed(bot, interaction, `**Leave Content Has Been Set Successfully as \`${msg}\`!**. Used if embed toggle is off!!`
        )

        if (img) {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leave_image: img
            }
          )
          return await bot.successEmbed(bot, interaction, `**Leave Image Has Been Set Successfully in ${img}!**`
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
              value: `\`\`\`toggle - turn on/off the leave system\nembed-toggle - make the leave message show in embed or non embed text\ndm-toggle - make the leave message send in user's dm\nchannel - sets the channel for leave system\nembed - make an embed for leave system using the embed builder\ncontent - sets the non embed content for leave system\n\`\`\``,
              inline: true
            },
            {
              name: 'Tags',
              value: `\`\`\`{{user#mention}} - mentions the user\n{{user#tag}} - the users tag\n{{user#id}} - the users id\n{{server#membercount}} - the servers membercount\n{{server#humancount}} - humans / non bot members count of the server \n{{server#name}} - the servers name\n{{server#id}} - the servers id\n\`\`\``,
              inline: true
            }
          )
          .setColor(bot.color)
          .setFooter({text:`Comfi™ Leave System`});
        await interaction.editReply({ embeds: [embed] })

      }

    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
}
