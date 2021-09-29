const bot = require(`../../index`)
const guilds = require(`../../models/guild`)
const { MessageEmbed } = require("discord.js")

bot.on("messageUpdate", async (oldMessage, newMessage) => {
    const guild = await guilds.findOne({guildId: newMessage.guild.id})
    if(!guild.logging) return;
    if(!newMessage.guild) return;
    if(newMessage) return;
    if(newMessage.author ? newMessage.author.bot : true) return;
    const embed = new MessageEmbed()
    .setTitle(`Message Edited!`)
    .setColor(bot.color)
    .setDescription(` > <a:zzzghostheart:883017884014637066> • **Channel:** <#${newMessage.channel.id}>\n > <a:zzzghostheart:883017884014637066> • **Author:** <@${newMessage.author.id}>`)
    .addFields(
        {name: "Old Message", value: `${oldMessage.content}`},
        {name: "New Message", value: `${newMessage.content}`}
    )
    .setFooter("Comfi™ Logging")
    .setTimestamp()

    
    const channel = newMessage.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(channel) {
        channel.send({embeds: [embed]})
    }
})