const Discord = require('discord.js')
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
  name: "add-these",
  aliases: [],
  description: "Steal emojis and upload it on your server",
  usage: "add-these <emoji> <emoji>",
  category: "admin",
  },
  run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`**You Don't Have Permission To Use This Command**`)
}
        const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
        if (!emojis) return message.channel.send(`:x: | **Provde The emojis to add**`);
        emojis.forEach(emote => {
        let emoji = Discord.Util.parseEmoji(emote);
        if (emoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
       emoji.animated ? "gif" : "png"
}`
            message.guild.emojis.create(
                `${Link}`,
                `${`${emoji.name}`}`
            ).then(em => message.channel.send(em.toString() + " added!")).catch (e => {
            let embed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle(`:x: Error!`)
            .setDescription(e);

            message.channel.send(embed);

        })
          
        }
        })
}
}