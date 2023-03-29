/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const {
  CommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require('discord.js');

module.exports = {
  name: 'invitee',
  description: 'Sends an invite for the bot',
  directory: 'utility',
  ownerOnly: false,
  userperm: [''],
  botperm: [''],

  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    try {
      const embed = new EmbedBuilder()
        .setAuthor({ name: 'Hello Dear!', iconURL: interaction.user.avatarURL({ dynamic: true }) })
        .setTitle('Comfi Invite Link!')
        .setDescription(
          "I'm am Aesthetic Multipurpose Discord Bot, ain't I? Use the buttons below to invite me to your server or join our support server!\n\nStay Safe",
        )
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor(bot.color);

      const yes = new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setLabel('Sure!')
        .setCustomId('inviteyes');

      const no = new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setLabel('Nope!')
        .setCustomId('inviteno');

      const row = new ActionRowBuilder().addComponents(yes).addComponents(no);

      await interaction
        .editReply({
          content: `<@${interaction.user.id}>`,
          embeds: [embed],
          components: [row],
        })
        .catch(() => null);
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
