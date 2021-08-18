const { CommandInteraction } = require('discord.js');

module.exports = {
    name: 'qrcode',
    description: 'Generate a qr code from a link',
    options: [
        {
            name: "link",
            description: "The Link to generate a qr code from",
            required: true,
            type: "STRING"

        }
    ],

    /**
     * @param {CommandInteraction} interaction 
     * @param {string[]} args
     */
    run: async (bot, interaction, args) => {
        const { Utils } = require('djs-utils')
        const util = new Utils({
        args: args,
        slashCommand: true,
        interaction: interaction,
        embedFooter: `Requested by ${interaction.member.displayName}`, //The Footer of the embed
        embedTitle: "Generated A QR Code", //The title of the embed
        embedColor: "RANDOM", //The color of the embed! (Use Hex codes or use the color name)
        })
        util.qrcode()
        


    }

}