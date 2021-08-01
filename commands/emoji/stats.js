const Discord = require("discord.js");

module.exports = {
  config: {
  name: "emoji-stats",
  aliases: ["estats"],
  description: "Show stats for server emoji",
  usage: "stats",
  category: "emoji",
  },
  run: async (bot, message, args) => { 
    
    const config = [100, 200, 300, 500]; 
    const emo = config[message.guild.premiumTier]; 
    const staticEmojis = `**${message.guild.emojis.cache.filter(e => !e.animated).size} / ${emo / 2}** (${emo / 2 - message.guild.emojis.cache.filter(e => !e.animated).size} left, ${Number((message.guild.emojis.cache.filter(e => !e.animated).size / emo / 2) * 100).toFixed(2)}% full)`;
    const aniEmojis = `**${message.guild.emojis.cache.filter(e => e.animated).size} / ${emo / 2}** (${emo / 2 - message.guild.emojis.cache.filter(e => e.animated).size} left, ${Number((message.guild.emojis.cache.filter(e => e.animated).size / emo / 2) * 100).toFixed(2)}% full)`;
    const totEmojis = `**${message.guild.emojis.cache.size} / ${emo}** (${emo - message.guild.emojis.cache.size} left, ${Number((message.guild.emojis.cache.size / emo) * 100).toFixed(2)}% full)`; 
    const stati = `Static emotes: ${staticEmojis}`; 
    const ani = `Animated emotes: ${aniEmojis}`; 
    const tot = `Total: ${totEmojis}`; 
    const res = `${stati}\n\n${ani}\n\n${tot}`; 
    
    const embed = new Discord.MessageEmbed()
    .setColor("F8B6D4")
      .setAuthor("Emoji Stats", bot.user.displayAvatarURL())
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${res}`)
      .setTimestamp(true);
    
    message.channel.send(embed);
    
    
  }}