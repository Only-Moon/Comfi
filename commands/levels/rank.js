/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const guilds = require("../../models/guild")
const users = require("../../models/users")
const rankCard = require("../../functions/RankCard")

module.exports = {
  name: "rank",
  directory: "level",
  description: "check your rank",
  ownerOnly: false,
  options: [
    {
      type: 'USER',
      description: 'user to check rank for',
      name: 'user',
      required: false,
    },
  ],
  userperm: [""],
  botperm: ["SEND_MESSAGES"],
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
        return await  bot.errorEmbed(bot, interaction, `User haven't Leveled Up yet or User is a Bot`)

      } else {

        if (guild.leveling) {

          rankCard(bot, interaction, {
            slash: true,
            member: target,
            level: user.level,
            color: bot.color,
            currentXP: user.xp,
            neededXP: user.requiredXp,
            background: "https://i.imgur.com/rkGiaIO.png"
          })
        } else {
          interaction.editReply(`${bot.error} Leveling is Disabled In this guild`)
        }
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
