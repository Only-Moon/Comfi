const { CommandInteraction, MessageEmbed } = require("discord.js");
const guilds = require('../../models/guild');
                                        
module.exports = {
    name: "coleave",
    description: "Removes user's xp upon leaving the guild!",
    ownerOnly: false,
    options: [
      {
      type: 'STRING',
      name: 'toggle',
      description: 'Sets channel for Modlogs', 
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
    userperm: ["MANAGE_GUILD"],
    botperm: ["MANAGE_GUILD"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

    const toggle = interaction.options.getString('toggle') 				
    await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                 leveling_coleave: toggle
                }) 				
                            return interaction.editReply( 					
                              `Coleave for **${ 	
interaction.guild.name 	
}** has been set to: **${toggle}**` 				
                            ).catch( (err) => {
   return interaction.editReply(`${bot.error} An error has occured. \nError: ${err} \n [Contact Support](https://comfibot.tk/discord)`)                           
                            });
      
},
      }