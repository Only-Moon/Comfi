/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, ApplicationCommandOptionType, ButtonStyle } = require('discord.js');
const simplydjs = require('simply-djs');

module.exports = {
  name: 'rps',
  description: 'Simple Rps Game',
  ownerOnly: false,
  directory: 'fun',
  options: [
    {
      type: ApplicationCommandOptionType.User,
      description: 'User to Compete with in rps',
      name: 'user',
      required: true,
    },
  ],
  userperm: [''],
  botperm: [''],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {
    try {

      let embed = {
        color: bot.color
      }

      simplydjs.rps(interaction, {
        embed: {
          game: embed,
          request: embed,
          win: embed,
          draw: embed,
          timeout: embed,
          decline: embed
        },
        buttons: {
          rock: { style: ButtonStyle.Primary },
          paper: { style: ButtonStyle.Success },
          scissor: { style: ButtonStyle.Danger }
        },
      });
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
