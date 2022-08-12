const bot = require(`../../index`)
const guilds = require(`../../models/guild`)
const { EmbedBuilder} = require("discord.js")

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

bot.on("inviteCreate", async (invite) => {
    const guild = await guilds.findOne({guildId: invite.guild.id})
    if(!guild.logging) return;
    if(!invite.guild) return;
    
    const embed = new EmbedBuilder()
    .setTitle(`Invite Created!`)
    .setColor(bot.color)
    .setDescription(` > <a:stars_aesthetic:883033007836000308> • **Channel:** ${invite.channel ? `<#${invite.channel.id}>` : "No channel found"}
     > <a:stars_aesthetic:883033007836000308> • **Author:** ${invite.inviter ? `<@${invite.inviter.id}>` : "No author"}`)
     .addFields(
         {name: "Information", value: ` > <a:zzzghostheart:883017884014637066> • **Code:** ${invite.code}\n > <a:zzzghostheart:883017884014637066> • **Max uses:** ${invite.maxUses ? invite.maxUses : "Not defined"}\n > <a:zzzghostheart:883017884014637066> • **Expires:** ${invite.expiresTimestamp ? `<t:${Math.floor(invite.expiresTimestamp / 1000)}:f>` : "Not defined"}`},
         {name: "URL", value: `${invite.url}`})
    .setFooter({text: "Comfi™ Logging"})
    .setTimestamp()

   
    const channel = invite.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(channel) {
        channel.send({embeds: [embed]})
    }
})