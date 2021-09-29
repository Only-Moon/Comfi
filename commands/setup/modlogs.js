const { CommandInteraction, MessageEmbed } = require("discord.js");
const guilds = require('../../models/guild');
                                        
module.exports = {
    name: "modlogs",
    description: "Sets a Channel Where Bot Can Send Moderation logs!",
    ownerOnly: false,
    options: [
      {
      type: 'SUB_COMMAND',
      name: 'enable',
      description: 'Sets channel for Modlogs',
      options: [
        {
            type: 'CHANNEL',
            description: 'modlogs channel',
            name: 'name',
            required: true,
        },
    ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'disable',
            description: 'Disables the modlogs channel',
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

    let [ subcommand ] = args;
      
      const finalData = { 
        value: undefined, 
        channel: undefined,
        }
      
if (subcommand === 'enable') {
  try {     
 
let channel = interaction.options.getChannel('name') 

 if (channel === 'GUILD_VOICE') return interaction.editReply(`${bot.error} **Please Mention a Text Channel To Set!**`); 
                bot.guilds.cache.get(interaction.guild.id).channels.cache.get(channel.id).send(`${bot.tick} **Modlog Channel Set!**`)
                finalData['channel'] = channel.id
                await guilds.findOneAndUpdate({guildId: interaction.guild.id}, { 
                  modlog: true, 
                  mod_channel: finalData.channel,
                  })
            interaction.editReply(`${bot.tick} **Modlog Channel Has Been Set Successfully in \`${channel.name}\`!**`)
        } catch (e) {
 return interaction.editReply(`**Error - Missing Permissions Or Channel Is Not A Text Channel! \nError: ${e}**`);
        }
    }

if (subcommand === 'disable') {

try {
            let channel = interaction.guild.channels.cache.get(guild.logging_channel)
                bot.guilds.cache.get(interaction.guild.id).channels.cache.get(channel.id).send("**Modlogs Channel Disabled!**")
                await guilds.findOneAndUpdate({guildId: interaction.guild.id}, { 
                  modlog: false,
                })

                interaction.editReply(`${bot.tick} **Modlog Channel Has Been Successfully Disabled in \`${channel.name}\`**`)

        } catch (err) {
            return interaction.editReply(`${bot.error} **Missing Permissions or Channel Doesn't Exist** \n Error: ${err}`)
        }
  
}
      
},
      }