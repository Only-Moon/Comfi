const { CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const guilds = require("../../models/guild")
const users = require("../../models/users")
const rankCard = require("../../functions/RankCard")

module.exports = {
    name: "rank",
    description: "check your rank",
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'user to check rank for',
            name: 'user',
            required: false,
        },
    ],
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

const target = interaction.options.getUser('user') || interaction.user;

const guild = await guilds.findOne({guildId: interaction.guild.id}) 

const user = await users.findOne({guildId: interaction.guild.id, userId: target.id})
     
if (!user) {

interaction.editReply(`${bot.error} User haven't Leveled Up yet or User is a Bot`)

} else {
      
if(guild.leveling) {

rankCard(bot, interaction, {
    slash: true,
    member: target, 
    level: user.level,
    rank: user.level,
    color: bot.color,
    currentXP: user.xp, 
    neededXP: user.requiredXp,
    background: "https://i.imgur.com/rkGiaIO.png"
  })
  

} else {
  interaction.editReply(`${bot.error} Leveling is Disabled In this guild`)
}
} 
      
}}
