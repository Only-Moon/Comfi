const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const bot = require('../../index');
const guilds = require('../../models/guild');

/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

bot.on('guildMemberAdd', async (member) => {
  try {
    const guild = await guilds.findOne({ guildId: member.guild.id });
    require('../../functions/verification')(member, bot);

    const members = (await member.guild.members.fetch({
      time: 9999999,
      withPresences: true,
    }))
      .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
      .map((m) => m);

    const position = new Promise((ful) => {
      for (let i = 1; i < members.length + 1; i++) {
        // @ts-ignore
        if (members[i - 1].id === member.id) ful(i);
      }
    });

    const posi = await position;

    function format(msg) {
      let text = msg;

      const terms = [
        { name: '{{user#mention}}', value: `<@${member.id}>` },
        { name: '{{user#tag}}', value: `${member.user.tag}` },
        { name: '{{user#name}}', value: `${member.user.username}` },
        { name: '{{user#id}}', value: `${member.id}` },
        { name: '{{user#avatar}}', value: `${member.avatarURL({ dynamic: true })}` },
        { name: '{{server#id}}', value: `${member.guild.id}` },
        { name: '{{server#name}}', value: `${member.guild.name}` },
        { name: '{{server#icon}}', value: `${member.guild.iconURL({ dynamic: true })}` },
        { name: '{{server#membercount}}', value: `${member.guild.memberCount}` },
        { name: '{{server#humancount}}', value: `${member.guild.members.cache.filter((member) => !member.user.bot)}` },
        { name: '{{join#position}}', value: `${getOrdinal(posi)}` },
      ];

      for (const { name, value } of terms) { 
          if (text === null || text === undefined) break;
          text = text.replace(new RegExp(name, 'igm'), value)};

      return text;
    }

    if (guild.welcome) {
      const channel = member.guild.channels.cache.find(
        (c) => c.id === guild.welcome_channel,
      );
      if (channel) {
        if (guild.welcome_embedtgl) {
          const emb = guild.welcome_embed.map(async (em) => {
              
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
            if
            (guild.welcome_dmuser) {
              await member.send({
                content: cont ? cont : null,
                embeds: [embed],
              }).catch(() => null);
            } else {
              channel
                .send({

                  content: cont,
                  embeds: [embed],
                  allowedMentions: { repliedUser: true },
                })
                .catch(() => null);
            }
          });
        } else if (guild.welcome_dmuser) {
          const welcome_image = new AttachmentBuilder(`${guild.welcome_image}`);

          member
            .send({
              content: `${format(guild.welcome_message)}`,
              files: [welcome_image],
              allowedMentions: { repliedUser: true },
            })
            .catch(() => null);
        } else {
          const welcome_image = new MessageAttachment(`${guild.welcome_image}`);

          channel
            .send({
              content: `${format(guild.welcome_message)}`,
              files: [welcome_image],
              allowedMentions: { repliedUser: true },
            })
            .catch(() => null);
        }
      }
      if (guild.welcome_joinrole) {
        guild.welcome_joinrole.forEach(async (r) => {
          await member.roles
            .add(r)
            .catch(() => null);
        });
      } else return;
    } else return;

    if (guild.auto_nick.toLowerCase() === 'none') return;
    const nick = format(guild.auto_nick);
    member.setNickname(`${nick}`).catch(() => { });
  } catch (e) {
    await bot.senderror(false, e);
  }
});

function getOrdinal(input) {
  const j = input % 10;
  const k = input % 100;

  if (j == 1 && k != 11) return `${input}st`;
  if (j == 2 && k != 12) return `${input}nd`;
  if (j == 3 && k != 13) return `${input}rd`;

  return `${input}th`;
}
