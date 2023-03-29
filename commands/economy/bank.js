const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'bank',
  description: 'Commands related to bank',
  ownerOnly: false,
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Check Bank as well as Wallet balance',
      name: 'bal',
      options: [
        {
          name: 'user',
          description: 'User to check bal',
          type: ApplicationCommandOptionType.User,
          required: false,
        },
      ],
    },
    {
      name: 'deposit',
      description: "Deposit wallet's money into bank",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'amount',
          description: 'amount to money (like 100/1k/max) to deposit into bank',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: 'transfer',
      description: 'transfer money from your bank to someone',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user',
          description: 'user to transfer money',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'amount',
          description: 'amount to transfer',
          type: ApplicationCommandOptionType.Number,
          required: true,
        },
      ],
    },
    {
      name: 'withdraw',
      description: 'Withdraw money from bank',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'amount',
          description: 'amount to money like (100/1k/max) to withdraw from bank',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
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
    let data; let
      data1;
    const { user } = interaction;
    const user1 = interaction.options.getUser('user');
    const amount = interaction.options.getString('amount');
    const embed = new EmbedBuilder();
    const { currency } = bot.eco; // bot.emoji("currencyy_Blossomii")

    if (sub === 'bal') {
      data = await bot.eco.GetBal({ UserID: user.id });
      data1 = await bot.eco.GetBankBal({ UserID: user1 ? user1.id : user.id });
      await bot.eco.GetUser({ UserID: user1 ? user1.id : user.id });
      if (data.status === 'success' && data1.status === 'success') {
        const embed = new EmbedBuilder()
          .setAuthor({ name: `Balance of ${user1 ? user1.tag : user.tag}`, iconURL: (user1 || user).avatarURL({ dynamic: true }) })
          .setColor(bot.color)
          .setDescription(`${data.description} ${data.value}\n${data1.description} ${data1.value}\nTotal Bal: ${currency}${data.value + data1.value}`)
          .setFooter({ text: 'Comfi™ Economy System' });

        await interaction.editReply({ embeds: [embed] });
      }
    }

    if (sub === 'deposit') {
      data = await bot.eco.Deposit({ UserID: user.id, Amt: amount });

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

    if (sub === 'withdraw') {
      data = await bot.eco.Withdraw({ UserID: user.id, Amt: amount });

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

    if (sub === 'transfer') {
      data = await bot.eco.Transfer({ User1ID: user.id, User2ID: user1.id, Amt: amount });

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
  },
};
