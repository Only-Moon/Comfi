const { CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord")
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
    member: user, 
    level: user.level,
    currentXP: user.xp, 
    neededXP: user.requiredXp,
    rank: '', 
    background: ''
  })
  
/*
const rank = new canvacord.Rank()
        .setAvatar(target.avatarURL({format: 'png', size: 512}))
        .setCurrentXP(user.xp)
        .setRequiredXP(user.requiredXp)
        .setRank(0, "level", false)
        .setLevel(user.level)
        .setBackground("IMAGE", "https://media.discordapp.net/attachments/882842239800311828/885464221666652160/rank_card_banner.png")
        .setOverlay("#F54D94", true)
        .setProgressBar("#F6B5DF")
        .setUsername(target.username)
        .renderEmojis(true)
  .setDiscriminator(target.discriminator);

    rank.build()
        .then(data => {
        const attachment = new MessageAttachment(data, "RankCard.png");
        
interaction.editReply({files: [ attachment ]})
    });
*/
}
} 
      
}}
