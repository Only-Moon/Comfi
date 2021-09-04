const { CommandInteraction, MessageEmbed } = require("discord.js");
const simplydjs = require("simply-djs")

module.exports = {
    name: "ttt",
    description: "Simple Tictactoe Game",
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'User to Compete in ttt',
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
    run: async (bot, interaction, args) => {

simplydjs.tictactoe(interaction, {    
  slash: true,    
  xEmoji: '883765945393365043',    
  oEmoji: '883766798321864705',    
  idleEmoji: '883765946823630918',    
  embedColor: '#F4B3CA',    
  embedFoot: 'Tictactoe'
  })

    }
}