/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, EmbedBuilder } = require("discord.js")
const users = require(`../../models/users`)
const guilds = require("../../models/guild")

module.exports = {
  name: "leaderboard",
  description: "See the servers level leader board",
  directory: "level",
  ownerOnly: false,
  botperm: [""],
  userperm: ["SEND_MESSAGES"],
  /** 
* @param {CommandInteraction} interaction 
* @param {String[]} args
*/

  run: async (bot, interaction, args) => {
    const guild = await guilds.findOne({ guildId: interaction.guild.id })
    
    const rep = bot.emoji("reply")
    const dot = bot.emoji("bunny_cs")
    const one = bot.emoji("_1_HE")
    const two = bot.emoji("_2_HE")
    const three = bot.emoji("_3_HE")
             
    if (guild.leveling) {
      let members = []
      const memb = await interaction.guild.members.fetch()
      memb.forEach(async (m) => {     
        const user = await users.findOne({
          guildId: interaction.guild.id,
          userId: m.id
        })

        if (user) {
          if (user.level >= 0) {
            members.push({
              level: user.level,
              user: m.id,
              xp: user.xp,
              requiredXp: user.requiredXp
            })
          }
        }
      })

     await interaction.editReply({ content: `${bot.tick} • Generating leaderboard `}).then((msg) => {
        setTimeout(() => {
          let top10 = []
          let pos = 1
          members.sort((a, b) => b.level - a.level).map((m, i) => {
            const mem = interaction.guild.members.cache.find(x => x.id === m.user)
            
            const emojis = [`${one}`, `${two}`, `${three}`];
            
            top10.push(`**${emojis[i] || dot} #${pos++})** \`\`\`${mem.user.username}\`\`\` \n${rep}**Level: ** \`\`\`${m.level}\`\`\`\n${rep}**Xp: ** \`\`\`${shortener(m.xp)}/${shortener(m.requiredXp)}\`\`\``)
    
          })
          msg.delete().catch(() => null)
          
          const embed = new EmbedBuilder()
            .setAuthor({name:`${interaction.guild.name}'s ranking leaderboard! (Top 15)`, iconURL: interaction.guild.iconURL({ dynamic: true })})
            .setDescription(top10.slice(0, 15).join("\n"))
            .setFooter({text: `Requested by ${interaction.member.displayName}`, iconURL:  interaction.user.avatarURL({dynamic: true})})
            .setColor(bot.color);
          return msg.channel.send({ embeds: [embed] })
        }, 2000);
      })
    } else {
        return await  bot.errorEmbed(bot, interaction, `Server levels are not enabled!` )
    }
  }
} 
  function shortener(count) {
    const COUNT_ABBRS = ['', 'k', 'M', 'T']

    const i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000))
    let result = parseFloat((count / Math.pow(1000, i)).toFixed(2))
    result += `${COUNT_ABBRS[i]}`
    return result
  }