const { CommandInteraction, MessageEmbed } = require("discord.js")
const users = require(`../../models/users`)
const guilds = require("../../models/guild")

module.exports = {
    name: "reset_levels",
    description: "Reset Server Level System",
    ownerOnly: false,
    botperm: ["MANAGE_GUILD"],
    userperm: ["ADMINISTRATOR"],
    /**
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async(bot, interaction, args) => {
    
    const guild = await guilds.findOne({guildId: interaction.guild.id})
        
  let [ sub ] = args
  
  if (sub === 'reset') {
    
    if(guild.leveling) {
            interaction.editReply({content: `${bot.cross} • Resetting all user levels.`}).then((msg) => {
                interaction.guild.members.cache.forEach(async (m) => {
                    const user = await users.findOne({userId: m.id, guildId: interaction.guild.id})
                    if(user) {
                        await users.findOneAndUpdate({userId: m.id, guildId: interaction.guild.id}, {
                            level: 0,
                            xp: 0,
                            requiredXp: 1000,
                        })
                    }
                })
                return msg.edit({content: `${bot.tick} • All user levels have been reset!`}).catch(() => null)
            })
            
        } else {
            return interaction.editReply({content: `${bot.crosss} • Please setup leveling before using this command!`}).catch(() => null)
        }
    
  }
    
     }
}