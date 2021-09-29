const bot = require(`../../index`)
const guilds = require(`../../models/guild`)
const { MessageEmbed } = require("discord.js")

bot.on("emojiCreate", async (emoji) => {
    const guild = await guilds.findOne({guildId: emoji.guild.id})
    if(!guild.logging) return;
    if(!emoji.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;

    const AuditLogFetch = await emoji.guild.fetchAuditLogs({limit: 1, type: "EMOJI_CREATE"});
    const Entry = AuditLogFetch.entries.first();

    const embed = new MessageEmbed()
    .setTitle(`Emoji Created!`)
    .setColor(bot.color)
    .setDescription(`> <a:stars_aesthetic:883033007836000308> • **Author:** <@${Entry.executor.id}>`)
    .addFields(
        {name: "Emoji", value: `> <a:zzzghostheart:883017884014637066> • **Name:** ${emoji.name}\n > <a:zzzghostheart:883017884014637066> • **ID:** \`${emoji.id}\`\n > <a:zzzghostheart:883017884014637066> • **Preview:** ${emoji}`},
    )
    .setFooter("Comfi™ Logging")
    .setTimestamp()

    
    const logsChannel = emoji.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(logsChannel) {
        logsChannel.send({embeds: [embed]})
    }
})