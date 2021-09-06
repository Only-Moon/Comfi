const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "emoji-stats",
    description: "Shows Stats For Server Emoji",
    ownerOnly: false,
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => { 
    
    const config = [100, 200, 300, 500]; 
    const emo = config[interaction.guild.premiumTier]; 
    const staticEmojis = `**${interaction.guild.emojis.cache.filter(e => !e.animated).size} / ${emo / 2}** (${emo / 2 - interaction.guild.emojis.cache.filter(e => !e.animated).size} left, ${Number((interaction.guild.emojis.cache.filter(e => !e.animated).size / emo / 2) * 100).toFixed(2)}% full)`;
    const aniEmojis = `**${interaction.guild.emojis.cache.filter(e => e.animated).size} / ${emo / 2}** (${emo / 2 - interaction.guild.emojis.cache.filter(e => e.animated).size} left, ${Number((interaction.guild.emojis.cache.filter(e => e.animated).size / emo / 2) * 100).toFixed(2)}% full)`;
    const totEmojis = `**${interaction.guild.emojis.cache.size} / ${emo}** (${emo - interaction.guild.emojis.cache.size} left, ${Number((interaction.guild.emojis.cache.size / emo) * 100).toFixed(2)}% full)`; 
    const stati = `Static emotes: ${staticEmojis}`; 
    const ani = `Animated emotes: ${aniEmojis}`; 
    const tot = `Total: ${totEmojis}`; 
    const res = `${stati}\n\n${ani}\n\n${tot}`; 
    
    const embed = new MessageEmbed()
    .setColor("#F8B6D4")
      .setAuthor("Emoji Stats", bot.user.displayAvatarURL())
      .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${res}`)
      .setTimestamp(true);
    
    interaction.editReply({embeds: [ embed ]});
    
    
  }}