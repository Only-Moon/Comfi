/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, ApplicationCommandOptionType } = require("discord.js");
const guilds = require("../../models/guild")
const users = require("../../models/users")
const rankCard = require("../../functions/RankCard")
const fetch = require("node-fetch")

module.exports = {
  name: "rank",
  directory: "level",
  description: "check your rank",
  ownerOnly: false,
  options: [
    {
      type: ApplicationCommandOptionType.User,
      description: 'user to check rank for',
      name: 'user',
      required: false,
    },
  ],
  userperm: [""],
  botperm: ["UseApplicationCommands"],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {

    try {

      const target = interaction.options.getUser('user') || interaction.user;

      const guild = await guilds.findOne({ guildId: interaction.guild.id })

      const user = await users.findOne({ guildId: interaction.guild.id, userId: target.id })

      if (!user) {
        return await bot.errorEmbed(bot, interaction, `User haven't Leveled Up yet or User is a Bot`)

      } else {

        if (guild.leveling) {

          rankCard(bot, interaction, {
             slash: true,
             member: target,
             level: user.level,
             color: bot.color,
             currentXP: user.xp,
             neededXP: user.requiredXp,
             background: "https://i.imgur.com/rkGiaIO.jpg"
           })
         
        } else {
        return await bot.errorEmbed(bot, interaction, `Leveling is Disabled In this guild`)
        }
      }

    } catch (e) {
      await bot.senderror(interaction, e)
    }

  }
}
