const bot = require("../index");
const { MessageEmbed, MessageButton, MessageActionRow, Permissions } = require('discord.js')

bot.on("guildCreate", async(guild) => {
 {
   let ch = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES')) 
  
			let button = new MessageButton()
  .setStyle("LINK")
  .setLabel("Support")
  .setURL(`https://discord.gg/remYPHCVgW`) 

const row = new MessageActionRow()
   .addComponents(button);

  let msg = new MessageEmbed() .setTitle("<:pinkheartsu_HE:796373357280362517> Thanks for adding me! <:pinkheartsu_HE:796373357280362517>") 
  .setColor("#F4B3CA") 
  .setDescription(`Hey, thanks for adding me to ${guild.name} <:pink_heartsies_HE:796373408010600468>  \n My Prefix Is **Cr!**(useless) \n You Can Use Me with **/** \n\n To get started type **/help** Or **/help ping**`) 
  
  ch.send({
    embeds: [ msg ],
    components: [ row ]     
  }) 
  }
 {
  const channelId = "881789380073783301";
  const channel = bot.channels.cache.get(channelId);
  if (!channel) return;
  
const embed = new MessageEmbed()
    .setTitle("Someone invited me!")
    .setDescription(
      `**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`
    )
    .setTimestamp()
    .setColor("#F8B6D4")
    .setFooter(`I'm in ${bot.guilds.cache.size} Guilds Now!`);
  channel.send({embeds: [ embed ]});
}
});