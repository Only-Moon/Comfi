const { MessageEmbed, CommandInteraction } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'meme',
    description: 'Get a random meme from reddit',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(bot, interaction, args) => {
        
        await fetch('http://meme-api.herokuapp.com/gimme/memes')
        .then(response => response.json())
        .then(async(r) => {
            const embed = new MessageEmbed()
            .setImage(`${r.url}`)
            .setTitle(`${r.title}`)
            .setURL(`${r.postLink}`)
            .setColor("#F4B3CA")
            .setFooter(`🔼 ${r.ups} | Author: ${r.author}`)

            const send = await interaction.editReply({embeds: [embed]})
            send.react('🔼')
            send.react('🔽')
        }) 
    }
}
