/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require("discord.js");
const simplydjs = require("simply-djs")

module.exports = {
    name: "ttt",
    description: "Simple Tictactoe Game",
    directory: "fun",
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'User to Compete in ttt',
            name: 'user',
            required: true,
        },
    ],
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
run: async (bot, interaction, args) => {

try { 
  
simplydjs.tictactoe(interaction, {    
  slash: true,    
  xEmoji: '883765945393365043',    
  oEmoji: '883766798321864705',    
  idleEmoji: '883765946823630918',    
  embedColor: bot.color,    
  embedFoot: 'Tictactoe',
  credit: false
  })

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
  
    }
}