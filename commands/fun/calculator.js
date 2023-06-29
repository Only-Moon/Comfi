/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction } = require('discord.js');
const simplydjs = require('simply-djs');

module.exports = {
  name: 'calculator',
  directory: 'fun',
  description: 'Advance Calculator',
  ownerOnly: false,
  userperm: [''],
  botperm: [''],
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {
    try {
      simplydjs.calculator(interaction, {
        embed: {
          color: bot.color,
          footer: 'Comfi™ Calculator',
        },
      });
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
