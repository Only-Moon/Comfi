/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'djsdocs',
  description: 'Search Djs Docs',
  directory: 'info',
  options: [
    {
      name: 'query',
      type: ApplicationCommandOptionType.String,
      description: 'Your query',
      required: true,
    },
  ],
  botperm: [''],
  userperm: [''],
  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    try {
      const query = interaction.options.getString('query');
      if (!query) return interaction.followUp('Please specify a query!');
      const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
        query,
      )}`;

      axios
        .get(url)
        .then(async (embed) => {
          const { data } = embed;

          if (data && !data.error) {
            await interaction.followUp({ embeds: [data] });
          } else {
            await interaction.followUp('Could not find that documentation');
          }
        });
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
