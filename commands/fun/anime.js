/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'anime',
  description: 'Get Anime Actions',
  directory: 'fun',
  options: [
    {
      name: 'category',
      description: 'which action do you want',
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: 'cuddle',
          value: 'cuddle',
        },
        {
          name: 'hug',
          value: 'hug',
        },
        {
          name: 'kiss',
          value: 'kiss',
        },
        {
          name: 'smile',
          value: 'smile',
        },
        {
          name: 'wave',
          value: 'wave',
        },
        {
          name: 'handhold',
          value: 'handhold',
        },
        {
          name: 'wink',
          value: 'wink',
        },
        {
          name: 'poke',
          value: 'poke',
        },
        {
          name: 'dance',
          value: 'dance',
        },
        {
          name: 'cringe',
          value: 'cringe',
        },
        {
          name: 'kill',
          value: 'kill',
        },
        {
          name: 'slap',
          value: 'slap',
        },
        {
          name: 'bite',
          value: 'bite',
        },
        {
          name: 'highfive',
          value: 'highfive',
        },
        {
          name: 'blush',
          value: 'blush',
        },
        {
          name: 'pat',
          value: 'pat',
        },
        {
          name: 'smug',
          value: 'smug',
        },
        {
          name: 'bonk',
          value: 'bonk',
        },
        {
          name: 'cry',
          value: 'cry',
        },
        {
          name: 'bully',
          value: 'bully',
        },
        {
          name: 'yeet',
          value: 'yeet',
        },
        {
          name: 'happy',
          value: 'happy',
        },
        {
          name: 'kick',
          value: 'kick',
        },
      ],
    },
    {
      name: 'user',
      type: ApplicationCommandOptionType.User,
      description: 'user to send anime gif',
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
      const user = interaction.options.getUser('user');

      const arg = interaction.options.getString('category');

      const Slash = require('../../functions/anime');
      const slash = new Slash({
        type: args,
        interaction,
        embedFooter: { text: `Requested by ${interaction.member.displayName}` },
        embedTitle: `${interaction.user.username} ${arg}ed ${user.username}`,
        embedColor: bot.color,
      });
      slash.anime();
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
