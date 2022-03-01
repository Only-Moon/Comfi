const bot = require(`../../index`)
const guilds = require(`../../models/guild`)
const { MessageEmbed } = require("discord.js")

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

bot.on("channelCreate", async (channel) => {
    const guild = await guilds.findOne({guildId: channel.guild.id})
    if(!guild.logging) return;
    if(!channel.guild) return;
    if(!channel.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;

    const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1, type: "CHANNEL_CREATE"});
    const Entry = AuditLogFetch.entries.first();
    const embed = new MessageEmbed()
    .setTitle(`Channel Created!`)
    .setColor(bot.color)
    .setDescription(`> <a:stars_aesthetic:883033007836000308> • **Author:** <@${Entry.executor.id}>`)
    .addFields(
        {name: "Channel", value: ` > <a:zzzghostheart:883017884014637066> • **Name:** ${channel.name}\n > <a:zzzghostheart:883017884014637066> • **ID:** \`${channel.id}\`\n > <a:zzzghostheart:883017884014637066> • **Mention:** <#${channel.id}>`},
    )
    .setFooter({text: "Comfi™ Logging"})
    .setTimestamp()

    const logsChannel = channel.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(logsChannel) {
        logsChannel.send({embeds: [embed]})
    }
})