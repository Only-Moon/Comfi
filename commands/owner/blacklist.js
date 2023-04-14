/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const {
  CommandInteraction,
  ActionRowBuilder,
  SelectMenuBuilder,
  EmbedBuilder,
  ApplicationCommandOptionType,
} = require('discord.js');
const clients = require('../../models/Client');

module.exports = {
  name: 'blacklist',
  description: 'manage a member to prevent using bot',
  ownerOnly: true,
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'user to blacklist',
      name: 'add-user',
      options: [
        {
          name: 'user',
          type: ApplicationCommandOptionType.User,
          description: 'user to add to blacklist',
          required: true,
        },
        {
          name: 'reason',
          type: ApplicationCommandOptionType.String,
          description: 'Reason for blacklisting user',
          required: false,
        },
      ],
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'user to remove from blacklist',
      name: 'remove-user',
      options: [
        {
          name: 'user',
          type: ApplicationCommandOptionType.User,
          description: 'user to blacklist',
          required: true,
        },
      ],
    },
    {
      name: 'panel',
      description: 'panel of blacklisted users',
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Add a guild to blacklist',
      name: 'add-guild',
      options: [
        {
          name: 'guild',
          type: ApplicationCommandOptionType.String,
          description: 'guild to add to blacklist',
          required: true,
        },
      ],
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'remove a guild from blacklist',
      name: 'remove-guild',
      options: [
        {
          name: 'guild',
          type: ApplicationCommandOptionType.String,
          description: 'guild to blacklist',
          required: true,
        },
      ],
    },
  ],
  userperm: [''],
  botperm: [''],
  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

  run: async (bot, interaction, args) => {
    const [choice] = args;
    const user = interaction.options.getUser('user');
    const guild = interaction.options.getString('guild');
    const reason = interaction.options.getString('reason');

    const client = await clients.findOne({ clientId: bot.user.id });
    try {
      if (choice === 'add-user') {
        const member = bot.users.cache.get(user.id);
        if (!client.blackListedUsers.includes(member.id)) {
          client.blackListedUsers.push(member.id);

          await client.save();
          return await bot.successEmbed(bot, interaction, 'Successfully added member to the blacklist database.');
        }
        return await bot.errorEmbed(bot, interaction, 'Target member is already blacklis in database.');
      } if (choice === 'remove-user') {
        const member = bot.users.cache.get(user.id);
        if (client.blackListedUsers.includes(member.id)) {
          const index = client.blackListedUsers.indexOf(member);

          if (index > -1) {
            client.blackListedUsers.splice(index, 1);
          }
          await client.save();
          return await bot.successEmbed(bot, interaction, 'Successfully removed member from the blacklist database.');
        }
        return await bot.errorEmbed(bot, interaction, 'Target member is not in blacklist database.');
      } if (choice === 'panel') {
        if (!client?.blackListedUsers.length) {
          return await bot.errorEmbed(bot, interaction, 'There is no blacklisted member in this server!');
        }
        const options = client?.blackListedUsers.forEach(async (b) => {
          let mem;
          mem = await bot.users.fetch(b);

          const opt = {
            label: mem ? mem.username : 'No members',
            value: mem ? mem.id : 'No members id',
            description: reason || 'No description',
          };

          const embeds = [

            new EmbedBuilder().setTitle('Please select a member below').setColor(bot.color),
          ];
          const components = [
            new ActionRowBuilder().addComponents(
              new SelectMenuBuilder()
                .setCustomId('b-panel')
                .setMaxValues(1)
                .addOptions(opt),
            ),
          ];

          await interaction.editReply({ embeds, components });
        });
      } else if (choice === 'add-guild') {
        if (bot.guilds.cache.get(guild)) {
          if (!client?.blackListedServers.includes(guild)) {
            client?.blackListedServers.push(guild);
            await client.save();
            return await bot.successEmbed(bot, interaction, 'Successfully added guild to the blacklist database.');
          }
          return await bot.errorEmbed(bot, interaction, 'Target guild is already blacklis in database.');
        } return await bot.errorEmbed(bot, interaction, 'Invalid Guild');
      } else if (choice === 'remove-guild') {
        if (interaction.guilds.cache.get(guild)) {
          if (client?.blackListedServers.includes(guild)) {
            const index = client?.blackListedServers.indexOf(guild);

            if (index > -1) {
              client?.blackListedServers.splice(index, 1);
            }
            await client.save();
            return await bot.successEmbed(bot, interaction, 'Successfully removed guild from the blacklist database.');
          }
          return await bot.errorEmbed(bot, interaction, 'Target guild is not in blacklist database.');
        } return await bot.errorEmbed(bot, interaction, 'Invalid Guild');
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
