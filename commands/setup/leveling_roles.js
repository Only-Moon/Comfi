/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const guilds = require('../../models/guild');

module.exports = {
  name: 'levelingrole',
  description: 'Auto role upon leveling',
  ownerOnly: false,
  directory: 'setting',
  options: [
    {
      name: 'add',
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Add a role upon leveling',
      options: [
        {
          name: 'role',
          type: ApplicationCommandOptionType.Role,
          description: 'Role to add upon leveling up',
          required: true,
        },
        {
          name: 'level',
          type: ApplicationCommandOptionType.Integer,
          description: 'Level to add role upon leveling up',
          required: true,
        },
      ],
    },
    {
      name: 'remove',
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Removes an auto role to leveling database',
      options: [
        {
          name: 'role',
          type: ApplicationCommandOptionType.Role,
          description: 'Remove role from leveling database',
          required: true,
        },
        {
          name: 'level',
          type: ApplicationCommandOptionType.Integer,
          description: 'Remove level from leveling database',
          required: true,
        },
      ],
    },
    {
      name: 'list',
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Shows a list of leveling auto role system',
    },
  ],
  botperm: ['ManageGuild'],
  userperm: ['ManageGuild'],
  /**
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    try {
      const [sub] = args;
      const guild = await guilds.findOne({ guildId: interaction.guild.id });

      if (sub === 'add') {
        const roles = interaction.options.getRole('role');
        const level = interaction.options.getInteger('level');

        const role = interaction.options.getRole('role')
          || interaction.guild.roles.cache.find(
            (r) => r.id === roles.join(' ') || r.name === roles.join(' ').toLowerCase(),
          );
        if (!level) {
          return interaction.editReply({
            content: `${bot.crosss} • Please supply a level!`,
          });
        }
        if (!role) {
          return await bot.errorEmbed(bot, interaction, '**Please supply a role!**');
        }
        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            $push: {
              leveling_roles: [
                {
                  level,
                  id: role.id,
                },
              ],
            },
          },
        );

        return await bot.successEmbed(bot, interaction, `Added! now at level \`${level}\` you will gain the **${
          role.name
        }** role!`);
      }

      if (sub === 'remove') {
        const level = interaction.options.getInteger('level');
        const roles = interaction.options.getRole('role');
        if (guild.leveling_roles.length <= 0) {
          return await bot.errorEmbed(bot, interaction, '**Please add some level auto roles first !**');
        }
        if (!level) {
          return await bot.errorEmbed(bot, interaction, '**Please supply a level !**');
        }
        let valid = false;
        let index;
        let roleId;
        guild.leveling_roles.forEach((r) => {
          if (r.level === level) {
            roleId = r.id;
            valid = true;
            index = guild.leveling_roles.indexOf(r);
          }
        });
        const role = interaction.guild.roles.cache.find((r) => r.id === roleId);
        if (valid) {
          guild.leveling_roles.splice(index, 1);
          await guild.save();

          return await bot.successEmbed(bot, interaction, `Removed! now at level \`${level}\` you will not get **${
            role.name
          }** role!`);
        }
        return await bot.errorEmbed(bot, interaction, '**Please supply a valid leveling auto role !**');
      }

      if (sub === 'list') {
        if (guild.leveling_roles.length <= 0) {
          return await bot.errorEmbed(bot, interaction, '**Please add some level auto roles first !**');
        }

        const roles = [];
        guild.leveling_roles.forEach((r) => {
          const role = interaction.guild.roles.cache.find((x) => x.id === r.id);
          roles.push(`${role} • \`${r.level}\``);
        });

        const embed = new EmbedBuilder()
          .setAuthor('Automatic Level Roles')
          .setDescription(roles.join('\n'))
          .setColor(bot.color);

        return await interaction.editReply({ embeds: [embed] });
      }
    } catch {
      await bot.senderror(interaction, e);
    }
  },
};
