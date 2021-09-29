const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "lock",
    description: "Locks a channel",
    ownerOnly: false,
    userperm: ["MANAGE_CHANNELS"],
    botperm: ["MANAGE_CHANNELS"],
    options: [
        {
            type: 'CHANNEL',
            description: 'Channel to lock',
            name: 'channel',
            required: false,
        },
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

        let channel = interaction.channel || interaction.options.getUser('channel')

        try {
            interaction.guild.roles.cache.forEach(role => {
  
              channel.permissionOverwrites.create(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e);
        }
let embed = new MessageEmbed()
        .setDescription(`${bot.tick} Done | ${channel} Locked`)
        .setColor(bot.color);
        interaction.editReply({embeds: [ embed ]});
    }
}