/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const {
  CommandInteraction, EmbedBuilder, ApplicationCommandOptionType, ChannelType,
} = require('discord.js');

module.exports = {
  name: 'vc-move',
  description: 'moves a member from one vc to another',
  directory: 'mod',
  ownerOnly: false,
  options: [
    {
      type: ApplicationCommandOptionType.User,
      description: 'User to move',
      name: 'user',
      required: true,
    },
    {
      type: ApplicationCommandOptionType.Channel,
      description: 'channel to move user to',
      name: 'channel',
      required: true,
      channelTypes: [ChannelType.GuildVoice],
    },
  ],
  userperm: ['MoveMembers'],
  botperm: ['MoveMembers'],
  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    const member =			interaction.options.getMember('user')
			|| interaction.guild.members.cache.get(args[0])
			|| interaction.guild.members.cache.find(
			  (r) => r.user.username.toLowerCase() === args[0].toLocaleLowerCase(),
			);

    if (!member) {
      return await bot.errorEmbed(bot, interaction, 'Unable to find the mentioned user in this guild.');
    }

    const channel =			interaction.options.getChannel('channel')
			|| bot.guilds.cache.get(interaction.guild.id).channels.cache.get(args[1])
			|| interaction.guild.channels.cache.find(
			  (c) => c.name.toLowerCase()
					=== args
					  .slice(1)
					  .join(' ')
					  .toLocaleLowerCase(),
			);
    if (channel.type !== ChannelType.GuildVoice) {
      return await bot.errorEmbed(bot, interaction, 'Unable to locate the voice channel. Make sure to mention a voice channel not a text channel!');
    }

    try {
      await member.setChannel(channel);
      return await bot.successEmbed(bot, interaction, `Moved ${member.user.username} to <#${channel.id}> !`);
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
