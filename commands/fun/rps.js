const { CommandInteraction, MessageEmbed } = require("discord.js");
const simplydjs = require("simply-djs")

module.exports = {
    name: "rps",
    description: "Simple Rps Game",
    ownerOnly: false,
  directory: "fun",
    options: [
        {
            type: 'USER',
            description: 'User to Compete with in rps',
            name: 'user',
            required: true,
        },
    ],
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {

simplydjs.rps(interaction, {    
slash: true,    
embedColor: bot.color,          
timeoutEmbedColor: bot.color,           
drawEmbedColor: bot.color,           
winEmbedColor: bot.color,           
embedFooter: "A Game of RPS",            
rockColor: "", // default: SECONDARY            
paperColor: "", // default: SECONDARY            
scissorsColor: "",
credit: false,
})

     }    
}