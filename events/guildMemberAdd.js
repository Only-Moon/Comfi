const bot = require("../index");
const { MessageEmbed } = require('discord.js');
const { db } = require('../Database')
const Discord = require('discord.js')

bot.on("guildMemberAdd", async (member) => {

let toggle = await db.get(`Weltog_${member.guild.id}`);

  if (toggle === true) {
  
				let sChannel = await db.get(`welcome_channel_${member.guild.id}`);
				if (!sChannel) return;
		console.log(sChannel)	
  let sMessage = await db.get(`wel_${member.guild.id}`)

				if (member.user.username.length > 25)
					member.user.username = member.user.username.slice(0, 25) + '...';
				if (member.guild.name.length > 15)
					member.guild.name = member.guild.name.slice(0, 15) + '...';
        
				let channel = bot.channels.cache.get(sChannel)
          
          channel.send({
embeds: [ sMessage ] })
  
      } else {
			return;
      console.log('error');
			}
});