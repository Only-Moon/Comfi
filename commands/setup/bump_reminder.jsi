const guilds = require('../../models/guild');  
const { CommandInteraction, MessageEmbed } = require("discord.js"); 

module.exports = { 
  name: "bumpsystem", 
  description: "Sets the disboard bump reminder", 
  ownerOnly: false, 
  options: [ { 
    type: 'SUB_COMMAND', 
    description: 'Sets the bump toggle true/false', 
    name: 'toggle', 
    options: [ { 
      type: 'STRING', 
      description: 'Toggle bump reminder', 
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
        description: 'Sets the channel for bump reminders', 
        name: 'channel', 
        options : [ { 
          type: 'CHANNEL',
          description: 'Channel for bump reminder',
          name: 'name', 
          required: true,
        }, ], },
      { 
        type: 'SUB_COMMAND', 
        description: 'Disables the bump reminder system',
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
  
  if (option === 'toggle') { 				
    const toggle = interaction.options.getString('option') 				
    await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                    bump: toggle
                }) 				
                            return interaction.editReply( 					
                              `The Bump Reminder for **${ 	
interaction.guild.name 	
}** has been set to: **${toggle}**` 				
                            );
                           }			
  if (option === 'channel') { 				
    const channel = interaction.options.getChannel('name'); 				
    if (!channel) 				
      return interaction.editReply(`${bot.error} **Specify the channel**`); 				
   await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                    bump_channel: channel,
                }) 				
    return interaction.editReply( 					'**The bump reminder channel has been set to** ' + channel.toString() 		
                                ); 
  }
  
  if (option === 'disable') { 
    if(!guild.bump) { 	
      return interaction.editReply(`${bot.error} Please set the required fields first or i cant disable it!!`); 	
    } else { 		
      await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                    bump: false,
                    bump_channel: "NONE",
                }) 		
      return interaction.editReply(`${bot.tick} • Disabled the Bump Reminder System in the server :)`); 			
      }
  }
}}