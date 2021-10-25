const imdb = require("imdb-api");
const moment = require('moment');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "movie",
    description: "Searches a movie from imdb !!",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Name of the movie',
            name: 'movie',
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
   try {
    const imob = new imdb.Client({apiKey: "5e36f0db"})
    
    let movie = await imob.get({'name': args.join(" ")})
    
    let embed = new MessageEmbed()
    .setTitle(movie.title)
    .setColor("RANDOM")
    .setThumbnail(movie.poster)
    .setDescription(movie.plot)
    .setFooter(`Ratings: ${movie.rating}`)
    .addField("Country", movie.country, true)
    .addField("Languages", movie.languages, true)
    .addField("Type", movie.type, true);
    
    
    await interaction.editReply({ embeds: [ embed ] })
    
   } catch (err) {

return interaction.editReply(`${bot.error} An error has occured. \nError: ${err} \n [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord)`)
   } 
    
  } 
        
}
 