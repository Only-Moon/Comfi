const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'inventory',
  description: 'Check items in your inventory',
  ownerOnly: false,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      description: 'user to check inventory',
      name: 'user',
      required: false,
    },
  ],
  directory: 'economy',
  userperm: [''],
  botperm: [''],
  /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
  run: async (bot, interaction, args) => {
    const user = interaction.options.getUser('user');
    const data = await bot.eco.GetInv({ UserID: user ? user.id : interaction.user.id });
    const embed = new EmbedBuilder();

    if (data.status === 'error') {
      embed.setTitle(data.value);
      embed.setDescription(data.description);
      embed.setColor(bot.color);
      embed.setFooter({ text: 'Comfi™ Economy System' });
      await interaction.editReply({ embeds: [embed] });
    } else if (data.status === 'success') {
      embed.setTitle(data.description);
      data.value.forEach((item) => {
        embed.addFields({ name: `${item.Name}: ${item.Quantity}`, value: `Price: ${bot.eco.currency} ${item.Price}\nSell Price: ${bot.eco.currency} ${item.Sell}\nType: ${item.Type}\nUse: ${item.Use}\nID: ${item.id}`, inline: true });
      });
      embed.setColor(bot.color);
      embed.setFooter({ text: 'Comfi™ Economy System' });
      await interaction.editReply({ embeds: [embed] });
    }
  },
};
