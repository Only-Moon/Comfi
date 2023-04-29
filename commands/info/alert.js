const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const clients = require('../../models/Client');

module.exports = {
  name: 'alert',
  description: 'Get alerts related to comfi from developer',
  ownerOnly: false,
  directory: '',
  userperm: [''],
  botperm: [''],
  /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
  run: async (bot, interaction, args) => {
    try {
      const client = await clients.findOne({ clientId: bot.user.id });

      if (client.news_read === false) {
        //TODO: Add embed color
        //TODO: Check for last updated not news_read
        const embed = new EmbedBuilder()
          .setTitle('Comfi™ Updates')
          .setDescription(client.news)
          .setFooter({ text: `Last Updated at ${client.news_lastUpdated}` });

        await clients.findOneAndUpdate({ clientId: bot.user.id }, {
          news_read: true,
        });

        await interaction.editReply({ embeds: [embed] });
      } else {
        return await bot.errorEmbed(bot, interaction, 'No new alert from Developer yet');
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
