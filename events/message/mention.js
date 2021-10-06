const bot = require("../../index");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  let mentionRegex = message.content.match(
    new RegExp(`^<@!?(${bot.user.id})>`, "gi")
  );
  if (mentionRegex) {
        let totalCommands = 0
        bot.slashCommands.each((c) => totalCommands++)
        const ping = new MessageEmbed()
        .setDescription(` > <a:tick:890113862706266112> • **Hello I'm ${bot.user.username}**!\n\n > <a:emoji_87:883033003574579260> • You can see all my commands by running \`/help\`!\n > <a:emoji_87:883033003574579260> • I have a total of **${bot.guilds.cache.size}** servers and **${bot.users.cache.size}** users!\n > <a:emoji_87:883033003574579260> • ${totalCommands} commands!`)			
.setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)				
    .setColor(bot.color)				
    .setFooter(`Requested by ${message.author.username}`)				
    .setTimestamp();	
	
let sup = new MessageButton()
    .setStyle("LINK")
    .setLabel("Join Support!")
    .setURL("https://discord.gg/dvAUCFPaCJ");

let inv = new MessageButton()
   .setStyle("LINK")
   .setLabel("Invite Me!")
   .setURL("https://discord.com/api/oauth2/authorize?client_id=873473703470563378&permissions=8&scope=bot%20applications.commands")

let dash = new MessageButton()
    .setStyle("LINK")
    .setLabel("Check Website!")
    .setURL("https://comfi.xx-mohit-xx.repl.co/");
    
let row = new MessageActionRow()
   .addComponents(sup, inv, dash);
    
message.reply({embeds: [ ping ],
               components: [ row ],
               allowedMentions: { repliedUser: false }});
}
  
})