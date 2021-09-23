const bot = require("../index");
const { MessageEmbed } = require("discord.js")
const schema = require("../models/boostMessage"); 

bot.on("guildMemberUpdate", async (oldMember, newMember) => { 
  const oldStatus = oldMember?.premiumSince;
  const newStatus = newMember?.premiumSince; 
  const guild = oldMember.guild;

  const boostData = await schema.findOne({ 
    GuildID: guild.id,
  }); 
  
  if (!boostData) return; 
  
  if (!oldStatus && newStatus) { 
    if (boostData.BoostChannel == "None") return;
    if (boostData.BoostMessage == "None") return;
    const boostChannel = guild.channels.cache.get(boostData.BoostChannel); 
    const boostMessage = boostData.BoostMessage;
    
    const finalMessage = boostMessage 
      .replace(/{server}/g, guild.name) 
      .replace(/{user}/g, newMember.user.tag) 
      .replace(/{user.mention}/g, `<@${newMember.user.id}>`) 
      .replace(/{boost.count}/g, guild.premiumSubscriptionCount); 

let boost = new MessageEmbed()
  .setTitle(`${guild.name} Got Boosted`)  
  .setDescription(finalMessage)
  .setColor(bot.color)
  .setThumbnail(guild.iconURL({ dynamic: true }));
    
    boostChannel.send({embeds: [ boost ]}); 
  } 
  
  if (oldStatus && !newStatus) return; });