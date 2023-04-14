/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, ApplicationCommandOptionType, ChannelType } = require('discord.js');
const guilds = require('../../models/guild');

module.exports = {
  name: 'logging',
  description: 'Setup logging system!',
  ownerOnly: false,
  directory: 'setting',
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: 'enable',
      description: 'Sets channel for logs',
      options: [
        {
          type: ApplicationCommandOptionType.Channel,
          description: 'logs channel',
          name: 'name',
          required: true,
          channelTypes: [ChannelType.GuildText],
        },
      ],
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: 'disable',
      description: 'Disables the logging system',
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

    const finalData = {
      value: undefined,
      channel: undefined,
    };
    try {
      if (subcommand === 'enable') {
        const channel = interaction.options.getChannel('name');

        if (channel === ChannelType.GuildVoice) {
          return await bot.errorEmbed(bot, interaction, '**Please Mention a Text Channel To Set!**');
        }
        finalData.channel = channel.id;
        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            logging: true,
            logging_channel: finalData.channel,
          },
        );
        interaction.editReply(
          `${bot.tick} **Logging Channel Has Been Set Successfully as \`${
            channel.name
          }\`!**`,
        );
      }

      if (subcommand === 'disable') {
        const channel = interaction.guild.channels.cache.get(
          guild.logging_channel,
        );
        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            log: false,
          },
        );

        return await bot.successEmbed(bot, interaction, `**Logging System Has Been Successfully Disabled in \`${
          channel.name
        }\`**`);
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
