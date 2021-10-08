const bot = require("../../index");
const { MessageEmbed, MessageButton, MessageActionRow, Permissions } = require('discord.js')
const guilds = require(`../../models/guild`)
  
bot.on("guildCreate", async (guild) => { 

await guilds.create({guildId: guild.id})

  {
   let ch = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES')) 
  
			let button = new MessageButton()
  .setStyle("LINK")
  .setLabel("Support")
  .setURL(`https://discord.gg/remYPHCVgW`) 

const row = new MessageActionRow()
   .addComponents(button);

  let msg = new MessageEmbed() .setTitle("<a:pinkheart_cs:883033001599074364> Thanks for adding me! <a:pinkheart_cs:883033001599074364>") 
  .setColor(bot.color) 
  .setDescription(`Hey, thanks for adding me to ${guild.name} :-<a:wing_cs:883032991293653062> \n My Prefix Is **/** \n\n To get started type **/help** Or **/help ping**`)
   .setFooter("Comfi™ v1.0.0")
  
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
    .setColor(bot.color)
    .setFooter(`I'm in ${bot.guilds.cache.size} Guilds Now!`);
  channel.send({embeds: [ embed ]});
}
});