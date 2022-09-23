/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, ApplicationCommandOptionType, ChannelType } = require('discord.js');

module.exports = {
  name: 'lockk',
  description: 'Locks and Unlocks a channel',
  directory: 'mod',
  ownerOnly: false,
  userperm: ['ManageChannels'],
  botperm: ['ManageChannels'],
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Lock a channel to prevent raid',
      name: 'enable',
      options: [
        {
          type: ApplicationCommandOptionType.Channel,
          description: 'Channel to lock',
          name: 'channel',
          required: false,
          channelTypes: [ChannelType.GuildText, ChannelType.GuildVoice],
        },
      ],
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Unlocks a channel',
      name: 'disable',
      options: [
        {
          type: ApplicationCommandOptionType.Channel,
          description: 'Channel to Unlock',
          name: 'channel',
          channelTypes: [ChannelType.GuildText, ChannelType.GuildVoice],
          required: false,
        },
      ],
    },
  ],
  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    const channel = interaction.channel || interaction.options.getUser('channel');

    const [sub] = args;

    if (sub === 'enable') {
      try {
        setTimeout(async () => {
          interaction.guild.roles.cache.forEach(async (role) => {
            await channel.permissionOverwrites.create(role, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
            });
          });
          return await bot.successEmbed(bot, interaction, `**Successfully Locked ${channel}**`);
        }, 20000);
      } catch (e) {
        await bot.senderror(interaction, e);
      }
    }

    if (sub === 'disable') {
      try {
        setTimeout(async () => {
          interaction.guild.roles.cache.forEach(async (role) => {
            await channel.permissionOverwrites.create(role, {
              SEND_MESSAGES: true,
              ADD_REACTIONS: true,
            });
          });

          return await bot.successEmbed(bot, interaction, `**Successfully Unlocked ${channel}**`);
        }, 20000);
      } catch (e) {
        await bot.senderror(interaction, e);
      }
    }
  },
};
