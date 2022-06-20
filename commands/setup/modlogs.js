/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require('discord.js')
const guilds = require('../../models/guild')

module.exports = {
  name: 'modlogs',
  description: 'Sets a Channel Where Bot Can Send Moderation logs!',
  directory: "setting",
  ownerOnly: false,
  options: [
    {
      type: 'SUB_COMMAND',
      name: 'enable',
      description: 'Sets channel for Modlogs',
      options: [
        {
          type: 'CHANNEL',
          description: 'modlogs channel',
          name: 'name',
          required: true,
          channelTypes: ['GUILD_TEXT']
        }
      ]
    },
    {
      type: 'SUB_COMMAND',
      name: 'disable',
      description: 'Disables the modlogs channel'
    }
  ],
  userperm: ['MANAGE_GUILD'],
  botperm: ['MANAGE_GUILD'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    let [subcommand] = args

    const finalData = {
      value: undefined,
      channel: undefined
    }
    try {
      if (subcommand === 'enable') {

        let channel = interaction.options.getChannel('name')

        bot.guilds.cache
          .get(interaction.guild.id)
          .channels.cache.get(channel.id)
          .send(`${bot.tick} **Modlog Channel Set!**`)
        finalData['channel'] = channel.id
        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            modlog: true,
            mod_channel: finalData.channel
          }
        )
        interaction.editReply(
          `${bot.tick} **Modlog Channel Has Been Set Successfully in \`${
          channel.name
          }\`!**`
        )

      }

      if (subcommand === 'disable') {

        let channel = interaction.guild.channels.cache.get(
          guild.logging_channel
        )
        bot.guilds.cache
          .get(interaction.guild.id)
          .channels.cache.get(channel.id)
          .send('**Modlogs Channel Disabled!**')
        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            modlog: false
          }
        )

        interaction.editReply(
          `${bot.tick} **Modlog Channel Has Been Successfully Disabled in \`${
          channel.name
          }\`**`
        )
      }
    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
}

