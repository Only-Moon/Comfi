const { CommandInteraction, MessageEmbed} = require("discord.js");

module.exports = {
    name: "quote",
    description: "Get Anime qoutes",
    options: [
        { 
            name: 'name', 
            description: "which anime do you want the quote from",
            type: "STRING",
            required: false,
        }
    ],
    userperm: [""],
    botperm: [""],

run: async (bot, interaction, args) => {
        const [title] = args 
        if(!title){
        const { Slash } = require('djs-anime')
        const slash = new Slash({
        args: "RANDOM",
    
        interaction: interaction,
        embedFooter: `Requested by ${interaction.member.displayName}`, //The Footer of the embed
        embedTitle: `Here's a Random Anime Qoute`, //The title of the embed
        embedColor: bot.color, //The color of the embed! (Use Hex codes or use the color name)
        })
        slash.quote()
        
    } else {
        const { Slash } = require('djs-anime')
        const slash = new Slash({
        args: args,
        interaction: interaction,
        embedFooter: `Requested by ${interaction.member.displayName}`, //The Footer of the embed
        embedTitle: `Here's a ${args} Qoute`, //The title of the embed
        embedColor: bot.color, //The color of the embed! (Use Hex codes or use the color name)
        })
        slash.quote()

    }
        

    },
};