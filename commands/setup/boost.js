const guilds = require("../../models/guild");
const simplydjs = require("simply-djs");
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "boost",
    description: "Sets Boost Detector",
    ownerOnly: false,
    options: [
          {
           type: 'SUB_COMMAND',
           description: 'Boost Settings Menu',
            name: 'settings',
          },
          {
            type: 'SUB_COMMAND',
            description: 'Sets the channel for Boost Detector',
            name: 'channel',            
            options : [
          {
            type: 'CHANNEL',
            description: 'Channel for Boost Detector',
            name: 'name',
            required: true,
        },
              ],
        },
        {
            type: 'SUB_COMMAND',
            description: 'Sets the message for Boost Detector embed',
            name: 'message',            
            options : [
          {
            type: 'STRING',
            description: 'Message for Boosts embed',
            name: 'msg',
            required: true,
        },
              ],
        },      
        {
            type: 'SUB_COMMAND',
            description: 'Boost Help Menu',
            name: 'help',
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
 
const guildID = interaction.guild.id; 
        const messageChannel = interaction.channel; 
        const guild = await schema.findOne({ 
            guildId: interaction.guild.id,
            }); 
     			
if (option === 'settings') {

   const settingEmbed = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Boost Messages`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/boost message or /boost channel`" ) 
                        .addFields( { 
                            name: "» Boost Message", 
                            value: `\`\`\`\n${guild.boost_message}\n\`\`\``,
                            }, 
                            { 
                                name: "» Boost Channel", 
                                value: `<#${guild.boost_channel}>`, 
                                
                            } ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor(bot.color); 
                     interaction.editReply({embeds: [settingEmbed]});
                            }

if (option === 'message'){

const message = interaction.options.getString('msg'); 
       await schema.findOneAndUpdate( { 
                                    guildId: guildID,
                                    }, 
                                    { 
                                    boost_message: message, 
                                        
                                    } ); 
             interaction.editReply({ content: `${bot.tick} • Successfully added the boost message as\n\`\`\`md\n${message}\`\`\`` }); 
                                
                            

}
      
if (option === 'channel') {

const channel = interaction.options.getChannel('name');
				if (!channel)
					return interaction.editReply(`${bot.error} | **Specify the channel**`);
				await schema.findOneAndUpdate( { 
                                    guildId: interaction.guild.id,
                                    },
                                    { 
                                        boost_channel: channel, 
                                        
                                    } );
                                    
          interaction.editReply({ content: `${bot.tick} • Successfully added the boost channel to ${channel}` });
                }

if (option === 'help') {

const helpEmbed1 = new MessageEmbed()
                    .setAuthor( `Help - Boost Detectors`, bot.user.displayAvatarURL({ dynamic: true }) 
                    ) 
                    .setDescription("Here you can get help on how to use the boost system.")
                    .addFields( { 
                        name: "Settings", 
                            value: "The Boost setting menu is very simple! There are 2 things\n `#1)` **Boost Message**\n> Boost messages are the messages that are sent when someone boosts the server. Head over to the next page to see variables that you can use. Command: `/boost message <message>`\n`#2)` **Boost Channel**\n> The channel which the boost message will be sent to! Command: `/boost channel <channel>`",
                            } ) 
                            .setColor(bot.color); 
                            
                            const helpEmbed2 = new MessageEmbed() 
                            .setAuthor( `Help - Boost Detectors`, bot.user.displayAvatarURL({ dynamic: true }) )
                            .setDescription( "Here are some variables that you can use for `Boost Message` Make sure to use curly brackets!\n\n**{user}** - The person who boosted in a proper format, Example: `Moonbow#2003`\n**{user.mention}** - Mentions the user that boosted the server\n**{server}** - The name of the server\n**{boost.count}** - amount of boosts the server has" ) 
                            .setColor(bot.color); 
                            
                            const helpEmbed3 = new MessageEmbed() 
                            .setAuthor( `Help - Boost Detectors`, bot.user.displayAvatarURL({ dynamic: true }) ) 
                            .setDescription("Here you can see how to set up settings")
                           // .setImage( "https://media.discordapp.net/attachments/869823340947316737/869826598147342388/unknown.png?width=747&height=269" ) 
                            .setColor(bot.color); 
                            
                            const helpEmbed4 = new MessageEmbed() .setAuthor( `Help - Boost Detectors`, bot.user.displayAvatarURL({ dynamic: true }) ) 
                            .setDescription("Here is how it will look in Boost Channel.") 
                          //  .setImage( "https://media.discordapp.net/attachments/869823340947316737/869827463105101844/unknown.png" )
                            .setColor(bot.color);
                            
const pages = [helpEmbed1, helpEmbed2, helpEmbed3, helpEmbed4]; 
                            
simplydjs.embedPages(bot, interaction, pages, {
slash: true,
firstEmoji: '884420649580363796', 
backEmoji: '884421503205134356',
delEmoji: '884422849505415228', 
forwardEmoji: '884421235965059113', 
lastEmoji: '884420650549272586', 
btncolor: 'SECONDARY',
delcolor: 'SECONDARY', 
skipcolor: 'SECONDARY', 
skipBtn: true,
}) 
}

}}
  