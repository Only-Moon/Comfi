const { CommandInteraction, MessageEmbed } = require("discord.js")
const users = require(`../../models/users`)
const guilds = require("../../models/guild")

module.exports = {
    name: "leaderboard",
    description: "See the servers level leader board",
    ownerOnly: false,
    botperm: ["SEND_MESSAGES"],
    userperm: [],
    /**
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async(bot, interaction, args) => {
        const guild = await guilds.findOne({guildId: interaction.guild.id})
        if(guild.leveling) {
            let members = []
            interaction.guild.members.cache.forEach(async (m) => {
                const user = await users.findOne({guildId: interaction.guild.id, userId: m.id})
                if(user) {
                   if(user.level >= 0) {
                    members.push({
                        level: user.level,
                        user: m.id,
                    })
                   }
                }
})       
            interaction.editReply({content: `${bot.tick} • Generating leaderboard `}).then((msg) => {
                
                setTimeout(() => {
                    let top10 = []
                    let pos = 1
                    members.sort((a, b) => b.level - a.level).forEach((m) => {
                        const mem = interaction.guild.members.cache.find(x => x.id === m.user)
                        top10.push(`**#${pos++})** ${mem} • ${m.level}`)
                    })

                    msg.delete()
                    
  const embed = new MessageEmbed()
                    .setAuthor(`${interaction.guild.name}'s ranking leaderboard! (Top 10)`, interaction.guild.iconURL({dynamic: true}))
                    .setDescription(top10.join("\n"))
                    .setFooter(`Only shows top 10 members!`)
                    .setColor(bot.color)
    
                    return msg.channel.send({embeds: [embed]})
                }, 2000);
             

            })
            
        } else {
            return interaction.editReply({content: `${bot.crosss} • Server levels are not enabled!`})
        }
    }
}