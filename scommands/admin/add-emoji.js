const Discord = require("discord.js");
const { Permissions } = require('discord.js')
const { parse } = require("twemoji-parser");

module.exports = {
  name: "emojiadd",
  description: "Adds an emoji to server",
  ownerOnly: false,
  botPerm: ["MANAGE_EMOJIS_AND_STICKERS"],
  userPerm: ["MANAGE_EMOJIS_AND_STICKERS"],
  run: async (bot, interaction, args) => {
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
      Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`
     } else { 
       if (!name) return interaction.followUp("Please provide a name!");
         Link = { emote }
          interaction.guild.emojis.create(`${Link}`,`${`${name || emoji.name}`}`).then(em => interaction.followUp(em.toString() + " added!")).catch (e => {
            let embed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle(`:x: Error!`)
            .setDescription(e);

           interaction.followUp({ embeds: [ embed ]});
        })   
   }
 }
}