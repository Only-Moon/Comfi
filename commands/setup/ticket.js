/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const simplydjs = require('simply-djs');
const { CommandInteraction, ApplicationCommandOptionType, ChannelType, ButtonStyle } = require('discord.js');
const guilds = require('../../models/guild');

module.exports = {
  name: 'ticket',
  description: 'Setup the ticket system',
  directory: 'setting',
  ownerOnly: false,
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Sets the category for ticket system',
      name: 'category',
      options: [
        {
          type: ApplicationCommandOptionType.Channel,
          description: 'Category id to open tickets',
          channelTypes: [ChannelType.GuildCategory],
          name: 'id',
          required: true,
        },
      ],
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Sets the name for ticket channel (eg: support-{username}/staff-app-{username}).',
      name: 'name',
      options: [
        {
          type: ApplicationCommandOptionType.String,
          description: 'give to use',
          name: 'name',
          required: false,
        },
      ],
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Sets the support role for ticket system',
      name: 'role',
      options: [
        {
          type: ApplicationCommandOptionType.Role,
          description: 'Support role for tickets',
          name: 'role',
          required: true,
        },
      ],
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Sends the ticket panel',
      name: 'display',
      options: [
        {
          type: ApplicationCommandOptionType.String,
          description: 'Subject of the ticket',
          name: 'subject',
          required: false,
        },
      ],
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Disables ticket system',
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
  run: async (bot, interaction, args, message) => {
    const [option] = args;

    const guild = await guilds.findOne({ guildId: interaction.guild.id });
    try {
      if (option === 'category') {
        const Channel = interaction.options.getChannel('id') || interaction.guild.channels.cache.get(args[0]);

        if (guild.ticket_category === Channel.id) {
          return await bot.errorEmbed(bot, interaction, `**Ticket Category is already set as ${Channel.id} !**`);
        }
        await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
          ticket: true,
          ticket_category: Channel.id,
        });

        return await bot.successEmbed(bot, interaction, `**The Ticket Category has been set to**${Channel.toString()}`);
      }

      if (option === 'name') {
        const name = interaction.options.getString('name') || "{username}";

        if (guild.ticket_name === name) {
          return await bot.errorEmbed(bot, interaction, `**Ticket Channel Name is already set as ${name} !**`);
        }
        await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
          ticket: true,
          ticket_name: name,
        });

        return await bot.successEmbed(bot, interaction, `**The Ticket Channel Name has been set to **${name}`);
      }

      if (option === 'role') {
        const role = interaction.options.getRole('role')
          || bot.guilds.cache.get(interaction.guild.id).roles.cache.get(args[0])
          || interaction.guild.roles.cache.find(
            (c) => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase(),
          );

        if (!role) return await bot.errorEmbed(bot, interaction, '**Please Enter A Valid Role Name or ID!**');

        if (guild.ticket_role === role.id) {
          return await bot.errorEmbed(bot, interaction, `**Ticket Support Role is already set as ${role} !**`);
        }

        await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
          ticket_role: role.id,
        });

        return await bot.successEmbed(bot, interaction, `**\`${role.name}\` Has Been Set Successfully As Supportrole!**`);
      }

      if (option === 'display') {
        const desc = interaction.options.getString('subject') || 'Create a new Ticket By Clicking Below';

        simplydjs.ticketSetup(interaction, {
          channelId: interaction.channel.id,
          embed: {
            description: desc,
            color: bot.color,
            footer: { text: `${interaction.guild.name.toLocaleUpperCase()}'s Ticket System` },
          },
          button: { style: ButtonStyle.Secondary, emoji: '855791964975530004' },
        });
      }

      if (option === 'disable') {
        if (!guild.ticket) return await bot.errorEmbed(bot, interaction, 'Ticket System is already disabled');

        await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
          ticket: false,
        });
        return await bot.successEmbed(bot, interaction, 'Disabled Ticket System for this guild');
      }
    } catch {
      await bot.senderror(interaction, e);
    }
  },
};
