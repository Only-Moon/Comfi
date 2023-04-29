/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const ms = require('ms');
const guilds = require('../../models/guild');

module.exports = {
  name: 'bann',
  description: 'Different ways to ban a user',
  directory: 'mod',
  ownerOnly: false,
  options: [
    {
      name: 'permanent',
      description: 'Permanently Ban Someone from your server',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user',
          description: 'User To Ban',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'reason',
          description: 'Reason To Ban',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: 'temporary',
      description: 'Temporary Ban a User',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          type: ApplicationCommandOptionType.User,
          description: 'User to tempmute',
          name: 'user',
          required: true,
        },
        {
          type: ApplicationCommandOptionType.String,
          description: 'Time till tempban',
          name: 'time',
          required: true,
        },
        {
          type: ApplicationCommandOptionType.String,
          description: 'Reason to tempban',
          name: 'reason',
          required: true,
        },
      ],
    },
    {
      name: 'hack',
      description: 'Hack/forceban a user without them knowing it',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          type: ApplicationCommandOptionType.User,
          description: 'user to hackban',
          name: 'user',
          required: true,
        },
        {
          type: ApplicationCommandOptionType.String,
          description: 'reason to hackban',
          name: 'reason',
          required: true,
        },
      ],
    },
    {
      name: 'remove',
      description: 'Unban Someone',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user',
          description: 'UserId To Unban',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
  ],
  userperm: ['BanMembers'],
  botperm: ['BanMembers'],
  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    const [sub] = args;

    const guild = await guilds.findOne({ guildId: interaction.guild.id });

    try {
      if (sub === 'permanent') {
        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason')
          || `Banned by ${interaction.member.username}`;

        const banMember = interaction.guild.members.cache.get(args[0]) || bot.users.cache.get(args[0]) || user;
        if (!banMember) {
          return await bot.errorEmbed(bot, interaction, '**User Is Not In The Guild**');
        }

        if (banMember.user === interaction.user) {
          return await bot.errorEmbed(bot, interaction, '**You Cannot Ban Yourself**');
        }
        const userRank = banMember.roles.highest.rawPosition;
        const memberRank = interaction.member.roles.highest.rawPosition;

        if (userRank >= memberRank) {
          return await bot.errorEmbed(bot, interaction, '**Cannot Ban This User due to role hierarchy !**');
        }

        await interaction.guild.members.ban(banMember, {
          reason: reason.length < 1 ? 'No reason supplied.' : reason,
        });
        await banMember.send(
          `**Hello, You Have Been Banned From ${interaction.guild.name}
             for - ${reason || 'No Reason'}**`,
        ).catch(() => null);

        if (reason) {
          return await bot.successEmbed(bot, interaction, `**${banMember.username}** has been banned for ${reason}`);
        }
        return await bot.successEmbed(bot, interaction, `**${banMember.user.username}** has been banned`);

        await bot.modlog({
          Member: banMember,
          Action: 'ban',
          Reason: reason.length < 1 ? 'No reason supplied.' : reason,
        }, interaction);
      }

      if (sub === 'temporary') {
        const reason = interaction.options.getString('reason');

        const tbuser = interaction.options.getMember('user')
          || interaction.guild.members.cache.get(args[0]);
        const regex = interaction.options.getString('time');
        if (tbuser === interaction.member) {
          return await bot.errorEmbed(bot, interaction, 'Really!! Are you going to ban yourself..');
        }

        if (tbuser.roles.highest.comparePositionTo(interaction.guild.members.me.roles.highest) >= 0
        ) {
          return await bot.errorEmbed(bot, interaction, '**Cannot bans User!**');
        }

        const userRank = tbuser.roles.highest.rawPosition;
        const memberRank = interaction.member.roles.highest.rawPosition;

        if (userRank >= memberRank) {
          return await bot.errorEmbed(bot, interaction, '**You cant ban that user due to the role hierarchy**');
        }
        if (!reason) reason = 'No Reason Provided';
        const tbuembed = new EmbedBuilder()
          .setTitle(' You have been banned!')
          .setColor(bot.color)
          .addField(
            { name: 'Reason:', value: reason.toString(), inline: true },
            { name: 'Time (s)', value: regex.toString(), inline: true },
            { name: 'Moderator:', value: interaction.user.username, inline: true },
          );

        const tbembed = new EmbedBuilder()
          .setTitle('Action: Tempban')
          .setAuthor({ name: `${interaction.user.username}` })
          .setColor(bot.color)
          .addField(
            { name: 'User: ', value: tbuser.toString(), inline: true },
            { name: 'Reason:', value: reason.toString(), inline: true },
            { name: 'Time (s)', value: regex.toString(), inline: true },
            { name: 'Moderator:', value: interaction.user.username, inline: true },
          );

        await interaction.editReply({ embeds: [tbembed] });

        await bot.modlog({
          Member: tbuser,
          Action: 'temporary ban',
          Reason: reason.length < 1 ? 'No reason supplied.' : reason,
        }, interaction);

        await tbuser.send({ embeds: [tbuembed] }).catch(() => null);

        await interaction.guild.members
          .ban(tbuser, { reason: `${reason}` })
          .then(() => {
            setTimeout(() => {
              interaction.guild.members.unban(tbuser.id);
              interaction.channel.send({
                content: `${bot.tick} • <@${
                  tbuser.id
                }> has been unbanned after tempban of ${regex}`,
              });
            }, bot.ms(regex));
            return undefined;
          });
      }

      if (sub === 'hack') {
        const target = interaction.options.getMember('user')
          || interaction.guild.members.cache.get(args[0]);

        if (isNaN(target)) {
          return await bot.errorEmbed(bot, interaction, 'Please specify an ID or USERNAME');
        }

        if (target.user === interaction.user) {
          return await bot.errorEmbed(bot, interaction, '**You Cannot Ban Yourself**');
        }
        const reason = interaction.options.getString('reason');

        if (
          target.roles.highest.comparePositionTo(
            interaction.guild.members.me.roles.highest,
          ) >= 0
        ) {
          return await bot.errorEmbed(bot, interaction, '**Cannot Ban This User coz User\'s role is higher than me !**');
        }

        const userRank = target.roles.highest.rawPosition;
        const memberRank = interaction.member.roles.highest.rawPosition;

        if (userRank >= memberRank) {
          return await bot.errorEmbed(bot, interaction, '**You cant ban that user due to the role hierarchy*j');
        }

        await interaction.guild.members.ban(target, {
          reason: reason.length < 1 ? 'No reason supplied.' : reason,
        });
        return await bot.successEmbed(bot, interaction, `${
          target.user.id
        } **were successfully banned. User was not notified!**`);

        await bot.modlog({
          Member: target,
          Action: 'hack ban',
          Reason: reason.length < 1 ? 'No reason supplied.' : reason,
        }, interaction);
      }

      if (sub === 'remove') {
        const userId = interaction.options.getString('user');

        bot.users.fetch(userId).then(async (user) => {
          await interaction.guild.members.unban(user.id).catch(async () => await bot.errorEmbed(bot, interaction, '**User is Not Banned**'));
          const ban = new EmbedBuilder()
            .setColor(bot.color)
            .setTimestamp()
            .addFields(
              {
                name: 'Unbanned :',
                value: `<@${userId}>`,
                inline: true,
              },
              {
                name: 'Moderator :',
                value: `<@${interaction.user.id}>`,
                inline: true,
              },
            )
            .setAuthor({
              name: interaction.user.username,
              iconURL: interaction.user.avatarURL({ dynamic: true }),
            });
          await interaction.editReply({ embeds: [ban] });

          await bot.modlog({
            Member: target,
            Action: 'unban',
            Reason: 'No reason supplied.',
          }, interaction);
        });
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
