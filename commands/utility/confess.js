/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require('discord.js')
const guilds = require('../../models/guild')

module.exports = {
  name: 'confess',
  description: 'Sends an anonymous Confession',
  directory: "utility",
  ownerOnly: false,
  options: [
    {
      type: 'STRING',
      description: 'Anonymous Confession',
      name: 'confession',
      required: true
    }
  ],
  userperm: [''],
  botperm: ['SEND_MESSAGES'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    try {
      const guild = await guilds.findOne({ guildId: interaction.guild.id })
      if (guild.confession) {
        await interaction.deleteReply().catch(() => null)
        let channel = guild.confess_channel
        if (!channel) return;

        const confessionQuery = interaction.options
          .getString('confession')
          .split('')
          .slice(0, 4000)
          .join('')
        if (!confessionQuery)
          return interaction.editReply(`${bot.error} • Please Confess Something.`)

        const embed = new MessageEmbed()

          .setTitle('Anonymous Confession')
          .setDescription(`> ${confessionQuery}`)
          .setColor(bot.color)
          .setTimestamp();

        await interaction.guild.channels.cache
          .get(channel)
          .send({ embeds: [embed] })
      } else if (!guild.confession) {
        interaction.editReply(
          `${bot.error} Confession Channel Not Found, Ask an Admin to set it.`
        )
      }
    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
}
