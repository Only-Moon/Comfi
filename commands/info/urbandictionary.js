/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const urban = require('relevant-urban');
const {
  CommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ApplicationCommandOptionType,
} = require('discord.js');

module.exports = {
  name: 'urbandictionary',
  description: 'Give information about urban words',
  ownerOnly: false,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      description: 'Word to Search',
      name: 'word',
      required: true,
    },
  ],
  directory: 'info',
  userperm: [''],
  botperm: ['SEND_MESSAGES'],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {
    const image = 'http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium';
    try {
      const res = await urban(args.join(' '));
      if (!res) return interaction.editReply('No results found for this topic, sorry!');
      const {
        word, urbanURL, definition, example, thumbsUp, thumbsDown, author,
      } = res;

      const embed = new EmbedBuilder()
        .setColor(bot.color)
        .setAuthor({ name: `Word - ${word}` })
        .setThumbnail(image)
        .setDescription(`**Defintion:**\n*${definition || 'No definition'}*\n\n**Example:**\n*${example || 'No Example'}*`)
        .addFields(
          { name: '**Rating:**', value: `**\`Upvotes: ${thumbsUp} | Downvotes: ${thumbsDown}\`**`, inline: true },
          { name: '**Link**', value: `[link to ${word}](${urbanURL})`, inline: true },
          { name: '**Author:**', value: `${author || 'unknown'}`, inline: true },
        )
        .setTimestamp();

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL(`${urbanURL}`)
          .setLabel(`Link to ${word}`),
      );

      await interaction.editReply({ embeds: [embed], components: [row] });
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
