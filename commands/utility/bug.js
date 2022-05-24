/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed, Modal, MessageActionRow,  TextInputComponent } = require('discord.js')

module.exports = {
	name: 'bugreport',
	description: 'Report a bug',
  directory: "utility",
	ownerOnly: false,
  modal: true,
	userperm: [''],
	botperm: [''],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
const modal = new Modal()
			.setCustomId('Bug')
			.setTitle(`Comfi™ Bug Report`)
		    .addComponents(
			    new MessageActionRow().addComponents(
              new TextInputComponent()
                .setCustomId('title')
                .setLabel(`Title for The bug`)
                .setStyle("SHORT")
             ),
            new MessageActionRow().addComponents(
			        new TextInputComponent()
			        .setCustomId('description')
			        .setLabel(`Sumbit Comfi's Bug Report Here`)
			        .setStyle('PARAGRAPH')
			    )
)
		await interaction.showModal(modal);
    
	}
}
