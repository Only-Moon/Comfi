const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const { parse } = require("twemoji-parser");

module.exports = {
  config: {
  name: "addemoji",
  aliases: ["upload_emoji", "a-emote"],
  description: "Steal emojis and upload it on your server",
  usage: "addemoji <emoji>",
  category: "admin",
  },
  run: async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`:x: | **You Don't Have Permission To Use This Command**`)
}
let isUrl = require("is-url");
let type = "";
let name = "";
let emote = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
if (emote) {
  emote = emote[0];
  type = "emoji";
  name = args.join(" ").replace(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi, "").trim().split(" ")[0];
} else  {
  emote = `${args.find(arg => isUrl(arg))}`
  name = args.find(arg => arg != emote);
  type = "url";
}
let emoji = { name: "" };
      let Link;
      if (type == "emoji") {
        emoji = Discord.Util.parseEmoji(emote);
      Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
       emoji.animated ? "gif" : "png"
}`
} else { 
  if (!name) return message.channel.send("Please provide a name!");
  Link = message.attachments.first() ? message.attachments.first().url : emote;  }
            message.guild.emojis.create(
                `${Link}`,
                `${`${name || emoji.name}`}`
            ).then(em => message.channel.send(em.toString() + " added!")).catch(error => {
              message.channel.send(":x: | an Error occured")
                console.log(error)
})
          
        }
};