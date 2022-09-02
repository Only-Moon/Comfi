/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, ApplicationCommandOptionType } = require("discord.js");
const simplydjs = require("simply-djs")

module.exports = {
  name: "ttt",
  description: "Simple Tictactoe Game",
  directory: "fun",
  ownerOnly: false,
  options: [
    {
      type: ApplicationCommandOptionType.User,
      description: 'User to Compete in ttt',
      name: 'user',
      required: true,
    },
  ],
  userperm: [""],
  botperm: [""],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {

    try {
      const user = interaction.options.getUser("user")

      simplydjs.tictactoe(interaction, {
        user: user,
        buttons: {
          X: { emoji: '883765945393365043', style: "SECONDARY" },
          O: { emoji: '883766798321864705', style: 'SECONDARY' },
          idle: { emoji: '883765946823630918', style: "SECONDARY" },
        },
        embed: {
          color: bot.color,
          footer: 'Comfi™ Tictactoe',
          credit: false
        }
      })

    } catch (e) {
      await bot.senderror(interaction, e)
    }

  }
}