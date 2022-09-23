/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction } = require('discord.js');
const simplydjs = require('simply-djs');

module.exports = {
  name: 'embed',
  description: 'Embed creator.',
  ownerOnly: false,
  directory: 'utility',
  userperm: [''],
  botperm: ['SEND_MESSAGES'],

  run: async (bot, interaction, args) => {
    try {
      simplydjs.embedCreate(interaction, {
        embed: {
          title: 'Embed Builder',
          description: 'Use the options from dropdown below to make an embed',
          color: bot.color,
          credit: false,
          footer: 'Comfi™ Embed Builder',
        },
      });
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
