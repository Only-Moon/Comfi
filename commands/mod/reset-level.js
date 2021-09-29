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
  
  if (sub === "add") {
    
    const level = interaction.options.getInteger("level")
    
        if(guild.leveling) {
            const member = interaction.options.getMember("user") ||
            interaction.guild.members.cache.find(m => m.id === level[0] || m.user.username.toLowerCase() === level[0].toLowerCase())
            if(!member) {
                return interaction.editReply({content: `${bot.crosss} • Please supply a valid member!`})
            }
            
            const user = await users.findOne({userId: member.id, guildId: interaction.guild.id})
            if(!user) {
                return interaction.editReply({content: `${bot.crosss} • This user has no levels saved!`})
            }
            if(!level) {
                return interaction.editReply({content: `${bot.crosss} • Please supply an amount of levels!`})
            }
            if(isNaN(level)) {
                return interaction.editReply({content: `${bot.crosss} • Please supply a valid level amount!`})
            }
            await users.findOneAndUpdate({userId: member.id, guildId: interaction.guild.id}, {
                level: Number(user.level) + (level)
            })
            return interaction.editReply({content: `${bot.tick} • ${member} has been given ${level} levels!`})

        } else {
            return interaction.editReply({content: `${bot.crosss} • Please setup leveling before using this command!`})
        }
    }
    
  if (sub === "remove") {
    
    const level = interaction.options.getInteger("level")
    
        if(guild.leveling) {
            const member = interaction.options.getMember("user") ||
            interaction.guild.members.cache.find(m => m.id === level[0] || m.user.username.toLowerCase() === level[0].toLowerCase())
            if(!member) {
                return interaction.editReply({content: `${bot.crosss} • Please supply a valid member!`})
            }
            const user = await users.findOne({userId: member.id, guildId: interaction.guild.id})
            if(!user) {
                return interaction.editReply({content: `${bot.crosss} • This user has no levels saved!`})
            }
            if(!level) {
                return interaction.editReply({content: `${bot.crosss} • Please supply an amount of levels!`})
            }
            if(isNaN(level)) {
                return interaction.editReply({content: `${bot.crosss} • Please supply a valid level amount!`})
            }
            await users.findOneAndUpdate({userId: member.id, guildId: interaction.guild.id}, {
                level: Number(user.level) - (level)
            })
            return interaction.editReply({content: `${bot.tick} • ${member} has been stripped of ${level} levels!`})
console.log(level[1])
        } else {
            return interaction.editReply({content: `${bot.crosss} • Please setup leveling before using this command!`})
        }
    
  }
  
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
                return msg.edit({content: `${bot.tick} • All user levels have been reset!`})
            })
            
        } else {
            return interaction.editReply({content: `${bot.crosss} • Please setup leveling before using this command!`})
        }
    
  }
    
     }
}