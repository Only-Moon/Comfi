const { CommandInteraction, MessageEmbed } = require("discord.js") 
  
module.exports = { 
  name: "leaveguild", 
  description: "Leave a guild", 
  ownerOnly: true,
  options: [
  {
  name: "guild",
  description: "Guild Name or Guild Id",
  type: "STRING",
  required: false,
  },
  ],
  botperm: [],
  userperm: [], 
/** 
* @param {CommandInteraction} interaction
* @param {String[]} args 
*/ 

run: async(bot, interaction, args) => { 
  
let guild = bot.guilds.cache.find(g => g.id === args.join(" ") || g.name.toLowerCase() === args.join(" ").toLowerCase()) || interaction.guild

let invite    
let textChannels = guild.channels.cache.find(c => c.type === "GUILD_TEXT" && c.permissionsFor(guild.me).has("CREATE_INSTANT_INVITE")) 
  
if(!textChannels) { invite = "No channels"} 
  await textChannels.createInvite({ 
    maxAge: 0, 
    maxUses: 0 
}).then((inv) => { 
    invite = inv.url 
}) 
    
const embed = new MessageEmbed() 
  .addFields( 
  {
    name: "Guild ID",
    value: `\`${guild.id}\``,
    inline: true
  }, 
  {
    name: "Member Count",
    value: `${guild.memberCount} members`, 
    inline: true
  }, 
  {
    name: "Invite", 
    value: `${invite}`,
    inline: true
  } ) 
  .setColor(bot.color) 
  .setFooter(`${bot.guilds.cache.size} Guilds`, bot.user.displayAvatarURL())

bot.channels.cache.find(c => c.id === "881789380073783302").send({embeds: [embed]})
 await guild.leave() 

interaction.editReply(`${bot.tick} left ${guild.id}`)
  
} }