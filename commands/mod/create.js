const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "create",
    description: "Create text, voice channel or category in the server",
    ownerOnly: false,
    options: [
        {
            type: 'SUB_COMMAND',
            description: 'Create a new category',
            name: 'category',            
            options : [
          {
            type: 'STRING',
            description: 'Name of the Category',
            name: 'name',
            required: true,
        },
              ],
        },
        {
            type: 'SUB_COMMAND',
            description: 'Create a new text channel',
            name: 'text',
            options: [
            {
            type: 'STRING',
            description: 'Name of the Text Channel',
            name: 'name',
            required: true,
            },
            ],
        },
        {
            type: 'SUB_COMMAND',
            description: 'Creates a new voice channel',
            name: 'voice',
            options: [
              {
            type: 'STRING',
            description: 'Name of the Voice Channel',
            name: 'name',
            required: true,
              }
            ]
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
      
if (option === 'category') {

const name = args[0] || interaction.options.getString('name'); 

const newChannel = interaction.guild.channels.create(`${name}`, { 
type: "GUILD_CATEGORY", 
reason: `requested by ${interaction.user.tag}`, 
});

 const embed = new MessageEmbed() 
.setTitle(`Channel Created!`) 
.setDescription(`Created a category channel with the name: ${name}`) 
.setColor("#F4B3CA") 

interaction.editReply({embeds: [embed]}); 
  
}

if (option === 'channel') {

const name = args[0] || interaction.options.getString('name'); 

const newChannel = interaction.guild.channels.create(`${name}`, { 
type: "GUILD_TEXT", 
reason: `requested by ${interaction.user.tag}`, 
});

 const embed = new MessageEmbed() 
.setTitle(`Channel Created!`) 
.setDescription(`Created a category channel with the name: ${name}`) 
.setColor("#F4B3CA") 

interaction.editReply({embeds: [embed]});
  
}

if (option === 'voice') {

const name = args[0] || interaction.options.getString('name'); 

const newChannel = interaction.guild.channels.create(`${name}`, { 
type: "GUILD_VOICE", 
reason: `requested by ${interaction.user.tag}`, 
});

 const embed = new MessageEmbed() 
.setTitle(`Channel Created!`) 
.setDescription(`Created a category channel with the name: ${name}`) 
.setColor("#F4B3CA") 

interaction.editReply({embeds: [embed]});

} 

    }}   