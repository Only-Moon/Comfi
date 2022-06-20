/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require('discord.js')
const guilds = require('../../models/guild')

module.exports = {
  name: 'logging',
  description: 'Setup logging system!',
  ownerOnly: false,
  directory: "setting",
  options: [
    {
      type: 'SUB_COMMAND',
      name: 'enable',
      description: 'Sets channel for logs',
      options: [
        {
          type: 'CHANNEL',
          description: 'logs channel',
          name: 'name',
          required: true,
          channelTypes: ['GUILD_TEXT']
        }
      ]
    },
    {
      type: 'SUB_COMMAND',
      name: 'disable',
      description: 'Disables the logging system'
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

        if (channel === 'GUILD_VOICE')
          return interaction.editReply(
            `${bot.error} **Please Mention a Text Channel To Set!**`
          )
        finalData['channel'] = channel.id
        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            logging: true,
            logging_channel: finalData.channel
          }
        )
        interaction.editReply(
          `${bot.tick} **Logging Channel Has Been Set Successfully as \`${
          channel.name
          }\`!**`
        )
      }

      if (subcommand === 'disable') {

        let channel = interaction.guild.channels.cache.get(
          guild.logging_channel
        )
        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            log: false
          }
        )

        interaction.editReply(
          `${bot.tick} **Logging System Has Been Successfully Disabled in \`${
          channel.name
          }\`**`
        )
      }
    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
}

