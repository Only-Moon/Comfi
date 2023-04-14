const { EmbedBuilder, AuditLogEvent } = require('discord.js');
const bot = require('../../index');
const guilds = require('../../models/guild');

/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

bot.on('stickerDelete', async (sticker) => {
  const guild = await guilds.findOne({ guildId: sticker.guild.id });
  if (!guild.logging) return;
  if (!sticker.gguild.members.me.permissions.has(bot.functions.fixPermissions('VIEW_AUDIT_LOG'))) return;

  const AuditLogFetch = await sticker.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.StickerDelete });
  const Entry = AuditLogFetch.entries.first();

  const embed = new EmbedBuilder()
    .setTitle('Sticker Deleted!')
    .setColor(bot.color)
    .setDescription(`> <a:stars_aesthetic:883033007836000308> • **Author:** <@${Entry.executor.id}>`)
    .addFields(
      { name: 'Sticker', value: `> <a:zzzghostheart:883017884014637066> • **Name:** ${sticker.name}\n > <a:zzzghostheart:883017884014637066> • **ID:** \`${sticker.id}\`` },
    )
    .setFooter({ text: 'Comfi™ Logging' })
    .setTimestamp();

  const logsChannel = sticker.guild.channels.cache.find((c) => c.id === guild.logging_channel);
  if (logsChannel) {
    logsChannel.send({ embeds: [embed] });
  }
});
