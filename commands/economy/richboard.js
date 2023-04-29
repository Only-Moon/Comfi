const {
  CommandInteraction, EmbedBuilder, ApplicationCommandOptionType, GuildMember,
} = require('discord.js');

module.exports = {
  name: 'richboard',
  description: "Check rich people in Comfi's economy system",
  ownerOnly: false,
  directory: 'economy',
  userperm: [''],
  botperm: [''],
  /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
  run: async (bot, interaction, args) => {
    const embed = new EmbedBuilder();
    let data = await bot.eco.GetRich({});

    if (data.status === 'error') {
      embed.setTitle(data.value);
      embed.setDescription(data.description);
      embed.setColor(bot.color);
      embed.setFooter({ text: 'Comfi™ Economy System' });
      await interaction.editReply({ embeds: [embed] });
    } else if (data.status === 'success') {
      const rep = bot.emoji('reply');
      const dot = bot.emoji('bunny_cs');
      const one = bot.emoji('_1_HE');
      const two = bot.emoji('_2_HE');
      const three = bot.emoji('_3_HE');
      let pages;

      data = data.value.sort((a, b) => (b.value?.wallet + b.value?.bank) - (a.value?.wallet + a.value?.bank)).map((value, i) => {
        const top10 = [];
        let pos = 1;

        const mem = interaction.guild.members.members.cache.find((x) => x.id === value.userID);

        const emojis = [`${one}`, `${two}`, `${three}`];
        if (mem instanceof GuildMember) {
          top10.push(`**${emojis[i] || dot} #${pos++})** \`\`\`${mem?.user.username}\`\`\` \n${rep}**Net Worth** \`\`\`${value.wallet + value.bank}\`\`\``);
        }
        return top10;
      });

      const embed = new EmbedBuilder()
        .setAuthor({ name: 'Comfi™ Economy leaderboard! (Top 10)', iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(data.slice(0, 10).join('\n'))
        .setFooter({ text: `Requested by ${interaction.member.displayName}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
        .setColor(bot.color);

      return await interaction.editReply({ embeds: [embed] });
    }
  },
};
