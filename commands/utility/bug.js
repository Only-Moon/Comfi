/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const {
  CommandInteraction, EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputStyle, ApplicationCommandOptionType, TextInputBuilder,
} = require('discord.js');

module.exports = {
  name: 'bugreport',
  description: 'Report a bug',
  directory: 'utility',
  ownerOnly: false,
  modal: true,
  userperm: [''],
  botperm: [''],
  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    try {
      const modal = new ModalBuilder()
        .setCustomId('Bug')
        .setTitle('Comfi™ Bug Report')
        .addComponents(
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('title')
              .setLabel('Title for The bug')
              .setStyle(TextInputStyle.Short),
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('description')
              .setLabel('Sumbit Comfi\'s Bug Report Here')
              .setStyle(TextInputStyle.Paragraph),
          ),
        );
      await interaction.showModal(modal);
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
