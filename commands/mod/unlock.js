const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "unlock",
    description: "Unlocks the Channel",
    ownerOnly: false,
    options: [
        {
            type: 'CHANNEL',
            description: 'Channel to Unlock',
            name: 'channel',
            required: false,
        },
    ],
    userperm: ["MANAGE_MESSAGES"],
    botperm: ["MANAGE_MESSAGES"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
        
        let channel = interaction.channel || interaction.options.getUser('channel');

        try {
            interaction.guild.roles.cache.forEach(role => {
                channel.permissionOverwrites.create(role, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
            });
        } catch (e) {
            console.log(e);
        }

        let embed = new MessageEmbed()
        .setDescription(`${bot.tick} Done | ${channel} Unlocked`)
        .setColor(bot.color);
        interaction.editReply({embeds: [ embed ]});
    }
}