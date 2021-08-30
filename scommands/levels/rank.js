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
    run: async (bot, interaction, args, message) => {
    
//const target = interaction.guild.members.cache.get(args[0]) || args[0] || interaction.user;

const target = interaction.options.getUser('user') || interaction.user;
      
const user = await Levels.fetch(target.id, interaction.guild.id, true);

if (!user) return interaction.editReply("Seems like this user has not earned any xp so far.");
   
const rank = new canvacord.Rank()
        .setAvatar(target.displayAvatarURL({format: 'png', size: 512}))
        .setCurrentXP(user.xp)
        .setRequiredXP(Levels.xpFor(user.level + 1))
        .setRank(user.position)
        .setLevel(user.level)
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