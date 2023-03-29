const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

const bot = require('../../index');
const guilds = require('../../models/guild');
const users = require('../../models/users');

/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

bot.on('guildMemberRemove', async (member) => {
  function format(msg) {
    let text = msg;

    const terms = [
      { name: '{{user#mention}}', value: `<@${member.id}>` },
      { name: '{{user#tag}}', value: `${member.user.tag}` },
      { name: '{{user#id}}', value: `${member.id}` },
      { name: '{{user#avatar}}', value: `${member.avatarURL({ dynamic: true })}` },
      { name: '{{server#id}}', value: `${member.guild.id}` },
      { name: '{{server#name}}', value: `${member.guild.name}` },
      { name: '{{server#icon}}', value: `${member.guild.iconURL({ dynamic: true })}` },
      { name: '{{server#membercount}}', value: `${member.guild.memberCount}` },
    ];

    for (const { name, value } of terms) text = text.replace(new RegExp(name, 'igm'), value);

    return text;
  }

  const guild = await guilds.findOne({ guildId: member.guild.id });

  if (guild.leveling_coleave) {
    await users.findOneAndUpdate(
      {
        guildId: member.guild.id,
        userId: member.id,
      },
      {
        level: 0,
        xp: 0,
        requiredXp: 500,
      },
    );
  }

  if (guild.leave) {
    const channel = member.guild.channels.cache.find((c) => c.id === guild.leave_channel);
    if (channel) {
      if (guild.leave_embedtgl) {
        const emb = guild.leave_embed.map(async (em) => {
          const embed = new EmbedBuilder()
            .setAuthor({
              name: em.embed.author?.text ? em.embed.author?.text : null,
              avatarURL: em.embed.author?.icon_url
                ? em.embed.author?.icon_url : null,
              url: em.embed.author?.url ? em.embed.author?.url : null,
            })
            .setTitle(format(em.embed.title || null))
            .setDescription(format(em.embed.description || null))
            .setColor(em.embed.color || '#36393F')
            .setImage(em.embed.image ? em.embed.image.url : 'https://i.imgur.com/wyFi8zu.png')
            .setURL(em.embed.url || null)
            .setTimestamp(em.embed.timestamp ? new Date() : null)
            .setThumbnail(em.embed.thumbnail ? em.embed.thumbnail : null)
            .setFooter({ text: format(em.embed.footer.text || null) });
          const cont = format(em.content);
          if
          (guild.leave_dmuser) {
            await member.send({
              content: `${cont}`,
              embeds: [embed],
              allowedMentions: { repliedUser: true },
            }).catch(() => { });
          } else {
            channel
              .send({

                content: `${cont}`,
                embeds: [embed],
                allowedMentions: { repliedUser: true },
              })
              .catch(() => { });
          }
        });
      } else if (guild.leave_dmuser) {
        const leave_image = new AttachmentBuilder(`${guild.leave_image}`);
        member.send({ content: `${format(guild.leave_message)}`, files: [leave_image], allowedMentions: { repliedUser: true } }).catch(() => { });
      } else {
        const leave_image = new AttachmentBuilder(`${guild.leave_image}`);

        channel.send({ content: `${format(guild.leave_message)}`, files: [leave_image], allowedMentions: { repliedUser: true } }).catch(() => { });
      }
    }
  }
});
