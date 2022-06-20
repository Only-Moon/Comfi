/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require("discord.js");
const simplydjs = require("simply-djs")

module.exports = {
  name: "rps",
  description: "Simple Rps Game",
  ownerOnly: false,
  directory: "fun",
  options: [
    {
      type: 'USER',
      description: 'User to Compete with in rps',
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

      simplydjs.rps(interaction, {
        embed: {
          color: bot.color,
          credit: false
        },
        drawColor: bot.color,
        winColor: bot.color,
      })

    } catch (e) {
      await bot.senderror(interaction, e)
    }

  }
}