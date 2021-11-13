const guilds = require('../../models/guild');
const simplydjs = require("simply-djs")
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ticket",
    description: "Setup the ticket system",
    ownerOnly: false,
    options: [
        {
            type: 'SUB_COMMAND',
            description: 'Sets the category for ticket system',
            name: 'category',            
            options : [
          {
            type: 'CHANNEL',
            description: 'Category id to open tickets',
            channelTypes: ["GUILD_CATEGORY"],
            name: 'id',
            required: true,
        },
              ],
        },
        {
            type: 'SUB_COMMAND',
            description: 'Sets the support role for ticket system',
            name: 'role',
            options: [
            {
            type: 'ROLE',
            description: 'Support role for tickets',
            name: 'role',
            required: true,
            },
            ],
        },
        {
            type: 'SUB_COMMAND',
            description: 'Sends the ticket panel',
            name: 'display',
        },
        {
            type: 'SUB_COMMAND',
            description: 'Disables ticket system',
            name: 'disable',
        },
    ],
    userperm: ["MANAGE_GUILD"],
    botperm: ["MANAGE_GUILD"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {

let [ option ] = args
      
if (option === 'category') {
				let Channel = interaction.options.getChannel('id') || interaction.guild.channels.cache.get(args[0]);
    
if (Channel.type === "GUILD_CATEGORY"){ 
await guilds.findOneAndUpdate({guildId: interaction.guild.id}, { 
                  ticket: true, 
                  ticket_category: Channel.id,
                  }) 
         interaction.editReply(
					'**The Ticket Category has been set to**' + Channel.toString()
				);
    } else return interaction.editReply({content: `${bot.error} Provide a Valid Category Id`})
}		
      
if (option === 'role') {
				let role =
      interaction.options.getRole('role') ||
      bot.guilds.cache.get(interaction.guild.id).roles.cache.get(args[0]) ||
      interaction.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return interaction.editReply(`${bot.error} **Please Enter A Valid Role Name or ID!**`);

await guilds.findOneAndUpdate({guildId: interaction.guild.id}, { 
                  ticket_role: role.id,
                  })
				return interaction.editReply(
          `**\`${role.name}\` Has Been Set Successfully As Supportrole!**`
        );
      };

if (option === 'display') {
				simplydjs.ticketSystem(interaction, interaction.channel, { 
    embedDesc: 'Create a new Ticket By Clicking Below',
    embedColor: bot.color, // default: #075FFFF 
    embedFoot: '', // default: message.guild.name 
    credit: false,
    emoji: '855791964975530004', // default:, 🎫
    color: 'SECONDARY', // default: blurple 
    })
}

if (option === 'disable') {

await guilds.findOneAndUpdate({guildId: interaction.guild.id}, { 
                  ticket: false,
                  })
  interaction.editReply({content: `${bot.tick} • Disabled Ticket System for this guild`})
}
      
  }}