const guilds = require('../../models/guild');  
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
      choices: [ 
     { 
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
        options : [ 
        { 
          type: 'CHANNEL',
          description: 'Channel for Chatbot',
          name: 'name', 
          required: true,
          channelTypes: ["GUILD_TEXT"],
        }, 
        ], 
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
  
run: async (bot, interaction, args) => { 
  let [ option ] = args

    const guild = await guilds.findOne({guildId: interaction.guild.id})
  
  if (option === 'toggle') { 				const toggle = interaction.options.getString('option') 				
    await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                    chatbot: toggle
                }) 				
                            return interaction.editReply( 					
                              `The Chatbot for **${ 	
interaction.guild.name 	
}** has been set to: **${toggle}**` 				
                            );
                           }			
  if (option === 'channel') { 				
    const channel = interaction.options.getChannel('name'); 				
    if (!channel) 				
      return interaction.editReply(`${bot.error} **Specify the channel**`); 				
   await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                    chat_channel: channel,
                }) 				
    return interaction.editReply( 					'**The chatbot channel has been set to** ' + channel.toString() 		
                                ); 
  }
  
  if (option === 'disable') { 
    if(!guild.chatbot) { 	
      return interaction.editReply(`${bot.error} Please set the required fields first or i cant disable it!!`); 	
    } else { 		
      await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                    chatbot: false,
                    chat_channel: "NONE",
                }) 		
      return interaction.editReply("Disabled the Chatbot System in the server :)"); 				}
  }
}}