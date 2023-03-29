/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const {
  CommandInteraction, EmbedBuilder,
  ApplicationCommandOptionType,
} = require('discord.js');
const guilds = require('../../models/guild');

module.exports = {
  name: 'kick',
  description: 'Kick Someone',
  directory: 'mod',
  options: [
    {
      name: 'user',
      description: 'User To Kick',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'reason',
      description: 'Reason To Kick',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  userperm: ['KickMembers'],
  botperm: ['KickMembers'],
  /**
	 *
	 * @param {Interaction} interaction
	 */
  run: async (bot, interaction, args) => {
    try {
      // NOW lets get the user from options
      const options = interaction.options._hoistedOptions;

      const user = interaction.options.getMember('user');
      const reason =				options.find((e) => e.name === 'reason')
				|| `Kicked by ${interaction.member.displayName}`;

      const kickMember = interaction.guild.members.cache.get(args[0]) || user;

      const userRank = kickMember.roles.highest.rawPosition;
      const memberRank = interaction.member.roles.highest.rawPosition;

      if (!kickMember) return await bot.errorEmbed(bot, interaction, '**User Is Not In The Guild!**');

      if (kickMember === interaction.member) {
        return await bot.errorEmbed(bot, interaction, '**You Cannot Kick Yourself!**');
      }
      if (userRank >= memberRank) {
        return await bot.errorEmbed(bot, interaction, '**You can\'t kick this member due to your role being lower than that member role.**');
      }

      if (kickMember.kickable) {
        const sembed2 = new EmbedBuilder()
          .setColor(bot.color)
          .setDescription(
            `**You Have Been Kicked From ${
              interaction.guild.name
            } for - ${reason || 'No Reason!'}**`,
          )
          .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
        await kickMember.send({ embeds: [sembed2] }).catch(() => null);
        kickMember.kick();
      } else {
        return await bot.errorEmbed(bot, interaction, '**I can\'t kick this user make sure that the users role is lower than my role.**');
      }
      if (reason) {
        return await bot.successEmbed(bot, interaction, `**${kickMember.user.username}** has been kicked for ${reason}`);
      }
      return await bot.successEmbed(bot, interaction, `**${kickMember.user.username}** has been kicked`);

      await bot.modlog({
        Member: kickMember,
        Action: 'kick',
        Reason: reason.length < 1 ? 'No reason supplied.' : reason,
      }, interaction);
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
