/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed, MessageAttachment } = require('discord.js')
const guilds = require('../../models/guild')
const embedCreate = require('../../functions/embed')

module.exports = {
  name: 'leveling',
  description: 'Setup Leveling System',
  ownerOnly: false,
  directory: "setting",
  options: [
    {
      name: 'toggle',
      description: 'Toggle the system on or off',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'option',
          description: 'Options for leveling toggle',
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
      description: 'Embed Toogle for leveling system',
      type: 'SUB_COMMAND',
      options: [
        {
          type: 'STRING',
          description: 'Options for leveling system embed toggle',
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
      description: 'Channel for leveling system',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'name',
          type: 'CHANNEL',
          description: 'Channel for leveling system',
          required: true,
          channelTypes: ['GUILD_TEXT']
        }
      ]
    },
    {
      name: 'embed',
      description: 'Setup embed for leveling system',
      type: 'SUB_COMMAND'
    },
    {
      name: 'content',
      description: 'Setup content when embedtoggle is off',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'message',
          type: 'STRING',
          description: 'Message for leveling system',
          required: true
        },
        {
          name: 'image',
          type: 'STRING',
          description: 'Image url for leveling system',
          required: false
        }
      ]
    },
    {
      name: "help",
      description: "Variables for leveling system",
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
        if (guild.leveling.toString() === toggle) {

          return await bot.errorEmbed(bot, interaction, `**Leveling toogle is already setted as ${toggle} !**`
          )
        } else {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leveling: toggle
            }
          )
          return await bot.successEmbed(bot, interaction, `**Leveling has setted as ${toggle} !**`
          )
        }
      }

      if (sub === 'embed-toggle') {
        let toggle = interaction.options.getString('options')
        if (guild.leveling_embedtgl.toString() === toggle) {
          return await bot.errorEmbed(bot, interaction, `**Leveling Embed toggle is already setted as ${toggle} !**`
          )
        } else {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leveling_embedtgl: toggle
            }
          )
          return await bot.successEmbed(bot, interaction, `**Leveling Embed toggle has setted as ${toggle} !**`
          )
        }
      }

      if (sub === 'channel') {
        let channel = interaction.options.getChannel('name')
        if (guild.leveling_channel === channel.id) {
          return await bot.errorEmbed(bot, interaction, `**${
            channel.name
            } already exists as leveling channel !**`
          )
        } else {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leveling_channel: channel.id
            }
          )
          return await bot.successEmbed(bot, interaction, `**Leveling Channel Has Been Set Successfully in \`${
            channel.name
            }\` !**`
          )
        }
      }

      if (sub === 'embed') {
        embedCreate(interaction, {
          name: "Leveling System's",
          footer: 'Leveling Embed Creator'
        }).then(async em => {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leveling_embed: em
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
            leveling_message: msg
          }
        )
        return await bot.successEmbed(bot, interaction, `**Leveling Content Has Been Set Successfully as \`${msg}\`!**. Used if embed toggle is off!!`
        )

        if (img) {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              leveling_image: img
            }
          )
          return await bot.successEmbed(bot, interaction, `**Leveling Image Has Been Set Successfully in ${img}!**`
          )
        }
      }

      if (sub === "help") {

        const embed = new MessageEmbed()
          .setTitle(`Leveling System variables`, bot.user.displayAvatarURL())
          .setDescription(`Need Help setting Leveling system?`)
          .addFields(
            {
              name: "Commands",
              value: `\`\`\`toggle - turn on/off the leveling system\nembed-toggle - make the leveling message show in embed or non embed text\nembed - make an embed for leveling system using the embed builder\ncontent - sets the non embed content for leveling system\n\`\`\``
            },
            {
              name: "Commands",
              value: `\`\`\`{{user#mention}} - the users id\n{{user#tag}} - the users tag\n{{user#id}} - the users id\n{{level}} - the users new level\n{{xp}} - the users xp\n{{requiredxp}} - the new required xp amount\n\`\`\``
            },
          )
          .setColor(bot.color)
          .setFooter(`Comfi™ Leveling System`);
        await interaction.editReply({ embeds: [embed] })

      }

    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
}