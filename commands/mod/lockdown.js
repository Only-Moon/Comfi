const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "lockdown",
    description: "Locks whole server incase of raids, etc",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'enable or disable server lockdown',
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
    userperm: ["MANAGE_CHANNELS"],
    botperm: ["MANAGE_CHANNELS"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

try {

let arg = interaction.options.getString("option")
  
        const channels = interaction.guild.channels.cache.filter(ch => ch.type !== 'GUILD_CATEGORY');
        if (arg === 'true') {
            channels.forEach(channel => {
                channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).catch((e) => {
        bot.sendhook(
          `Error Occured \n ${e.stack}`
        ), {
          channel: bot.err_chnl
        } 
        interaction.followUp({
          embeds: [
            {
        description: `${bot.error} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
        color: bot.color,  
           },
        ]
        });
        })
            })
            
            let lockEmbed = new MessageEmbed()
                
                .setThumbnail(`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`)
.setAuthor(`${interaction.guild.name} Modlogs`, interaction.guild.iconURL())                .setDescription(`**\n\n${bot.tick} • Done! Server Fully Locked! 🔒**`)
                .setColor(bot.color)
            return interaction.editReply({embeds: [ lockEmbed ]});

        } else if (arg === 'false') {
            channels.forEach(channel => {
                channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                    SEND_MESSAGES: true
                })
            })
            
            let lockEmbed2 = new MessageEmbed()
                .setColor(bot.color)    
                .setThumbnail(`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`)
.setAuthor(`${interaction.guild.name}`, interaction.guild.iconURL())               .setDescription(`**\n\n${bot.tick} • Done! Server Fully Unlocked! 🔓**`)
            return interaction.editReply({embeds: [ lockEmbed2 ]})
        }

     } catch (e) {
        bot.sendhook(
          `Error Occured \n ${e.stack}`
        ), {
          channel: bot.err_chnl
        } 
        interaction.followUp({
          embeds: [
            {
        description: `${bot.error} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
        color: bot.color,  
           },
        ]
        });
        }
  
    }
}