/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { Message, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const bot = require('../index');

const guilds = require('../models/guild');
const users = require('../models/users');

/**
 *
 * @param {Message} message
 */
module.exports = async (message, bot) => {
  const guild = await guilds.findOne({ guildId: message.guild.id });
  const user = await users.findOne({
    userId: message.author.id,
    guildId: message.guild.id,
  });

  if (!message.member) message.member = await message.guild.members.fetch(message.author.id);

  try {
    if (guild.leveling) {
      setTimeout(async () => {
        const max = 30;
        const min = 15;

        const amount = Math.floor(Math.random() * (max - min) + min);

        await users.findOneAndUpdate(
          { userId: message.author?.id, guildId: message.guild?.id },
          {
            xp: Number(user.xp) + Number(amount),
          },
        );
      }, bot.ms('1m'));

      const user3 = await users.findOne({
        userId: message.author.id,
        guildId: message.guild.id,
      });

      if (guild.leveling_roles.length > 0) {
        setTimeout(async () => {
          guild.leveling_roles.map(async (l) => {
            if (l.level <= user3.level) {
              await message.member?.roles.add(l.id).catch(() => null);
            }
          });
        }, bot.ms('30s'));

        setTimeout(async () => {
          guild.leveling_roles.map(async (l) => {
            if (l.level > user3.level) {
              await message.member?.roles.remove(l.id).catch(() => null);
            }
          });
        }, bot.ms('40s'));
      }
      if (user3.xp >= user.requiredXp) {
        await users.findOneAndUpdate(
          { userId: message.author.id, guildId: message.guild.id },
          {
            level: Number(user.level) + 1,
            requiredXp: Number(user.requiredXp) * 1.5,
          },
        );
        const user2 = await users.findOne({
          userId: message.author.id,
          guildId: message.guild.id,
        });

        function format(msg) {
          let text = msg;

          const terms = [
            { name: '{{user#mention}}', value: `<@${message.author.id}>` },
            { name: '{{user#tag}}', value: `${message.author.tag}` },
            { name: '{{user#id}}', value: `${message.author.id}` },
            { name: '{{user#avatar}}', value: `${message.member.avatarURL({ dynamic: true })}` },
            { name: '{{server#id}}', value: `${message.guild.id}` },
            { name: '{{server#name}}', value: `${message.guild.name}` },
            { name: '{{server#icon}}', value: `${message.guild.iconURL({ dynamic: true })}` },
            { name: '{{level}}', value: `${user2.level}` },
            { name: '{{xp}}', value: `${user2.xp}` },
            { name: '{{requiredXp}}', value: `${user2.requiredXp}` },
          ];

          for (const { name, value } of terms) text = text.replace(new RegExp(name, 'igm'), value);

          return text;
        }

        const channel = message.guild.channels.cache.find(
          (c) => c.id === guild.leveling_channel,
        );

        if (guild.leveling_embedtgl) {
          const emb = guild.leveling_embed.map(async (em) => {
                        const embed = new EmbedBuilder()      
              .setAuthor({
                name:
              em.embed ? em.embed.author.text : em.author?.name,
                avatarURL: em.embed ? em.author.icon_url : em.author?.icon_url,
              })
              .setTitle(format(em.embed ? em.embed.title : em.title))
              .setDescription(format(em.embed ? em.embed : em.description))
              .setColor(em.embed ? em.embed.color : (em.color ? em.color : bot.color))
              .setImage(em.embed ? em.embed.image : (em.image ? em.image : 'https://i.imgur.com/8MggL9S.png'))
              .setTimestamp(em.embed ? em.embed.timestamp : (em.timestamp ? new Date() : null))
              .setThumbnail(em.embed ? em.embed.thumbnail : em.thumbnail)
              .setFooter({ text: format(em.embed ? em.embed.footer.text : (em.footer ? em.footer.text : null) ), avatarURL:  em.embed ? em.embed.footer.icon_url : (em.footer ? em.footer.icon_url : null) });
            const cont = format(em.embed ? em.embed.content : null);
            if (!channel) {
              return message
                .reply({ content: `${cont}`, embeds: [embed], allowedMentions: { repliedUser: true } })
                .catch(() => null);
            } if (guild.leveling_channel === 'message') {
              return message
                .reply({ content: `${cont}`, embeds: [embed], allowedMentions: { repliedUser: true } })
                .catch(() => null);
            }
            return channel
              .send({ content: `${cont}`, embeds: [embed], allowedMentions: { repliedUser: true } })
              .catch(() => null);
          });
        } else {
          const image = new AttachmentBuilder(guild.leveling_image);
          if (!channel) {
            return message
              .reply({ content: `${format(guild.leveling_message)}`, files: [image], allowedMentions: { repliedUser: true } })
              .catch(() => null);
          } if (guild.leveling_channel === 'message') {
            return message
              .reply({ content: `${format(guild.leveling_message)}`, files: [image], allowedMentions: { repliedUser: true } })
              .catch(() => null);
          }
          return channel
            .send({ content: `${format(guild.leveling_message)}`, files: [image], allowedMentions: { repliedUser: true } })
            .catch(() => null);
        }
      } else return;
    } else return;
  } catch (e) {
    await bot.senderror(interaction, e);
  }
};
