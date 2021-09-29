const bot = require(`../../index`)
const guilds = require(`../../models/guild`)
const { MessageEmbed } = require("discord.js")

bot.on("roleCreate", async (role) => {
    const guild = await guilds.findOne({guildId: role.guild.id})
    if(!guild.logging) return;
    if(!role.guild) return;
    if(!role.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;

    const AuditLogFetch = await role.guild.fetchAuditLogs({limit: 1, type: "ROLE_CREATE"});
    const Entry = AuditLogFetch.entries.first();
    const embed = new MessageEmbed()
    .setTitle(`Role Created!`)
    .setColor(bot.color)
    .setDescription(`> <a:stars_aesthetic:883033007836000308> • **Author:** ${Entry ? `<@${Entry.executor.id}>` : "No author"}`)
    .addFields(
        {name: "Role", value: `> <a:zzzghostheart:883017884014637066> • **Name:** ${role.name}\n > <a:zzzghostheart:883017884014637066> • **ID:** \`${role.id}\`\n > <a:zzzghostheart:883017884014637066> • **Mention:** <@&${role.id}>`},
    )
    .setFooter("Comfi™ Logging")
    .setTimestamp()

  
    const logsChannel = role.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(logsChannel) {
        logsChannel.send({embeds: [embed]})
    }
})