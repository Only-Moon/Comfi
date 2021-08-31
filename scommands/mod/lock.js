const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "lock",
    description: "Locks a server",
    ownerOnly: false,
    userperm: ["MANAGE_SERVER"],
    botperm: ["MANAGE_SERVER"],
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
        .setDescription(`Done | ${channel} Locked`)
        .setColor('#FF6868');
        interaction.editReply({embeds: [ embed ]});
    }
}