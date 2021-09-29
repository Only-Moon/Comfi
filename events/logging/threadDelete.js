const bot = require(`../../index`)
const guilds = require(`../../models/guild`)
const { MessageEmbed } = require("discord.js")

bot.on("threadDelete", async (thread) => {
    const guild = await guilds.findOne({guildId: thread.guild.id})
    if(!guild.logging) return;
    if(!thread.guild) return;
    if(!thread.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;

    const AuditLogFetch = await thread.guild.fetchAuditLogs({limit: 1, type: "THREAD_DELETE"});
    const Entry = AuditLogFetch.entries.first();
    const embed = new MessageEmbed()
    .setTitle(`Thread Deleted!`)
    .setColor(bot.color)
    .setDescription(`> <a:stars_aesthetic:883033007836000308> • **Author:** <@${Entry.executor.id}>`)
    .addFields(
        {name: "Thread", value: `> <a:zzzghostheart:883017884014637066> • **Name:** ${thread.name}\n > <a:zzzghostheart:883017884014637066> • **ID:** \`${thread.id}\``},
    )
    .setFooter("Comfi™ Logging")
    .setTimestamp()

    
    const logsChannel = thread.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(logsChannel) {
        logsChannel.send({embeds: [embed]})
    }
})