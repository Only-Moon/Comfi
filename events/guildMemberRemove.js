const bot = require("../index"),
      { MessageEmbed } = require('discord.js'),
      { db } = require('../Database'),
      Discord = require('discord.js'),
      moment = require("moment");

bot.on("guildMemberRemove", async (member) => {
  
  const toggle = await db.get(`leave_toggle_${member.guild.id}`);		

	if(toggle === true){ 
  
const tit = await db.get(`leave_title_${member.guild.id}`)
const desc = await db.get(`leave_desc_${member.guild.id}`)
const color = await db.get(`leave_color_${member.guild.id}`)
const img = await db.get(`leave_img_${member.guild.id}`) || "";
const thumb = await db.get(`leave_thumb_${member.guild.id}`) || "";
const foot = await db.get(`leave_foot_${member.guild.id}`) || "";
const ch = await db.get(`leave_channel_${member.guild.id}`)

if (member.user.username.length > 25)
					member.user.username = member.user.username.slice(0, 25) + '...';
				if (member.guild.name.length > 15)
					member.guild.name = member.guild.name.slice(0, 15) + '...';
    
  let sMsg = desc
          .replace(/{user}/g, `${member}`)
					.replace(/{user_tag}/g, `${member.user.tag}`)
					.replace(/{user_name}/g, `${member.user.username}`)
					.replace(/{user_id}/g, `${member.id}`)
					.replace(/{server_name}/g, `${member.guild.name}`)
					.replace(/{server_id}/g, `${member.guild.id}`)
					.replace(/{membercount}/g, `${member.guild.memberCount}`)
					.replace(/{guild}/g, `${member.guild.name}`)
					.replace(
						/{user_createdAgo}/g,
						`${moment(member.user.createdTimestamp).fromNow()}`
					)
					.replace(
						/{user_createdAt}/g,
						`${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`
					);

let embed = new Discord.MessageEmbed()
.setTitle(tit)
.setDescription(sMsg)
.setColor(color)
.setImage(img)
.setThumbnail(thumb)
.setFooter(foot); 

return bot.channels.cache.get(ch).send({embeds: [embed] });
	} else {
		return;
  console.log(`error`)
  }

});