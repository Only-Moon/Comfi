const { db } = require('../../Database.js'); 
const simplydjs = require("simply-djs") 
const { CommandInteraction, MessageEmbed } = require("discord.js"); 

module.exports = { 
  name: "chatbot", 
  description: "Sets the chatbot system", 
  ownerOnly: false, 
  options: [ { 
    type: 'SUB_COMMAND', 
    description: 'Sets the chatbot toggle true/false', 
    name: 'toggle', 
    options: [ { 
      type: 'STRING', 
      description: 'Toggle chatbot', 
      name: 'option', 
      required: true, 
      choices: [ { 
        name: 'true/on', 
        value: 'true' 
      }, 
      { 
        name: 'false/off', 
        value: 'false'
      }
               ], 
    }, 
             ],
  }, 
      { 
        type: 'SUB_COMMAND', 
        description: 'Sets the channel for chatbot', 
        name: 'channel', 
        options : [ { 
          type: 'CHANNEL',
          description: 'Channel for Chatbot',
          name: 'name', 
          required: true,
        }, ], },
        { 
          type: 'SUB_COMMAND', 
          description: 'Shows the chatbot setup', 
          name: 'settings',
        },
      { 
        type: 'SUB_COMMAND', 
        description: 'Disables the chatbot system',
        name: 'disable',
      }, 
           ], 
  userperm: ["MANAGE_CHANNELS"], 
  botperm: ["MANAGE_CHANNELS"],
  /** 
*
* @param {CommandInteraction} interaction
* @param {String[]} args 
*/
  
run: async (bot, interaction, args, message) => { 
  let [ option ] = args
    
  if (option === 'toggle') { 				const punishment = interaction.options.getString('option') 				
    await db.set(`chattgl_${interaction.guild.id}`, punishment); 				
                            return interaction.editReply( 					
                              `The Chatbot for **${ 	
interaction.guild.name 	
}** has been set to: **${punishment}**` 				
                            );
                           }			
  if (option === 'channel') { 				
    const channel = interaction.options.getChannel('name'); 				
    if (!channel) 				
      return interaction.editReply(':x: | **Specify the channel**'); 				
    await db.set(`chatbt_${interaction.guild.id}`, channel.id); 				
    return interaction.editReply( 					'**The chatbot channel has been set to** ' + channel.toString() 		
                                ); 
  }
  if (option === 'setting') { 			
    let chnnl = await db.get(`chatbt_${interaction.guild.id}`) || 'None'; 				
    let toggle = await db.get(`chattgl_${interaction.guild.id}`) || 'None'; 				
    let embed = new MessageEmbed() 					
      .setTitle('Chatbot configuration') 					
      .setAuthor( 						interaction.user.tag, 						interaction.user.avatarURL({ dynamic: true }) 					) 					
      .addField(`Toggle`, toggle) 					
      .addField( 						`Chatbot Channel`, `${chnnl !== 'None' ? `<#${chnnl}>` : 'None'}`) 					
      .setColor('#F4B3CA') 					
      .setFooter( interaction.guild.name, 						interaction.guild.iconURL({ dynamic: true }) 			
                ); 		
    return interaction.editReply({ 
      embeds: [embed] });
  }
  
  if (option === 'disable') { 
    check = await db.get(`chatbt_${interaction.guild.id}`) && await db.get(`chattgl_${interaction.guild.id}`) 				 				
      
    if(!check) { 	
      return interaction.editReply("Please set the required fields first or i cant disable it!!"); 	
    } else { 		
      await db.delete(`chatbt_${interaction.guild.id}`) 
        await db.delete(`chattgl_${interaction.guild.id}`); 		
      return interaction.editReply("Disabled the Chatbot System in the server :)"); 				}
  }
}}