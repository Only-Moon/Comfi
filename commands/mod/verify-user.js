/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require("discord.js")
const guilds = require("../../models/guild")

module.exports = {
  name: "verify-user",
  description: "Force verify a user / bot!",
  directory: "mod",
  ownerOnly: false,
  options: [
    {
      name: "user",
      type: "USER",
      description: "user/bot to verify",
      required: true,
    }
  ],
  botperm: ["MANAGE_ROLES"],
  userperm: ["ADMINISTRATOR"],
  /**
   * @param {CommandInteraction} interaction 
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {
    try {
      const guild = await guilds.findOne({ guildId: interaction.guild.id })
      if (guild.verification) {
        const member = interaction.options.getMember('user')

        await member.roles.add(guild.verification_role)
        const embed = new MessageEmbed()
          .setDescription(` > ${bot.tick} • ${member} has been verified!`)
          .setColor(bot.color)
        interaction.editReply({ embeds: [embed] })

      } else {
        return interaction.editReply({ content: `${bot.crosss} • Please setup verification by doing /verification before using this command!` })
      }
    } catch {
      await bot.senderror(interaction, e)
    }
  }
}