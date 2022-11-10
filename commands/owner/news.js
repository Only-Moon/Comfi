/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, ApplicationCommandOptionType } = require('discord.js');
const clients = require('../../models/Client');

module.exports = {
  name: 'news',
  description: 'This is only for my Developer',
  options: [
    {
      name: 'message',
      type: ApplicationCommandOptionType.String,
      description: 'message to announce',
      required: true,
    },
  ],
  directory: 'owner',
  ownerOnly: true,
  userperm: ['ManageGuild'],
  botperm: ['ManageGuild'],
  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    try {
      const message = interaction.options.getString('message');
      const client = await clients.findOne({ clientId: bot.user.id });

      await clients.findOneAndUpdate(
        { clientId: bot.user.id },
        {
          news: message,
          news_read: false,
          news_lastUpdated: Date.now(),
        },
      );
      return await bot.successEmbed(bot, interaction, 'Successfully updated the Comfi News');
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
