/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, ApplicationCommandOptionType, ChannelType } = require('discord.js');
const guilds = require('../../models/guild');

module.exports = {
  name: 'suggestion',
  description: 'Sets Suggestion Server for the Server',
  ownerOnly: false,
  directory: 'setting',
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: 'enable',
      description: 'Sets channel Suggestions',
      options: [
        {
          type: ApplicationCommandOptionType.Channel,
          description: 'channel for suggestion',
          name: 'channel',
          required: true,
          channelTypes: [ChannelType.GuildText],
        },
      ],
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: 'disable',
      description: 'Disables the suggestion channel',
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
    const [subcommand] = args;

    const guild = await guilds.findOne({ guildId: interaction.guild.id });

    try {
      if (subcommand === 'enable') {
        const Channel = interaction.options.getChannel('channel') || interaction.guild.channels.cache.get(args[0]);

        if (!Channel) return await bot.errorEmbed(bot, interaction, '**Please Mention A Channel !**');

        if (guild.suggestions_channel === Channel.id) {
          return await bot.errorEmbed(bot, interaction, `**Suggestion Channel is already set as ${Channel} !**`);
        }
        await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
          suggestions: true,
          suggestions_channel: Channel.id,
        });

        return await bot.successEmbed(bot, interaction, `**Suggestion Channel is setted as <#${Channel.id}> !**`);
      }
      if (subcommand === 'disable') {
        await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
          suggestions: false,
        });
        return await bot.successEmbed(bot, interaction, '**Successfully Removed Suggestion Channel !**');
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
