const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const { Permissions } = require('discord.js')
const { parse } = require("twemoji-parser");

module.exports = {
  config: {
  name: "addsticker",
  aliases: ["upload_sticker", "a-sticker"],
  description: "Steal stickers and upload it on your server",
  usage: "addsticker <sticker>",
  category: "admin",
  },
  run: async (bot, message, args) => {
  if (!message.member.permissions.has("PERMISSIONS.FLAGS_MANAGE_EMOJIS_AND_STICKERS")) {
return message.channel.send(`:x: | **You Don't Have Permission To Use This Command**`)
}
    
let isUrl = require("is-url");
let type = "";
let name = "";
let sticker = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
if (sticker) {
  sticker = sticker[0];
  type = "emoji";
  name = args.join(" ").replace(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi, "").trim().split(" ")[0];
} else  {
  emote = `${args.find(arg => isUrl(arg))}`
  name = args.find(arg => arg != sticker);
  type = "url";
}
let stickers = { name: "" };
      let Link;
      if (type == "sticker") {
        emoji = Discord.Util.parseEmoji(sticker);
      Link = `https://cdn.discordapp.com/sticker/${emoji.id}.${
       sticker.animated ? "gif" : "png"
}`
} else { 
  if (!name) return message.channel.send("Please provide a name!");
  Link = message.attachments.first() ? message.attachments.first().url : sticker;  }   
  
message.guild.stickers.create(
                `${Link}`,
                `${`${name || sticker.name}`}`
            ).then(sticker => message.channel.send(`${sticker.name} added!`)).catch (e => {
            let embed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle(`:x: Error!`)
            .setDescription(e.toString());

            message.channel.send({embeds: [ embed ]});

        })
          
        }
};