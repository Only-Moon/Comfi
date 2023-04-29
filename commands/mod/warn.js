/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const uuid = require('uuid');
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const warnSchema = require('../../models/users');

module.exports = {
  name: 'warn',
  description:
    'Warn a user, get a list of a user, and remove the warned user!',
  ownerOnly: false,
  directory: 'warn',
  userPerm: ['ModerateMembers'],
  botPerm: ['ModerateMembers'],
  options: [
    {
      name: 'add',
      description: 'Warn a user!',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user',
          description: 'Provide a user to warn them!',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'reason',
          description: 'Provide a reason!',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: 'list',
      description: 'Get a list of the warned user!',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user',
          description: "Provide a user to get it's list",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    },
    {
      name: 'remove',
      description: 'Remove a warned user!',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user',
          description: 'Provide a user to remove the warning!',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'warnid',
          description: 'Provide a warnID to remove the warned user!',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: 'reason',
          description: 'Provide a us reason!',
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    },
  ],

  run: async (bot, interaction, args) => {
    const subCommandName = interaction.options._subcommand;

    const user = interaction.options.getUser('user');
    const getWarnId = interaction.options.getString('warnid');
    const reason = interaction.options.getString('reason');
    try {
      switch (subCommandName) {
        case 'add':
          const getReason = interaction.options.getString('reason');

          const warnObj = {
            authorId: interaction.user.id,
            timestamp: Math.floor(Date.now() / 1000),
            warnId: uuid.v4(),
            reason: getReason,
          };

          const warnAddData = await warnSchema.findOneAndUpdate(
            {
              guildId: interaction.guild.id,
              userId: user.id,
            },
            {
              guildId: interaction.guild.id,
              userId: user.id,
              $push: {
                warns: warnObj,
              },
            },
            {
              upsert: true,
            },
          );
          const warnCount = warnAddData ? warnAddData.warns.length + 1 : 1;
          const warnGrammar = warnCount === 1 ? '' : 's';

          const warn = new EmbedBuilder()
            .setTitle('__Warned__')
            .setDescription(`You have been warned by ${interaction.user} \nReason: ${getReason}`)
            .setColor(bot.color);
          user.send({ embeds: [warn] })
            .catch(() => null);

          const warnEmbed = new EmbedBuilder()
            .setTitle('**__Warn Report__**')
            .setDescription(`${bot.tick} • Warned **${user.tag}** \n${bot.tick} • They now have **${warnCount}** warning${warnGrammar} \n${bot.tick} • Reason: ${getReason}`)
            .setColor(bot.color);
          await interaction.editReply({ embeds: [warnEmbed] }).then((msg) => {
            setTimeout(() => { msg.delete().catch(() => null); }, bot.ms('30s'));
          });
          const Member = interaction.guild.members.members.cache.get(user.id);

          await bot.modlog({
            Member,
            Action: 'warn',
            Reason: getReason.length < 1 ? 'No reason supplied.' : getReason,
          }, interaction);
          break;

        case 'list':
          const warnedResult = await warnSchema.findOne({
            guildId: interaction.guild.id,
            userId: user.id,
          });

          if (!warnedResult || warnedResult.warns.length === 0) return await bot.errorEmbed(bot, interaction, 'That user has no warning record!');

          let string = '';
          const embed = new EmbedBuilder()
            .setColor(bot.color)
            .setDescription(string);

          const getWarnedUser = interaction.guild.members.members.cache.find(
            (user) => user.id === warnedResult.userId,
          );
          for (const warning of warnedResult.warns) {
            const {
              authorId, timestamp, warnId, reason,
            } = warning;
            const getModeratorUser = interaction.guild.members.members.cache.find(
              (user) => user.id === authorId,
            );
            string += embed
              .addFields({
                name: `ID: ${warnId} • Moderator: ${getModeratorUser?.user.tag}`,
                value: `> <a:pinkheart_cs:883033001599074364> • **Reason:** ${reason} \n> <a:pinkheart_cs:883033001599074364> • **Date:** <t:${timestamp}>`,
              })
              .setTitle(`${getWarnedUser.user.username}'s Warning Lists!`);
          }

          await interaction.editReply({ embeds: [embed] });
          break;

        case 'remove':
          const validateUUID = uuid.validate(getWarnId);

          if (validateUUID) {
            const warnedRemoveData = await warnSchema.findOneAndUpdate(
              {
                guildId: interaction.guild.id,
                userId: user.id,
              },
              {
                $pull: { warns: { warnId: `${getWarnId}` } },
              },
            );

            const getRemovedWarnedUser = interaction.guild.members.members.cache.find(
              (user) => user.id === warnedRemoveData.userId,
            );

            const warnedRemoveCount = warnedRemoveData
              ? warnedRemoveData.warns.length - 1
              : 0;
            const warnedRemoveGrammar = warnedRemoveCount === 1 ? '' : 's';

            return await bot.successEmbed(bot, interaction, `Successfully deleted **${getRemovedWarnedUser.user.tag}** warning, they now have **${warnedRemoveCount}** warning${warnedRemoveGrammar}!`);
            await bot.modlog({
              Member: getRemovedWarnedUser,
              Action: 'warn remove',
              Reason: reason?.length < 1 ? 'No reason supplied.' : reason,
              Mod: warnedRemoveData.authorId ? warnedRemoveData.authorId : 'Not Found',
            }, interaction);
          }
          return await bot.errorEmbed(bot, interaction, 'That is not a valid Warn ID!');

          break;
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
