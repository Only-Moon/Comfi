const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'rewards',
  description: 'Claim weekly or daily reward',
  ownerOnly: false,
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Claim daily money',
      name: 'daily',
    },
    {
      name: 'weekly',
      description: 'Claim weekly rewards',
      type: ApplicationCommandOptionType.Subcommand,
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
    const [sub] = args;
    if (sub === 'daily') {
      const data = await bot.eco.Daily({ UserID: interaction.user.id });

      if (data.status === 'error') {
        const embed = new EmbedBuilder()
          .setTitle(data.value)
          .setDescription(data.description)
          .setFooter({ text: 'Comfi™ Economy System' })
          .setColor(bot.color)
          .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
      } else if (data.status === 'success') {
        const embed = new EmbedBuilder()
          .setTitle(data.value)
          .setDescription(data.description)
          .setFooter({ text: 'Comfi™ Economy System' })
          .setColor(bot.color)
          .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
      }
    }
    if (sub === 'weekly') {
      const data = await bot.eco.Weekly({ UserID: interaction.user.id });

      if (data.status === 'error') {
        const embed = new EmbedBuilder()
          .setTitle(data.value)
          .setDescription(data.description)
          .setFooter({ text: 'Comfi™ Economy System' })
          .setColor(bot.color)
          .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
      } else if (data.status === 'success') {
        const embed = new EmbedBuilder()
          .setTitle(data.value)
          .setDescription(data.description)
          .setFooter({ text: 'Comfi™ Economy System' })
          .setColor(bot.color)
          .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
      }
    }
  },
};
