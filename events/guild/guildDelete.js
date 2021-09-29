const bot = require("../../index");
const discord = require('discord.js');
const guilds = require("../../models/guild")

bot.on("guildDelete", async (guild) => { 

await guilds.findOneAndReplace({guildId: guild.id})

  const channelId = "881789380073783302";
  const channel = bot.channels.cache.get(channelId);
  if (!channel) return;
  const embed = new discord.MessageEmbed()
    .setTitle("I got kicked!")
    .setDescription(
      `**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`
    )
    .setTimestamp()
    .setColor(bot.color)
    .setFooter(`I'm in ${bot.guilds.cache.size} Guilds Now!`);
  
  channel.send({embeds: [ embed ]});
});