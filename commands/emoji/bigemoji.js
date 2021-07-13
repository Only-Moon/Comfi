const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
  name: "emoji",
  aliases: ["big"],
  description: "Turns an emoji into gif",
  usage: "emoji <:emoji:>",
  category: "emoji",
  },
  run: async (bot, message, args) => {
    
    if (!args[0]) return message.channel.send("emote is a required argument that is missing.");
    const emo = Discord.Util.parseEmoji(args[0]);
    if (!emo.name || !emo.id) return message.channel.send("Invalid emote argument");
    const res = `https://cdn.discordapp.com/emojis/${emo.id}.${emo.animated ? "gif" : "png"}`;
    
    let embed = new Discord.MessageEmbed()
      .setColor("F8B6D4")
      .setAuthor("Enlarged Emoji", message.author.displayAvatarURL({dynamic: true}))
      .setImage(`${res}`)
      .setDescription(`${emo.name} ${emo.id}`);

    return message.channel.send(embed);
    
  }
}