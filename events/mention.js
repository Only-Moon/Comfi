const bot = require("../index");
const ms = require("ms");
const { Collection, MessageEmbed } = require("discord.js");
const { db } = require('../Database.js');
const Timeout = new Collection();
const config = require("../config.json");

bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  let p;
  let mentionRegex = message.content.match(
    new RegExp(`^<@!?(${bot.user.id})>`, "gi")
  );
  if (mentionRegex) {

let ping = new MessageEmbed()				
.setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)				
    .setDescription(				
      `Hey <@${						
message.author.id					
}>, My prefix for this this guild is **/** \n
Use \`\`\`/help\`\`\` \n for get a list of commands.`				
    )				
    .setColor(bot.color)				
    .setFooter(`Requested by ${message.author.username}`)				
    .setTimestamp();	
	
 message.reply({embeds: [ ping ], allowedMentions: { repliedUser: false }});
}
  
})