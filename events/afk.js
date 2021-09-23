const bot = require("../index");
const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const { db } = require('../Database.js');

bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (await db.has(`afk-${message.author.id}+${message.guild.id}`)) { 		
  const info = await db.get(`afk-${message.author.id}+${message.guild.id}`); 		
  await db.delete(`afk-${message.author.id}+${message.guild.id}`); 	
  await db.delete(`aftime-${message.author.id}+${message.guild.id}`); 

if(message.member.manageable) {
  message.member.setNickname('')
}
  
let embed = new MessageEmbed()
  .setTitle(`Afk Removed`)
  .setDescription(`Welcome back ${message.author.tag} \nGreat to see you!!` 		
)
.setColor(bot.color);

message.reply({embeds:  [ embed ], allowedMentions: { repliedUser: false } })   
 
} 	//checking for mentions 	
  if (message.mentions.members.first()) { 		
    if ( 	await db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`) 
       ) { 			
      const reason = await db.get( 				`afk-${message.mentions.members.first().id}+${message.guild.id}` 		
                                 ); 			
      let time = await db.get( 
        `aftime-${message.mentions.members.first().id}+${message.guild.id}` 		
      ); 			
      time = Date.now() - time;
      
       message.delete();

let afk = new MessageEmbed()
     .setTitle(`**User Afk**`)
     .setDescription(`${ 					message.mentions.members.first().user.tag} **is now afk** \nReason: **${reason}** \nDuration: **${ms(time)} ago**`)
      .setColor(bot.color);
      
message.channel.send({embeds: [ afk ], allowedMentions: { repliedUser: false } }).then((msg) => {
  setTimeout(() => msg.delete(), ms('15 seconds'))
  });  
    }
}
})
