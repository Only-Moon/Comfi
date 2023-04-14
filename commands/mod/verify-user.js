/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const guilds = require('../../models/guild');

module.exports = {
  name: 'verify-user',
  description: 'Force verify a user / bot!',
  directory: 'mod',
  ownerOnly: false,
  options: [
    {
      name: 'user',
      type: ApplicationCommandOptionType.User,
      description: 'user/bot to verify',
      required: true,
    },
  ],
  botperm: ['ManageGuild'],
  userperm: ['ManageGuild'],
  /**
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {
    try {
      const guild = await guilds.findOne({ guildId: interaction.guild.id });
      if (guild.verification) {
        const member = interaction.options.getMember('user');

        await member.roles.add(guild.verification_role);
        return await bot.successEmbed(bot, interaction, `${member} has been verified!`);
      }
      return await bot.errorEmbed(bot, interaction, 'Please setup verification by doing /verification before using this command!');
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
