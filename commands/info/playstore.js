/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const PlayStore = require('google-play-scraper');
const {
  CommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ApplicationCommandOptionType,
} = require('discord.js');

module.exports = {
  name: 'playstore',
  description: 'Show Playstore Application Information of Given Name!',
  ownerOnly: false,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      description: 'The application name',
      name: 'name',
      required: true,
    },
  ],
  directory: 'info',
  userperm: [''],
  botperm: ['UseApplicationCommands'],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {
    const term = interaction.options.getString('name');

    const Data = PlayStore.search({
      term,
      num: 1,
    }).then(async (Data) => {
      try {
        const App = Data[0];
        const embed = new EmbedBuilder()
          .setColor(bot.color)
          .setThumbnail(App.icon)
          .setURL(App.url)
          .setTitle(`${App.title}`)
          .setDescription(App.summary)
          .addFields(
            { name: 'Price', value: `${App.price === 0 ? 'Free' : `$${App.price}`}`, inline: true },
            { name: 'Developer', value: `${App.developer}`, inline: true },
            { name: 'Score', value: `${App.scoreText}`, inline: true },
          )
          .setFooter({ text: `Requested By ${interaction.user.username}` })
          .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL(`${App.url}`)
            .setLabel('Go to playstore !!'),
        );

        return await interaction.editReply({ embeds: [embed], components: [row] });
      } catch (e) {
        await bot.senderror(interaction, e);
      }
    }).catch(async () => await bot.errorEmbed(bot, interaction, `Can't Find App named ${term} in PlayStore`));
  },
};
