/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require("discord.js");
const guilds = require('../../models/guild');
                                        
module.exports = {
    name: "coleave",
    description: "Removes user's xp upon leaving the guild!",
   directory: "level",
    ownerOnly: false,
    options: [
      {
      type: 'STRING',
      name: 'toggle',
      required: true,
      description: 'Sets the toggle for coleave', 
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

try {
      
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

    } catch (e) {
			let emed = new MessageEmbed()
				.setTitle(`${bot.error} • Error Occured`)
				.setDescription(`\`\`\`${e.stack}\`\`\``)
				.setColor(bot.color)

			bot.sendhook(null, {
				channel: bot.err_chnl,
				embed: emed
			})

			interaction.followUp({
				embeds: [
					{
						description: `${
							bot.error
						} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
						color: bot.color
					}
				]
			})
}
      
},
      }