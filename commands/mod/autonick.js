const { CommandInteraction, MessageEmbed } = require("discord.js")
const guilds = require("../../models/guild")

module.exports = {
    name: "autonick",
    description: "Auto nick members on join!",
    ownerOnly: false,
    options: [
    {
        name: "nick",
        description: "nickname to set",
        type: "STRING",
        required: true,
    }
    ],  
    botperm: [],
    userperm: ["MANAGE_GUILD"],
    /**
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async(bot, interaction, args) => {
        if(!args.length || args.length >= 32) {
            return interaction.editReply({content: `${bot.crosss} • Please supply a nickname! (FYI: Set the nickname as "none" if you want it to be disabled)`})
        }
        await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
            auto_nick: args.join(" ")
        })

        return interaction.editReply({content: `${bot.tick} • Auto nick has been set! Current value: ${args.join(" ")}`})

    }
}