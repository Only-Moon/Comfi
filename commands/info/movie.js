const imdb = require("imdb-api");
const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "imdb",
    description: "Search anime, movie, game or series from imdb !!",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Name to search',
            name: 'name',
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
   try {
    const imob = new imdb.Client({apiKey: "5e36f0db"})
    
    let movie = await imob.get({'name': args.join(" ")}) 
    let embed = new MessageEmbed()
    .setTitle(movie.title.toString())
    .setColor(bot.color)
    .setThumbnail(movie.poster)
    .setDescription(movie.plot.toString())
    .setFooter(`Ratings: ${movie.rating}`)
    .addField("Country", movie.country, true)
    .addField("Languages", movie.languages, true)
    .addField("Type", movie.type, true);

           const row = new MessageActionRow()			.addComponents( new MessageButton()
        .setStyle('LINK')
        .setURL(`${movie.imdburl}`) 
        .setLabel('Imdb Url!')
    ) 
    
    await interaction.editReply({ embeds: [ embed ], components: [ row ]})
    
   } catch (err) {

return interaction.editReply(`${bot.error} An error has occured.  - [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord) `)
   } 
    
  } 
        
}
 