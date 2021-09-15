const ms = require("ms");
const pms = require("pretty-ms");
const { db } = require('../../Database.js');
const simplydjs = require("simply-djs")
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "modmail",
    description: "Setup the modmail system",
    ownerOnly: false,
    options: [
        {
            type: 'SUB_COMMAND',
            description: 'Sets the category for ticket system',
            name: 'category',            
            options : [
          {
            type: 'CHANNEL',
            description: 'Category id to open mails',
            name: 'id',
            required: true,
        },
              ],
        },
        {
            type: 'SUB_COMMAND',
            description: 'Sets the support role for modmail',
            name: 'role',
            options: [
            {
            type: 'ROLE',
            description: 'Support role for tickets',
            name: 'name',
            required: true,
            },
            ],
        },
        {
            type: 'SUB_COMMAND',
            description: 'Toggles Modmail on/off',
            name: 'toggle',
            options: [
            {
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
          description: 'Shows the chatbot setup', 
          name: 'settings',
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

let [ option ] = args
      
if (option === 'category') {
				let Channel = interaction.options.getChannel('id') || interaction.guild.channels.cache.get(args[0]);
    
    if (Channel.type === "GUILD_CATEGORY") {
      await db.set(`mod_category_${interaction.guild.id}`, Channel.id) 
         interaction.editReply(
					'**The Modmail Category has been set to**' + Channel.toString()
				);
    } else {
    return interaction.editReply("<a:Attention:883349868062576701> Please Enter a valid category id")
    }
}			
if (option === 'role') {
				let role =
      interaction.options.getRole('name') ||
      bot.guilds.cache.get(interaction.guild.id).roles.cache.get(args[0]) ||
      interaction.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return interaction.editReply("**Please Enter A Valid Role Name or ID!**");
      let a = await db.get(`mod_support_${interaction.guild.id}`);

      if (role.id === a) {
        return interaction.editReply(
          "<a:Attention:883349868062576701> **This Role is Already Set As Supportrole!**"
        );
      } else {
      await db.set(`mod_support_${interaction.guild.id}`, role.id).then
				return interaction.editReply(
          `**\`${role.name}\` Has Been Set Successfully As Supportrole!**`
        );
      };
}

if (option === 'toggle') {
				const toggle = interaction.options.getString('option')
				await db.set(`mod_toggle_${interaction.guild.id}`, toggle);
				return interaction.editReply(
					`The Modmailfor **${
						interaction.guild.name
					}** has been set to: **${toggle}**`
				);
}

if (option === 'settings') {

 let chnnl = await db.get(`mod_category_${interaction.guild.id}`) || 'None'; 				
    let toggle = await db.get(`mod_toggle_${interaction.guild.id}`) || 'None'; 
   let role = await db.get(`mod_support_${interaction.guild.id}`) || 'None';
    let embed = new MessageEmbed() 					
      .setTitle('Modmail Settings') 					
      .setAuthor( 						interaction.user.tag, 						interaction.user.avatarURL({ dynamic: true }) 					) 					
      .addField(`Toggle`, toggle) 					
      .addField( 						
`Support Channel`, `${chnnl !== 'None' ? `<#${chnnl}>` : 'None'}`)
			.addField(`Support Role`, `<@${role}>`)		
      .setColor('#F4B3CA') 					
      .setFooter( interaction.guild.name, 						interaction.guild.iconURL({ dynamic: true })
                );	
    return interaction.editReply({ 
      embeds: [embed] });
  
}
  }}