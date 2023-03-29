const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'job',
  description: 'Commands related to job',
  ownerOnly: false,
  options: [
    {
      name: 'apply',
      type: ApplicationCommandOptionType.Subcommand,
      description: 'apply for a job',
      options: [
        {
          name: 'job',
          type: ApplicationCommandOptionType.String,
          description: 'name of the job to apply',
          required: true,
          autocomplete: true,
        },
      ],
    },
    {
      name: 'reapply',
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Reapply to change your job',
      options: [
        {
          name: 'job',
          type: ApplicationCommandOptionType.String,
          description: 'name of the job to re apply for ',
          required: true,
          autocomplete: true,
        },
      ],
    },
    {
      name: 'leave',
      type: ApplicationCommandOptionType.Subcommand,
      description: 'leave your current job',
    },
    {
      name: 'list',
      type: ApplicationCommandOptionType.Subcommand,
      description: 'List of jobs Comfi Offer',
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
    const embed = new EmbedBuilder();
    const job = interaction.options.getString('job');

    if (sub === 'apply') {
      data = await bot.eco.SetJob({ UserID: interaction.user.id, Job: job });

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
      } else if (data.status === 'error2') {
        embed.setTitle(data.description);
        data.value.forEach((item) => {
          embed.addFields({ name: `${item.Name}`, value: `Salary: ${item.Salary}`, inline: true });
        });
        embed.setColor(bot.color);
        embed.setFooter({ text: 'Comfi™ Economy System' });
        await interaction.editReply({ embeds: [embed] });
      }
    }

    if (sub === 'leave') {
      data = await bot.eco.RemoveJob({ UserID: interaction.user.id });

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
    }

    if (sub === 'list') {
      data = await bot.eco.SetJob({ UserID: interaction.user.id, Job: 'none' });

      if (data.status === 'error2') {
        const list = [];
        embed.setTitle(data.description);
        data.value.forEach((item) => {
          list.push({ name: `${item.Name}`, value: `Salary: ${item.Salary}`, inline: true });
        });

        embed.addFields(list);
        embed.setColor(bot.color);
        embed.setFooter({ text: 'Comfi™ Economy System' });
        await interaction.editReply({ embeds: [embed] });
      }
    }

    if (sub === 'reapply') {
      data = await bot.eco.ReassignJob({ UserID: interaction.user.id, Job: job });

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
      } else if (data.status === 'error2') {
        embed.setTitle(data.description);
        data.value.forEach((item) => {
          embed.addFields({ name: `${item.Name}`, value: `Salary: ${item.Salary}`, inline: true });
        });
        embed.setColor(bot.color);
        embed.setFooter({ text: 'Comfi™ Economy System' });
        await interaction.editReply({ embeds: [embed] });
      }
    }
  },
};
