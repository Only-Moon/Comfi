const { EmbedBuilder, AuditLogEvent } = require('discord.js');
const bot = require('../../index');
const guilds = require('../../models/guild');

/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

bot.on('roleCreate', async (role) => {
  const guild = await guilds.findOne({ guildId: role.guild.id });
  if (!guild) return;
  if (!guild.logging) return;
  if (!role.guild) return;
  if (!role.guild.members.members.me.permissions.has(bot.functions.fixPermissions('VIEW_AUDIT_LOG'))) return;

  const AuditLogFetch = await role.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.RoleCreate });
  const Entry = AuditLogFetch.entries.first();
  const embed = new EmbedBuilder()
    .setTitle('Role Created!')
    .setColor(bot.color)
    .setDescription(`> <a:stars_aesthetic:883033007836000308> • **Author:** ${Entry ? `<@${Entry.executor.id}>` : 'No author'}`)
    .addFields(
      { name: 'Role', value: `> <a:zzzghostheart:883017884014637066> • **Name:** ${role.name}\n > <a:zzzghostheart:883017884014637066> • **ID:** \`${role.id}\`\n > <a:zzzghostheart:883017884014637066> • **Mention:** <@&${role.id}>` },
    )
    .setFooter({ text: 'Comfi™ Logging' })
    .setTimestamp();

  const logsChannel = role.guild.channels.cache.find((c) => c.id === guild.logging_channel);
  if (logsChannel) {
    logsChannel.send({ embeds: [embed] });
  }
});
