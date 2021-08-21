const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord.js');
const { Permissions } = require('discord.js')

module.exports.run = async(bot, guild) => {
let ch = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES')) 
  if (!ch) return false; 
  let mybutton = new MessageButton()
  .setStyle("LINK")
  .setLabel("Support")
  .setURL(`https://discord.gg/remYPHCVgW`) 

let row = new MessageActionRow()
    .addComponent(mybutton);
 
  let msg = new Discord.MessageEmbed() .setTitle("<:pinkheartsu_HE:796373357280362517> Thanks for adding me! <:pinkheartsu_HE:796373357280362517>") 
  .setColor(config.embedcolor) 
  .setDescription(`Hey, thanks for adding me to ${guild.name} <:pink_heartsies_HE:796373408010600468>  \n My Prefix Is **Cr!** \n\n To get started type **Cr!help**`) 
  
  ch.send({
    embeds: [ embed ],
    components: [row]     
  }) 
  
  
  const channelId = "867650282933583882";
  const channel = bot.channels.cache.get(channelId);
  if (!channel) return;
  const embed = new discord.MessageEmbed()
    .setTitle("Someone invited me!")
    .setDescription(
      `**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`
    )
    .setTimestamp()
    .setColor("#F8B6D4")
    .setFooter(`I'm in ${bot.guilds.cache.size} Guilds Now!`);
  channel.send({embeds: [ embed ]});
}