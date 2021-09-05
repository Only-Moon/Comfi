const { Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'drake',
    description: 'the drake meme',
    perm: ['SEND_MESSAGES'],
    userperms: ["SEND_MESSAGES"],
    ownerOnly: false,
    options: [
        {
            name: 'line_1',
            type: 'STRING',
            description: 'WHAT am i putting in fist line',
            required: true
        },
        {
            name: 'line_2',
            type: 'STRING',
            description: 'WHAT am i putting in the second line',
            required: true
        }
    ],
    /** 
     * @param {Message} message     
     * @param {String[]} args 
     */
    run: async (bot, interaction, args, message) => {
        const text1 = args[0];
        const text2 = args.slice(1).join(" ")

        const finalLink = 'https://luminabot.xyz/api/image/drake?yes=' + encodeURIComponent(text2) + '&no=' + encodeURIComponent(text1)

        const attach = new MessageAttachment(finalLink, 'drake.png')

        interaction.followUp({ files: [attach] });
    }
}
