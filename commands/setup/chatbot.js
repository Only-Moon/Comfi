/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, ChannelType, ApplicationCommandOptionType } = require('discord.js');
const guilds = require('../../models/guild');

module.exports = {
  name: 'chatbot',
  description: 'Sets the chatbot system',
  directory: 'setting',
  ownerOnly: false,
  options: [{
    type: ApplicationCommandOptionType.Subcommand,
    description: 'Sets the chatbot toggle true/false',
    name: 'toggle',
    options: [{
      type: ApplicationCommandOptionType.String,
      description: 'Toggle chatbot',
      name: 'option',
      required: true,
      choices: [
        {
          name: 'true/on',
          value: 'true',
        },
        {
          name: 'false/off',
          value: 'false',
        },
      ],
    },
    ],
  },
  {
    type: ApplicationCommandOptionType.Subcommand,
    description: 'Sets the channel for chatbot',
    name: 'channel',
    options: [
      {
        type: ApplicationCommandOptionType.Channel,
        description: 'Channel for Chatbot',
        name: 'name',
        required: true,
        channelTypes: [ChannelType.GuildText],
      },
    ],
  },
  {
    type: ApplicationCommandOptionType.Subcommand,
    description: 'Disables the chatbot system',
    name: 'disable',
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
    const [option] = args;

    const guild = await guilds.findOne({ guildId: interaction.guild.id });

    try {
      if (option === 'toggle') {
        const toggle = interaction.options.getString('option');

        if (guild.chatbot.toString() === toggle) {
          return await bot.errorEmbed(bot, interaction, `**Chatbot toggle for this guild is set as ${toggle}`);
        }

        await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
          chatbot: toggle,
        });
        return await bot.successEmbed(bot, interaction, `The Chatbot for **${
          interaction.guild.name
        }** has been set to: **${toggle}**`);
      }
      if (option === 'channel') {
        const channel = interaction.options.getChannel('name');
        if (!channel) return await bot.errorEmbed(bot, interaction, '**Specify the channel**');

        if (guild.chat_channel === channel) {
          return await bot.errorEmbed(bot, interaction, `**Chatnot channel is already setted as ${channel}**`);
        }

        await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
          chat_channel: channel,
        });
        return await bot.successEmbed(bot, interaction, `**The chatbot channel has been set to** ${channel.toString()}`);
      }

      if (option === 'disable') {
        if (!guild.chatbot) {
          return await bot.errorEmbed(bot, interaction, '**Please set the required fields first or i cant disable it!**');
        }
        await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
          chatbot: false,
          chat_channel: 'NONE',
        });
        return await bot.successEmbed(bot, interaction, '**Disabled the Chatbot System in the server :)**');
      }
    } catch {
      await bot.senderror(interaction, e);
    }
  },
};
