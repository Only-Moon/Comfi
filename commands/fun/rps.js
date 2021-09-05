const { CommandInteraction, MessageEmbed } = require("discord.js");
const simplydjs = require("simply-djs")

module.exports = {
    name: "rps",
    description: "Simple Rps Game",
    ownerOnly: false,
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
embedColor: "#F4B3CA", // default: #075FFF            
timeoutEmbedColor: "#F4B3CA", // default: #c90000            
drawEmbedColor: "#F4B3CA", // default: #075FFF            
winEmbedColor: "#F4B3CA", // default: #06bd00            
embedFooter: "A Game of RPS",            
rockColor: "", // default: SECONDARY            
paperColor: "", // default: SECONDARY            
scissorsColor: "",
credit: false,
})

     }    
}