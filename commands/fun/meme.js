const { MessageEmbed, CommandInteraction } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'meme',
    description: 'Get a random meme from reddit',
    ownerOnly: false,
    userperm: [""],
    botperm: [""],
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
            .setColor(bot.color)
            .setFooter(`🔼 ${r.ups} | Author: ${r.author}`)

await interaction.editReply({embeds: [embed]}).catch((e) => {
        bot.sendhook(
          `Error Occured \n ${e.stack}`
        ), {
          channel: bot.err_chnl
        } 
        interaction.followUp({
          content: `${bot.error} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
          ephemeral: true
        });
        }) 
    })
}
}