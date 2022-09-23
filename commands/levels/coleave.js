/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, ApplicationCommandOptionType } = require('discord.js');
const guilds = require('../../models/guild');

module.exports = {
  name: 'coleave',
  description: "Removes user's xp upon leaving the guild!",
  directory: 'level',
  ownerOnly: false,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: 'toggle',
      required: true,
      description: 'Sets the toggle for coleave',
      choices: [
        {
          name: 'true/on',
          value: 'true',
        },
        {
          name: 'false/off',
          value: 'false',
        },
      ],
    },
  ],
  userperm: ['MANAGE_GUILD'],
  botperm: ['MANAGE_GUILD'],
  /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
  run: async (bot, interaction, args) => {
    try {
      const toggle = interaction.options.getString('toggle');
      const guild = await guilds.findOne({ guildId: interaction.guild.id });
      if (guild.leavling_coleave === toggle) return await bot.errorEmbed(bot, interaction, `Coleave Toggle for **${interaction.guild.name}** is already set as **${toggle}**`);
      await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
        leveling_coleave: toggle,
      });
      return await bot.successEmbed(bot, interaction, `Coleave Toggle for **${
        interaction.guild.name
      }** has been set to: **${toggle}**`);
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
