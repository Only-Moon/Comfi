/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, ApplicationCommandOptionType, ButtonStyle } = require('discord.js');
const simplydjs = require('simply-djs');

module.exports = {
  name: 'ttt',
  description: 'Simple Tictactoe Game (Play with Ai)',
  directory: 'fun',
  ownerOnly: false,
  options: [
    {
      type: ApplicationCommandOptionType.User,
      description: 'User to Compete in ttt',
      name: 'user',
      required: false,
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
      const user = interaction.options.getUser('user');

      simplydjs.tictactoe(interaction, {
        user: user,
        type: 'Button',
        buttons: {
          X: { emoji: '883765945393365043', style: ButtonStyle.Secondary },
          O: { emoji: '883766798321864705', style: ButtonStyle.Secondary },
          idle: { emoji: '883765946823630918', style: ButtonStyle.Secondary },
        },
        embed: {
          color: bot.color,
          footer: 'Comfi™ Tictactoe'
        },
      });
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
