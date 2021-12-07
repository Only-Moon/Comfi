const { CommandInteraction } = require("discord.js");
const { Slash } = require('djs-misc')

module.exports = {
    name: "roast",
    description: "roast someone",
    ownerOnly: false,
    options: [
        {
            name: "user",
            description: "Who do you want to roast",
            required: false,
            type: "USER"
        }
    ],
    userperm: [""],
    botperm: [""],

run: async (bot, interaction, args) => {

        const slash = new Slash({
            args: args,
            slashCommand: true,
            interaction: interaction,
            embedFooter: `Requested by ${interaction.member.displayName}`, //The Footer of the embed
            embedTitle: "Get Roasted!", //The title of the embed
            embedColor: bot.color, //The color of the embed! (Use Hex codes or use the color name)
        })
        slash.roast()



    },
};
