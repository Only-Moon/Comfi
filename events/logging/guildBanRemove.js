const bot = require(`../../index`)
const guilds = require(`../../models/guild`)
const { EmbedBuilder, AuditLogEvent } = require("discord.js")

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

bot.on("guildBanRemove", async (ban) => {
    const guild = await guilds.findOne({guildId: ban.guild.id})
    if(!guild.logging) return;
    if(!ban.guild.members.me.permissions.has(bot.functions.fixPermissions("VIEW_AUDIT_LOG"))) return;

    const AuditLogFetch = await ban.guild.fetchAuditLogs({limit: 1, type: AuditLogEvent.MemberBanRemove});
    const Entry = AuditLogFetch.entries.first();
    const embed = new EmbedBuilder()
    .setTitle(`Unbanned User!`)
    .setColor("#FF5757")
    .setDescription(` > <a:stars_aesthetic:883033007836000308> • **Reason:** ${ban.reason ? ban.reason : "No reason"}\n > <a:stars_aesthetic:883033007836000308> • **Member:** <@${Entry.executor.id}>`)
    .addFields(
        {name: "User", value: `> <a:zzzghostheart:883017884014637066> • **Name:** ${ban.user.tag}\n > <a:zzzghostheart:883017884014637066> • **ID:** \`${ban.user.id}\``}
    )
    .setFooter({text: "Comfi™ Logging"})
    .setTimestamp()

   
    const channel = ban.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(channel) {
        channel.send({embeds: [embed]})
    }
})