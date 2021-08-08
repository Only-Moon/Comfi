const Discord = require('discord.js') 
const { Permissions } = require('discord.js')

 module.exports = {
  config: {
  name: "remove-emoji",
  aliases: ["remove"],
  description: "Removes server emoji",
  usage: "remove <:emoji:>",
  category: "emoji",
  },
  run: async (bot, message, args) => {
  
  if (!message.member.permissions.has("Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS")) {
    return message.channel.send(`:x: | **You Don't Have Permission To Use This Command**`)
    
  }
  if (!message.guild.me.permissions.has("Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS")) {
    return message.channel.send(`:x: | **I Don't Have Permission To manage emojis**`)}
    
    if (!args[0]) return message.channel.send("emote is a required argument that is missing.");
    
    let emo = args[0].match(/(?<=<?a?:?\w{2,32}:)\d{17,19}(?=>?)/gi)[0]
    if (!emo) return message.channel.send("emote is a required argument that is missing.")
    if (message.guild.emojis.cache.get(emo)) { 
      emo = message.guild.emojis.cache.get(emo)
      
    } else { 
      return message.channel.send(":x: | Emoji not found")}
      if (!emo.name || !emo.id) return message.channel.send("Invalid emote argument");
      console.log(emo) 
      try { 
        emo.delete() 
        message.channel.send("**The Emoji has been removed**")
        } catch (err) {
          message.channel.send(":x: | **An Error occured**") }
          }}