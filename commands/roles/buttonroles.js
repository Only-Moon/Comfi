/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/
const { ApplicationCommandOptionType, ChannelType, ButtonStyle } = require('discord.js');
const simplydjs = require('simply-djs');

module.exports = {
  name: 'buttonrole',
  description: 'Reaction Roles With Buttons',
  directory: 'role',
  ownerOnly: false,
  options: [
    {
      name: 'add',
      description: 'Add Reaction Role to Bot msg only',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'channel',
          type: ApplicationCommandOptionType.Channel,
          description: 'channel of that message',
          required: true,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'messageid',
          type: ApplicationCommandOptionType.String,
          description: 'the message id',
          required: true,
        },
        {
          name: 'role',
          type: ApplicationCommandOptionType.Role,
          description: 'Role to Add',
          required: true,
        },
        {
          name: 'label',
          type: ApplicationCommandOptionType.String,
          description: 'name of the button ?',
          required: false,
        },
        {
          name: 'style',
          type: ApplicationCommandOptionType.String,
          description: 'color of the button',
          required: false,
          choices: [
            {
              name: 'Blue',
              value: `${ButtonStyle.Primary}`,
            },
            {
              name: 'Grey',
              value: `${ButtonStyle.Secondary}`,
            },
            {
              name: 'Green',
              value: `${ButtonStyle.Success}`,
            },
            {
              name: 'Red',
              value: `${ButtonStyle.Danger}`,
            },
          ],
        },
        {
          name: 'emoji',
          type: ApplicationCommandOptionType.String,
          description: 'emoji for the button',
          required: false,
        },
      ],
    },
    {
      name: 'remove',
      description: 'Removes roles from a bot message',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'channel',
          type: ApplicationCommandOptionType.Channel,
          description: 'channel of that message',
          required: true,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'messageid',
          type: ApplicationCommandOptionType.String,
          description: 'the message id',
          required: true,
        },
        {
          name: 'role',
          type: ApplicationCommandOptionType.Role,
          description: 'Role to remove',
          required: true,
        },
      ],
    },
  ],
  userperm: ['MANAGE_GUILD'],
  botperm: ['MANAGE_GUILD'],
  run: async (bot, interaction, args) => {
    const [options] = args;

    try {
      if (options === 'add') {
        simplydjs.betterBtnRole(interaction, {
          type: 'add',
          channel,
          buttons,

        });
      }

      if (options === 'remove') {
        simplydjs.betterBtnRole(interaction, {
          type: 'remove',
        });
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
