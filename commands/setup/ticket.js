const ms = require("ms");
const pms = require("pretty-ms");
const { db } = require('../../Database.js');
const simplydjs = require("simply-djs")
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "set-ticket",
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
				let Channel = interaction.options.getChannel('id') || interaction.guild.channels.cache.get(args[0]);
    
    if (Channel.type === "GUILD_CATEGORY") await db.set(`tik_cat${interaction.guild.id}`, Channel.id) 
         interaction.editReply(
					'**The Ticket Category has been set to**' + Channel.toString()
				);
}			
if (option === 'role') {
				let role =
      interaction.options.getRole('role') ||
      bot.guilds.cache.get(interaction.guild.id).roles.cache.get(args[0]) ||
      interaction.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return interaction.editReply("**Please Enter A Valid Role Name or ID!**");
      let a = await db.fetch(`supportrole_${interaction.guild.id}`);

      if (role.id === a) {
        return interaction.editReply(
          "**This Role is Already Set As Supportrole!**"
        );
      } else {
      await db.set(`supportrole_${interaction.guild.id}`, role.id).then
				return interaction.editReply(
          `**\`${role.name}\` Has Been Set Successfully As Supportrole!**`
        );
      };
}

if (option === 'display') {
				simplydjs.ticketSystem(interaction, interaction.channel, { 
    embedDesc: 'Create a new Ticket By Clicking Below',
    embedColor: '#F8B6D4', // default: #075FFFF 
    embedFoot: '', // default: message.guild.name 
    credit: false,
    emoji: '855791964975530004', // default:, 🎫
    color: '', // default: blurple 
    })
}
  }}