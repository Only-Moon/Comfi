const { CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const Levels = require("discord-xp");
const canvacord = require("canvacord")

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
      
const user = await Levels.fetch(target.id, interaction.guild.id, true);

if (!user) return interaction.editReply("Seems like this user has not earned any xp so far.");
      
const rank = new canvacord.Rank()
        .setAvatar(target.avatarURL({format: 'png', size: 512}))
        .setCurrentXP(user.xp)
        .setRequiredXP(Levels.xpFor(user.level + 1))
        .setRank(user.position)
        .setLevel(user.level)
        .setBackground("IMAGE", "https://media.discordapp.net/attachments/882842239800311828/883994629475819520/rank_card_banner_with_wm.png")
        .setOverlay("#F4B3CA", false)
       // .registerFonts(fontArray)
        .setProgressBar("#F6B5DF")
        .setUsername(target.username)
        .renderEmojis(true)
  .setDiscriminator(target.discriminator);

    rank.build()
        .then(data => {
        const attachment = new MessageAttachment(data, "RankCard.png");
        
interaction.editReply({files: [ attachment ]})
    });

  
} 
}
