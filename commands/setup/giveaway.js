/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, ApplicationCommandOptionType, ChannelType } = require('discord.js');
const simplydjs = require('simply-djs');

module.exports = {
  name: 'giveaway',
  description: 'Setups a giveaway in the server',
  ownerOnly: false,
  directory: 'setting',
  options: [
    {
      name: 'time',
      type: ApplicationCommandOptionType.String,
      description: 'Time when to finish the giveaway',
      required: true,
    },
    {
      name: 'winners',
      type: ApplicationCommandOptionType.Number,
      description: 'Number of Winners for the giveaway',
      required: true,
    },
    {
      name: 'prize',
      type: ApplicationCommandOptionType.String,
      description: 'Prize given to the giveaway winner',
      required: true,
    },
    {
      name: 'req-type',
      type: ApplicationCommandOptionType.String,
      description: "Type of requirements for giveaway aka 'Role', 'Guild', 'None'",
      required: true,
      choices: [
        {
          name: 'Guild',
          value: 'Guild',
        },
        {
          name: 'Role',
          value: 'Role',
        },
        {
          name: 'None',
          value: 'None',
        },
      ],
    },
    {
      name: 'req-id',
      type: ApplicationCommandOptionType.String,
      description: 'role id or guild id for role or guild requirements',
      required: false,
    },
    {
      name: 'channel',
      type: ApplicationCommandOptionType.Channel,
      description: 'Channel to start the giveaway',
      required: false,
      channelTypes: [ChannelType.GuildText],
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
    try {
      const channel = interaction.options.getChannel('channel');
      const type = interaction.options.getString('req-type');
      const id = interaction.options.getString('req-id');
      const time = interaction.options.getString('time');
      const prize = interaction.options.getString('prize');
      const winner = interaction.options.getNumber('winners');

      simplydjs.giveawaySystem(bot, interaction, {
        time,
        winners: winner,
        prize,
        channel,
        embed: {
          title: 'Giveaway',
          color: bot.color,
          credit: false,
          footer: { text: 'Comfi™ Giveaway System' },
        },
        req: {
          type,
          id,
        },
      });
    } catch {
      await bot.senderror(interaction, e);
    }
  },
};
