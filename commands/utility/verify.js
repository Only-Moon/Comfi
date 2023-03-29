/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, EmbedBuilder, MessageCollector } = require('discord.js');
const guilds = require('../../models/guild');

module.exports = {
  name: 'verify',
  description: 'Incase the verify prompt is not working you can run this to verify',
  directory: 'utility',
  ownerOnly: false,
  botperm: [''],
  userperm: [''],
  /**
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {
    const guild = await guilds.findOne({ guildId: interaction.guild.id });
    if (guild.verification) {
      if (interaction.member.roles.cache.has(guild.verification_role)) {
        return await bot.errorEmbed(bot, interaction, 'You are already verified in this server!');
      }
      await reRun(interaction.member, bot, interaction);
    } else {
      return await bot.errorEmbed(bot, interaction, 'Verification is disabled in this server!');
    }
  },
};

function getWord() {
  const chars = '1234567890QWERTYUIOPASDFGHJKLZXCVBNMqweryuiopasdfghjklzxcvbnm';
  let str = '';
  for (let i = 0; i < 6; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

async function reRun(member, bot, interaction) {
  function format(msg) {
    let text = msg;

    const terms = [
      { name: '{{user#mention}}', value: `<@${member.id}>` },
      { name: '{{user#tag}}', value: `${member.user.tag}` },
      { name: '{{user#id}}', value: `${member.id}` },
      { name: '{{server#id}}', value: `${member.guild.id}` },
      { name: '{{server#name}}', value: `${member.guild.name}` },
      { name: '{{server#membercount}}', value: `${member.guild.memberCount}` },
    ];

    for (const { name, value } of terms) text = text.replace(new RegExp(name, 'igm'), value);

    return text;
  }

  const guild = await guilds.findOne({ guildId: member.guild.id });
  if (guild.verification) {
    if (!guild.verification_channel) return;
    const { channel } = interaction;
    if (!channel) return;
    const word = getWord();
    const embed = new EmbedBuilder()
      .setImage(`https://luminabot.xyz/api/image/captcha?color=FFFFFF&text=${word}`)
      .setColor(bot.color);
    const hoisterMsg = await channel.send({ content: `${format(guild.verification_message)}`, embeds: [embed] });

    const collector = new MessageCollector(channel, { time: 60000 });
    collector.on('collect', (m) => {
      if (m.author.id !== member.id) return;
      if (m.content === word) {
        collector.stop('1');
        m.delete().catch(() => { });
        hoisterMsg.delete().catch(() => { });
      } else {
        collector.stop('0');
        m.delete().catch(() => { });
        hoisterMsg.delete().catch(() => { });
      }
    });

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        return channel.send({ content: `${bot.crosss} • **TIMED OUT** Please redo the captcha!` });
      }
      if (reason === '0') {
        return channel.send({ content: `${bot.crosss} • Invalid charaters provided!` });
      }
      if (reason === '1') {
        member.roles.add(guild.verification_role).catch(() => channel.send({ content: `${bot.error} • There was an error giving you this role! Please report it to a server admin!` }));
        return channel.send({ content: `${bot.tick} • Thank you for verifying in ${channel.guild.name}!` });
      }
    });
  }
}
