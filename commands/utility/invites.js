/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const {
  CommandInteraction,
  EmbedBuilder, ApplicationCommandOptionType,
} = require('discord.js');

module.exports = {
  name: 'invites',
  description: 'Get the number of people that joined via your invites',
  ownerOnly: false,
  directory: 'utility',
  options: [
    {
      name: 'user',
      type: ApplicationCommandOptionType.User,
      description: 'tag to see their invs',
      required: false,
    },
  ],
  userperm: [''],
  botperm: ['SEND_MESSAGES'],
  /**
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    try {
      const user = interaction.guild.members.cache.get(args[0]) || interaction.member;

      const invites = await interaction.guild.invites.fetch();
      const userInv = invites.filter((u) => u.inviter && u.inviter.id === user.id);

      if (userInv.size <= 0) {
        return await bot.errorEmbed(bot, interaction, `${user} has \`0\` invites `);
      }

      const invCodes = userInv.map((x) => x.code).join('\n');
      let i = 0;
      userInv.forEach((inv) => (i += inv.uses));

      const tackerEmbed = new EmbedBuilder()
        .setDescription(`**_Invites  of :_** ${user} `)
        .addFields(
          { name: 'User Invites', value: `${i}`, inline: true },
          { name: 'Invite Codes:', value: `${invCodes}`, inline: true },
        )
        .setColor(bot.color);

      await interaction.followUp({ embeds: [tackerEmbed] });
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
