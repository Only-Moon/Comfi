const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'work',
  description: 'Work to earn money',
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
    //TODO: Fix work throwing timeout  as 1958 days when working but fine with timeout
    const data = await bot.eco.Work({ UserID: interaction.user.id });
    const embed = new EmbedBuilder();
    if (data.status === 'error') {
      embed.setTitle(data.value);
      embed.setDescription(data.description);
      embed.setColor(bot.color);
      embed.setFooter({ text: 'Comfi™ Economy System' });
      await interaction.editReply({ embeds: [embed] });
    } else if (data.status === 'success') {
      embed.setTitle(data.value);
      embed.setDescription(data.description);
      embed.setColor(bot.color);
      embed.setFooter({ text: 'Comfi™ Economy System' });
      await interaction.editReply({ embeds: [embed] });
    }
  },
};
