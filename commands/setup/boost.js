/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed, } = require('discord.js')
const guilds = require('../../models/guild')
const embedCreate = require('../../functions/embed')

module.exports = {
  name: 'boost',
  description: 'Setup Boost Detector System',
  directory: "setting",
  ownerOnly: false,
  options: [
    {
      name: 'toggle',
      description: 'Toggle the system on or off',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'option',
          description: 'Options for boost Detector toggle',
          type: 'STRING',
          required: true,
          choices: [
            {
              name: 'true/on',
              value: "true"
            },
            {
              name: 'false/off',
              value: "false"
            }
          ]
        }
      ]
    },
    {
      name: 'embed-toggle',
      description: 'Embed Toogle for boosy detector system',
      type: 'SUB_COMMAND',
      options: [
        {
          type: 'STRING',
          description: 'Options for boost detector embed toggle',
          name: 'options',
          required: true,
          choices: [
            {
              name: 'true/on',
              value: "true"
            },
            {
              name: 'false/off',
              value: "false"
            }
          ]
        }
      ]
    },
    {
      name: 'channel',
      description: 'Channel for boost detector',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'name',
          type: 'CHANNEL',
          description: 'Channel for boost detector',
          required: true,
          channelTypes: ['GUILD_TEXT']
        }
      ]
    },
    {
      name: 'embed',
      description: 'Setup embed for boost detector',
      type: 'SUB_COMMAND'
    },
    {
      name: 'content',
      description: 'Setup content for boost detector when embed toggle is off',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'message',
          type: 'STRING',
          description: 'Message for boost detector',
          required: true
        },
        {
          name: 'image',
          type: 'STRING',
          description: 'Image url for boost detector',
          required: false
        }
      ]
    },
    {
      name: "help",
      description: "Help for leave Boost Detector",
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
        if (guild ?.boost.toString() === toggle) {
          return await bot.errorEmbed(bot, interaction, `**Boost toogle is already setted as ${toggle} !**`
          )
        } else {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              boost: toggle
            }
          )
          return await bot.successEmbed(bot, interaction, `**Boost Detector has setted as ${toggle} !**`
          )
        }
      }

      if (sub === 'embed-toggle') {
        let toggle = interaction.options.getString('option')
        if (guild.boost_embedtgl.toString() === toggle) {
          return await bot.errorEmbed(bot, interaction, `**Boost Detector embed toggle is already setted as ${toggle}!**`
          )
        } else {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              boost_embedtgl: toggle
            }
          )
          return await bot.successEmbed(bot, interaction, `**Boost Detector  embed toggle has setted as ${toggle} !**`
          )
        }
      }

      if (sub === 'channel') {
        let channel = interaction.options.getChannel('name')
        if (guild.boost_channel === channel.id) {
          return await bot.errorEmbed(bot, interaction, `**${channel.name} already exists as boost channel !**`
          )
        } else {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              boost_channel: channel.id
            }
          )
          return await bot.successEmbed(bot, interaction, `**Boost Channel Has Been Set Successfully in \`${
            channel.name
            }\`!**`
          )
        }
      }

      if (sub === 'embed') {
        embedCreate(interaction, {
          name: "Boost Detector's",
          footer: 'Boost Detector Embed Creator'
        }).then(async em => {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              boost_embed: em
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
            boost_message: msg
          }
        )
        return await bot.successEmbed(bot, interaction, `**Boost Content Has Been Set Successfully as \`${msg}\`!**. Used if embed toggle is off!`
        )

        if (img) {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              boost_image: img
            }
          )
          return await bot.successEmbed(bot, interaction, `**Boost Channel Has Been Set Successfully in ${img}!**. Used only when embed toggle is off`
          )
        }
      }

      if (sub === "help") {

        const embed = new MessageEmbed()
          .setTitle(`Boost System variables`, bot.user.displayAvatarURL())
          .setDescription(`Need Help setting Boost system?`)
          .addFields(
            {
              name: "Commands",
              value: `\`\`\`toggle - turn on/off the boost detector\nembed-toggle - make the boost message show in embed or non embed text\nembed - make an embed for boost detector using the embed builder\ncontent - sets the non embed content for boost detector\n\`\`\``
            },
            {
              name: 'Tags',
              value: `\`\`\`{{user#mention}} - mentions the user\n{{user#tag}} - the user of the person who \n{{server#name}} - the servers name\n{{boost#count}} - boost count of the server\n\`\`\``,
              inline: true
            }
          )
          .setColor(bot.color)
          .setFooter(`Comfi™ Boost Detector`);
        await interaction.editReply({ embeds: [embed] })

      }
    } catch (e) {
  await bot.senderror(interaction, e)
    }
  }
}
