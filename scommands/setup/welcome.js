const ms = require("ms");
const pms = require("pretty-ms");
const { db } = require('../../Database.js');
const simplydjs = require("simply-djs")
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "welcome",
    description: "Sets the welcome system",
    ownerOnly: false,
    options: [
          {
           type: 'SUB_COMMAND',
           description: 'Sets the greet toggle true/false',
           name: 'welztoggle',
           options: [
            {
            type: 'STRING',
            description: 'Toggle greet',
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
           description: 'Sets the greet embed toggle true/false',
           name: 'embed-toggle',
           options: [
            {
            type: 'STRING',
            description: 'Toggle greet embed',
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
            description: 'Sets the channel for welcome',
            name: 'channel',            
            options : [
          {
            type: 'CHANNEL',
            description: 'Channel for Chatbot',
            name: 'name',
            required: true,
        },
              ],
        },
        {
            type: 'SUB_COMMAND',
            description: 'Sets the greet embed description',
            name: 'description',
        },
        {
            type: 'SUB_COMMAND',
            description: 'Sets the greet embed footer',
            name: 'footer',
        },
      {
            type: 'SUB_COMMAND',
            description: 'Sets the greet embed color, eg: #fffff',
            name: 'color',
        },
        {
            type: 'SUB_COMMAND',
            description: 'Sets the greet embed image/banner',
            name: 'image',
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
      
if (option === 'toggle') {

const punishment = interaction.options.getString('option')
				await db.set(`Weltog_${interaction.guild.id}`, punishment);
				return interaction.editReply(
					`The Welcome Toggle for **${
						interaction.guild.name
					}** has been set to: **${punishment}**`
				);
  
}			
if (option === 'embed-toggle') {

const punishment = interaction.options.getString('option')
				await db.set(`Welemtog_${interaction.guild.id}`, punishment);
				return interaction.editReply(
					`The Welcome Embed Toggle for **${
						interaction.guild.name
					}** has been set to: **${punishment}**`
				);
  
}

if (option === 'channel') {

const channel = interaction.options.getChannel('name');
				if (!channel)
					return interaction.editReply(':x: | **Specify the channel**');
				await db.set(`chatbt_${interaction.guild.id}`, channel.id);
				return interaction.editReply(
					'**The chatbot channel has been set to** ' + channel.toString()
				);
  
}

if (option === 'description') {



}

if (option === 'footer') {


  
}

if (option === 'color') {


  
}

if (option === 'image') {



}
  }}