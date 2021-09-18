const { CommandInteraction, MessageEmbed } = require("discord.js");
const { db } = require('../../Database.js');
                                        
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
      
if (subcommand === 'enable') {
  try {     
 
let channel = interaction.options.getChannel('name') 

 if (channel === 'GUILD_VOICE') return interaction.editReply(`${bot.error} **Please Mention a Text Channel To Set!**`); 
                bot.guilds.cache.get(interaction.guild.id).channels.cache.get(channel.id).send("**Modlog Channel Set!**")
                await db.set(`modlog_${interaction.guild.id}`, channel.id)
            interaction.editReply(`**Modlog Channel Has Been Set Successfully in \`${channel.name}\`!**`)
        } catch {
            return interaction.editReply("**Error - `Missing Permissions Or Channel Is Not A Text Channel!`**");
        }
    }

if (subcommand === 'disable') {

try {
            let a = await db.get(`modlog_${interaction.guild.id}`)

            if (!a) {
                return interaction.editReply(`${bot.error} **There Is No Modlog Channel Set To Disable!**`)
            } else {
                let channel = interaction.guild.channels.cache.get(a)
                bot.guilds.cache.get(interaction.guild.id).channels.cache.get(channel.id).send("**Modlogs Channel Disabled!**")
                await db.delete(`modlog_${interaction.guild.id}`)

                interaction.editReply(`**Modlog Channel Has Been Successfully Disabled in \`${channel.name}\`**`)
            }
            return;
        } catch (err) {
            return interaction.editReply(`**Missing Permissions or Channel Doesn't Exist** \n Error: ${err}`)
        }
  
}
      
},
      }