/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
  name: 'covid',
  description: 'Track a country or worldwide COVID-19 cases',
  ownerOnly: false,
  options: [
    {
      name: 'country',
      description: 'The country you want to track',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  directory: 'info',
  userperm: [''],
  botperm: [''],

  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    try {
      const country = interaction.options.getString('country');

      if (country === 'all') {
        await fetch('https://covid19.mathdro.id/api')
          .then((response) => response.json())
          .then(async (data) => {
            const confirmed = data.confirmed.value.toLocaleString();
            const recovered = data.recovered.value.toLocaleString();
            const deaths = data.deaths.value.toLocaleString();

            const embed = new EmbedBuilder()
              .setTitle('Worldwide COVID-19 Stats 🌎')
              .addFields(
                { name: 'Confirmed Cases', value: confirmed, inline: true },
                { name: 'Recovered', value: recovered, inline: true },
                { name: 'Deaths', value: deaths, inline: true },
              )
              .setColor(bot.color);

            await interaction.followUp({ embeds: [embed] });
          });
      } else {
        await fetch(`https://covid19.mathdro.id/api/countries/${country}`)
          .then((response) => response.json())
          .then(async (data) => {
            const confirmed = data.confirmed.value.toLocaleString();
            const recovered = data.recovered.value.toLocaleString();
            const deaths = data.deaths.value.toLocaleString();

            const embed = new EmbedBuilder()
              .setTitle(`COVID-19 Stats for **${country}**`)
              .addFields(
                { name: 'Confirmed Cases', value: confirmed, inline: true },
                { name: 'Recovered', value: recovered, inline: true },
                { name: 'Deaths', value: deaths, inline: true },
              )
              .setColor(bot.color);

            await interaction.followUp({ embeds: [embed] });
          })
          .catch((e) => interaction.followUp({ content: 'Invalid Country Provided' }));
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
