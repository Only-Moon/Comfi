const { EmbedBuilder } = require('discord.js');
const bot = require('../../index');
const guilds = require('../../models/guild');

/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

bot.on('messageUpdate', async (oldMessage, newMessage) => {
  const guild = await guilds.findOne({ guildId: newMessage.guild.id });
  if (!guild?.logging) return;
  if (!newMessage.guild) return;
  if (newMessage) return;
  if (newMessage.author ? newMessage.author.bot : true) return;
  const embed = new EmbedBuilder()
    .setTitle('Message Edited!')
    .setColor(bot.color)
    .setDescription(` > <a:zzzghostheart:883017884014637066> • **Channel:** <#${newMessage.channel.id}>\n > <a:zzzghostheart:883017884014637066> • **Author:** <@${newMessage.author.id}>`)
    .addFields(
      { name: 'Old Message', value: `${oldMessage.content}` },
      { name: 'New Message', value: `${newMessage.content}` },
    )
    .setFooter({ text: 'Comfi™ Logging' })
    .setTimestamp();

  const channel = newMessage.guild.channels.cache.find((c) => c.id === guild.logging_channel);
  if (channel) {
    channel.send({ embeds: [embed] });
  } else if (!channel) return;
});
