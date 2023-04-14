/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, ApplicationCommandOptionType } = require('discord.js');
const guilds = require('../../models/guild');

module.exports = {
  name: 'test',
  description: 'Test boost, leave or welcome message',
  ownerOnly: false,
  directory: 'setting',
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Test Boost Detector System',
      name: 'boost',
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Test Leave System',
      name: 'leave',
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Test Welcome System',
      name: 'welcome',
    },
  ],
  userperm: ['ManageGuild'],
  botperm: ['ManageGuild'],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {
    const guild = await guilds.findOne({
      guildId: interaction.guild.id,
    });

    const [sub] = args;
    try {
      if (sub === 'boost') {
        if (guild.boost) {
          bot.emit('guildMemberUpdate', interaction.member);
          return await bot.successEmbed(bot, interaction, `Tested Boost Detector System. Check <#${guilD.boost_channel}>`);
        }
        return await bot.errorEmbed(bot, interaction, 'Boost Detector is Disabled');
      }

      if (sub === 'leave') {
        if (guild.leave) {
          bot.emit('guildMemberLeave', interaction.member);
          return await bot.successEmbed(bot, interaction, `Tested leave system. Check <#${guild.leave_channel}>`);
        }
        return await bot.errorEmbed(bot, interaction, 'Leave System is Disabled ');
      }

      if (sub === 'welcome') {
        if (guild.welcome) {
          bot.emit('guildMemberAdd', interaction.member);
          return await bot.successEmbed(bot, interaction, `Tested Welcome System. Check <#${guild.welcome_channel}>`);
        }
        return await bot.errorEmbed(bot, interaction, 'Welcome System is Disabled ');
      }
    } catch {
      await bot.senderror(interaction, e);
    }
  },
};
