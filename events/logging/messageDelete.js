const bot = require(`../../index`)
const guilds = require(`../../models/guild`)
const { MessageEmbed } = require("discord.js")

bot.on("messageDelete", async (message) => {
    const guild = await guilds.findOne({guildId: message.guild.id})
    if(!guild.logging) return;
    if(!message.guild) return;
    if(message.author.bot) return;
    if(!message.author) return;
  
    if(message.author) {
    const embed = new MessageEmbed()
    .setTitle(`Message Deleted!`)
    .setColor(bot.color)
    .setDescription(` > <a:zzzghostheart:883017884014637066> • **Channel:** <#${message.channel.id}>\n > <a:zzzghostheart:883017884014637066> • **Author:** ${message ? `<@${message.author.id}>` : "No author found"}`)
    .addFields(
        {
     name: "Message", 
     value: message.content.toString() || `${bot.error} **Sorry, I am unable to fetch that message <3**`
        }
    )
    .setFooter("Comfi™ Logging")
    .setTimestamp()

    
    const channel = message.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(channel) {
        channel.send({embeds: [embed]})
    }
}
})