const { db } = require('../../Database.js'); 
const moment = require('moment'); 
const ms = require('ms'); 
const { CommandInteraction, MessageEmbed } = require("discord.js"); 

module.exports = { 
  name: "tempban", 
  description: "Temporary Ban a User", 
  ownerOnly: false,
  options: [ 
    { 
      type: 'USER', 
      description: 'User to tempmute', 
      name: 'user', 
      required: true,
    },
    { 
      type: 'STRING', 
      description: 'Time till tempban', 
      name: 'time', 
      required: true,
    },
    { 
      type: 'STRING',
      description: 'Reason to tempban',
      name: 'reason',
      required: true, 
    },
  ], 
  userperm: ["BAN_MEMBERS"],
  botperm: ["BAN_MEMBERS"], 
  /** 
* 
* @param {CommandInteraction} interaction 
* @param {String[]} args 
*/ 
  
run: async (bot, interaction, args) => { 		
  const reason = args.splice(2).join(" "); 		
  const tbuser = interaction.options.getMember('user') || interaction.guild.members.cache.get(args[0]); 		
  const regex = args.splice(1).join(" ");	 		
  if (tbuser === interaction.user.id) { 			
    return interaction.editReply("<a:Attention:883349868062576701> Really!! Are you going to ban yourself.."); 	
  } 	
  
if(!reason) reason = "No Reason Provided"; 		 		
  const tbuembed = new MessageEmbed() 			
    .setTitle(" You have been banned!") 			
    .setColor("#F4B3CA") 			
    .addField("Reason:", reason.toString()) 			
    .addField("Time (s)", regex.toString()) 			
    .addField("Moderator:", interaction.user.username); 		
  tbuser.send(tbuembed); 		
  
  const tbembed = new MessageEmbed() 			
    .setTitle("Action: Tempban") 			
    .addField("User:", tbuser.toString()) 			
    .setAuthor(`${interaction.user.username}`) 			
    .setColor("#F4B3CA") 			
    .addField("Reason:", reason.toString()) 			
    .addField("Time (s)", regex.toString()) 			
    .addField("Moderator:", interaction.user.username); 		
  
  interaction.editReply({embeds: [ tbembed ]}); 		
  
  tbuser.send({embeds: [ tbuembed ]}); 		 		
  
  interaction.guild.members.ban( tbuser, { reason: `${reason}`}).then(() => { 
    setTimeout( function (){ 		
      interaction.editReply(`<@${tbuser.id} has been unbanned after tempban of ${regex}`); 		
    }, ms(regex)); 		
    return undefined; 	
  }) 	
} 
}