const bot = require("../../index");
const { MessageEmbed } = require("discord.js")
const guilds = require("../../models/guild"); 

bot.on("guildMemberUpdate", async (oldMember, newMember) => { 
  const oldStatus = oldMember?.premiumSince;
  const newStatus = newMember?.premiumSince; 
  const guild = oldMember.guild;

  const guilD = await guilds.findOne({ 
    guildId: guild.id,
  }); 
  
  if (guilD.boost) {
  
  if (!oldStatus && newStatus) { 
    
    const boostChannel = guild.channels.cache.get(guilD.boost_channel
); 
    const boostMessage = guilD.boost_message;
    
    const finalMessage = boostMessage 
      .replace(/{server}/g, guild.name) 
      .replace(/{user}/g, newMember.user.tag) 
      .replace(/{user#mention}/g, `<@${newMember.user.id}>`) 
      .replace(/{boost#count}/g, guild.premiumSubscriptionCount); 

let boost = new MessageEmbed()
  .setTitle(`${guild.name} Got Boosted`)  
  .setDescription(finalMessage)
  .setImage(guilD.boost_image)
  .setColor(bot.color)
  .setThumbnail(guild.iconURL({ dynamic: true }));
  
if (boostChannel) {
 
    boostChannel.send({embeds: [ boost ]}); 

} else if (!boostChannel) { return; }
  
  } 
  } else { 
    return;
  }
  if (oldStatus && !newStatus) return; });