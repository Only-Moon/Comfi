const bot = require("../index");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

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
      `Hey <@${						message.author.id					
}>, My prefix for this this guild is **/** \n \Use \`\`\`/help\`\`\` \nto get a list of commands.`				 )				
    .setColor(bot.color)				
    .setFooter(`Requested by ${message.author.username}`)				
    .setTimestamp();	
	
let sup = new MessageButton()
    .setStyle("LINK")
    .setLabel("Invite Me!")
    .setURL("https://discord.gg/dvAUCFPaCJ");

let inv = new MessageButton()
   .setStyle("LINK")
   .setLabel("Join Support!")
   .setURL("https://discord.com/api/oauth2/authorize?client_id=873473703470563378&permissions=8&scope=bot%20applications.commands")

let dash = new MessageButton()
    .setStyle("LINK")
    .setLabel("Check Dashboard!")
    .setURL(bot.dash);
    
let row = new MessageActionRow()
   .addComponents(sup, inv, dash);
    
message.reply({embeds: [ ping ],
               components: [ row ],
               allowedMentions: { repliedUser: false }});
}
  
})