const Discord = require('discord.js');
const config = require('../../config.json');
const emoji = require('../../emojis.json');
const imdb = require("imdb-api");
const client = require('../../index');
const moment = require('moment');

module.exports = {
    config: {
        name: "movie",
        description: "Gives the information of the provided movie",
        aliases: ["moviesearch", "searchmovie"],
        category: "utility",
        example: `${config.default_prefix}movie Avengers`,
        usage: "Searches movie from imdb!!",
    },
    run: async (bot, message, args, color) => {
    
    if(!args.length) {
      return message.channel.send("Please give the name of movie or series")
    }
    
    const imob = new imdb.Client({apiKey: "5e36f0db"}) //You need to paste you imdb api
    
    let movie = await imob.get({'name': args.join(" ")})
    
    let embed = new Discord.MessageEmbed()
    .setTitle(movie.title)
    .setColor("RANDOM")
    .setThumbnail(movie.poster)
    .setDescription(movie.plot)
    .setFooter(`Ratings: ${movie.rating}`)
    .addField("Country", movie.country, true)
    .addField("Languages", movie.languages, true)
    .addField("Type", movie.type, true);
    
    
    message.channel.send({ embeds: [ embed ] })
    
    
    
  } 
        
}
 