const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "deafan",
    description: "Deafen a member in Voice Channel",
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'user to deafen',
            name: 'user',
            required: true,
        },
      {
            type: 'STRING',
            description: 'reason to deafen',
            name: 'reason',
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

        if(!member) return interaction.editReply("Unable to find the mentioned user in this guild.")

        let reason = args.slice(1).join(" ");

        try {
            member.voice.setDeaf(true, reason);
            interaction.editReply(`${bot.tick} • Deafened ${member.user.username} `)
     } catch (err) {

return interaction.editReply(`${bot.error} An error has occured. \nError: ${err} \n [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord)`)
    }

    }
}