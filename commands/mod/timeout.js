/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const ms = require('ms');
const guilds = require('../../models/guild');

module.exports = {
  name: 'timeoutt',
  description: 'Mute 2.0 aka timeout command',
  directory: 'mod',
  ownerOnly: false,
  options: [
    {
      name: 'add',
      description: 'Timeout Someone',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user',
          description: 'User To Timeout',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'time',
          description: 'Time Till Timeout  the user in the form of s, m, h, d',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: 'reason',
          description: 'Reason To add  Timeout',
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    },
    {
      name: 'remove',
      description: 'Remove Timeout from Someone',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user',
          description: 'User To Remove Timeout',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'reason',
          description: 'Reason To remove Timeout',
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    },
  ],
  userperm: ['ModerateMembers'],
  botperm: ['ModerateMembers'],
  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    const [sub] = args;

    const guild = await guilds.findOne({ guildId: interaction.guild.id });
    try {
      if (sub === 'add') {
        const member = interaction.options.getMember('user')
          || interaction.guild.members.cache.get(args[0]);
        const time = interaction.options.getString('time');

        if (member.id === interaction.member.id) {
          return await bot.errorEmbed(bot, interaction, '**You Cannot Timeout Yourself!**');
        }
        if (
          member.roles.highest.comparePositionTo(
            interaction.guild.me.roles.highest,
          ) >= 0
        ) {
          return await bot.errorEmbed(bot, interaction, '**Cannot Timeout This User. They have a role in highest postion then me!**');
        }
        const reason = interaction.options.getString('reason') || 'NONE';

        if (member.user.bot) {
          return await bot.errorEmbed(bot, interaction, '**Cannot Timeout Bots!**');
        }

        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
          return await bot.errorEmbed(bot, interaction, 'Cannot timeout this user due to role hierarchy');
        }
        const Time = ms(time);
        if (!Time) {
          return await bot.errorEmbed(bot, interaction, '**Provide a valid time in d, h, m, s format**');
        }

        if (Time <= 10000) {
          return await bot.errorEmbed(bot, interaction, '**Time can\'t be less than 10 seconds !!**');
        }

        if (Time > 2332800000) {
          return await bot.errorEmbed(bot, interaction, '**Time can\'t be greater than 27 days !!**');
        }

        if (member.communicationDisabledUntilTimestamp >= Date.now()) {
          return await bot.errorEmbed(bot, interaction, `**${member.user.tag} is already timeout'ed**`);
        }

        await member.timeout(Time, `${reason}`).then(async () => {
          const embed1 = new EmbedBuilder()
            .setTitle('__Timeout\'ed__')
            .setDescription(
              `${bot.tick} • **Moderator: **${
                interaction.user.tag
              } \n${bot.tick} • **Guild: **${interaction.guild.name}\n${bot.tick} • **Reason: **${reason || 'No Reason Provided'} \n${bot.tick} • **Time: **${time}`,
            )
            .setColor(bot.color);
          await member
            .send({ embeds: [embed1] })
            .catch(() => null);
        });

        const embed2 = new EmbedBuilder()
          .setTitle('**__Timeout Report__**')
          .setDescription(
            `${bot.tick} • Timeout'ed **${member.user.tag}** \n${
              bot.tick
            } • Time: ${time}\n${
              bot.tick
            } • Reason: ${reason || 'No Reason Provided'}`,
          )
          .setColor(bot.color);
        await interaction.editReply({ embeds: [embed2] });

        await bot.modlog({
          Member: member,
          Action: 'timeout',
          Reason: reason.length < 1 ? 'No reason supplied.' : reason,
        }, interaction);
      }

      if (sub === 'remove') {
        const member = interaction.options.getMember('user')
          || interaction.guild.members.cache.get(args[0])
          || interaction.guild.members.cache.find(
            (r) => r.user.username.toLowerCase() === args[0].toLocaleLowerCase(),
          )
          || interaction.guild.members.cache.find(
            (ro) => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase(),
          );
        const reason = interaction.options.getString('reason');
        if (!member) {
          return await bot.errorEmbed(bot, interaction, '**Please Enter A Valid User!**');
        }
        if (member.communicationDisabledUntilTimestamp <= Date.now()) {
          return await bot.errorEmbed(bot, interaction, `**${member.user.tag} is not timeout'ed**`);
        }
        await member.timeout(null, `${reason}`);

        const embed = new EmbedBuilder()
          .setTitle('**__Timeout Report__**')
          .setDescription(
            `**Successfully deleted timeout for** ${
              member.user.tag
            } \n**Reason: **${reason || 'No Reason Provided'}`,
          )
          .setColor(bot.color);
        await interaction.editReply({ embeds: [embed] });

        await bot.modlog({
          Member: member,
          Action: 'timeout remov',
          Reason: reason.length < 1 ? 'No reason supplied.' : reason,
        }, interaction);
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
