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
            choices: [ { 
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
        
        if(!args[0]) {
        return interaction.editReply("Please specify something.`Either on/off`")
        };

        const channels = interaction.guild.channels.cache.filter(ch => ch.type !== 'GUILD_CATEGORY');
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
            })
            
            let lockEmbed = new MessageEmbed()
                
                .setThumbnail(`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`)
.setAuthor(`${interaction.guild.name} Modlogs`, interaction.guild.iconURL())                .setDescription(`**\n\nDone! Server Fully Locked! 🔒**`)
                .setColor('#F4B3CA')
            return interaction.editReply({embeds: [ lockEmbed ]});

        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                    SEND_MESSAGES: true
                })
            })
            
            let lockEmbed2 = new MessageEmbed()
                .setColor('#F4B3CA')    
                .setThumbnail(`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`)
.setAuthor(`${interaction.guild.name}`, interaction.guild.iconURL())               .setDescription(`**\n\nDone! Server Fully Unlocked! 🔓**`)
            return interaction.editReply({embeds: [ lockEmbed2 ]})
        }
    }
}