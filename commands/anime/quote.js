/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'quote',
  description: 'Get Anime qoutes',
  options: [
    {
      name: 'name',
      description: 'which anime do you want the quote from',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  directory: 'anime',
  userperm: [''],
  botperm: [''],

  run: async (bot, interaction, args) => {
    try {
      const title = interaction.options.getString('name');
      if (!title) {
        const Slash = require('../../functions/anime');
        const slash = new Slash({
          args: 'RANDOM',

          interaction,
          embedFooter: { text: `Requested by ${interaction.member.displayName}` }, // The Footer of the embed
          embedTitle: 'Here\'s a Random Anime Qoute', // The title of the embed
          embedColor: bot.color, // The color of the embed! (Use Hex codes or use the color name)
        });
        slash.quote();
      } else {
        const Slash = require('../../functions/anime');
        const slash = new Slash({
          args: title,
          interaction,
          embedFooter: { text: `Requested by ${interaction.member.displayName}` }, // The Footer of the embed
          embedTitle: `Here's a ${args} Qoute`, // The title of the embed
          embedColor: bot.color, // The color of the embed! (Use Hex codes or use the color name)
        });
        slash.quote();
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
