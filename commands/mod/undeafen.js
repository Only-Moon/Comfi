const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "undeafen",
    description: "Undeafen a member in a voice channel",
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'User to undeafen',
            name: 'user',
            required: true,
        },
    ],
    userperm: ["DEAFEN_MEMBERS"],
    botperm: ["DEAFEN_MEMBERS"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

        let member = interaction.options.getMember('user') || interaction.guild.members.cache.get(args[0]) || interaction.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return interaction.editReply(`${bot.crosss} • Unable to find the mentioned user in this guild.`)

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No Reason Provided"


        try {
            member.voice.setDeaf(false, reason);
            interaction.editReply(`Success ${bot.tick} : Member Undeafened`)
        } 
        
        catch (error) {
            interaction.editReply("Oops! An unknow error occured. Please try again later.")
        }

    }
}