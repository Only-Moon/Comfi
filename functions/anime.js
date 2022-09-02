const Discord = require('discord.js'); 
const axios = require('axios'); 

class Slash { 
  constructor(options) { 
    if (!options.embedFooter) throw new TypeError('Missing argument embedFooter') 
      if (!options.embedTitle) throw new TypeError('Missing argument embedTitle') 
      if (typeof options.embedTitle !== 'string') throw new TypeError('embedTitle must be a string') 
      if (!options.embedColor) throw new TypeError('Missing argument embedColor') 
      if (typeof options.embedColor !== 'string') throw new TypeError('embedColor must be a string') 
    
    this.message = options.message; 
    this.embedFooter = options.embedFooter
    this.embedTitle = options.embedTitle 
    this.embedColor = options.embedColor 
    this.type = options.type || "bonk" 
    this.interaction = options.interaction
    this.args = options.args 
  } 
  //Random Cuddle 
  
  async anime() { 
    const [type] = this.type 
      const url = `https://api.waifu.pics/sfw/${type}`; 
    let response, 
      data;
    try { 
      response = await axios.get(url); 
      data = response.data; 
    } catch (e) { 
      return this.interaction.followUp({ content: `An Error Occured`}) 
    } 
    const embed = new Discord.EmbedBuilder() 
      .setTitle(this.embedTitle) 
      .setColor(this.embedColor) 
      .setImage(data.url) 
      .setFooter(this.embedFooter) 
      await this.interaction.followUp({ embeds: [embed] }) 
  
  } 
  
  async quote() { 
    const ranurl = 'https://animechan.vercel.app/api/random'; 
    if (this.args === "RANDOM") {
      let response,
        data; 
      
      try { 
        response = await axios.get(ranurl); 
        data = response.data; 
      } catch (e) { 
        return this.interaction.followUp(`An error occured!`)
      } 
      
      const ranembed = new Discord.EmbedBuilder() 
        .setTitle(this.embedTitle) 
        .setDescription(data.quote) 
        .setColor(this.embedColor) 
        .setFooter({text: `Anime: ${data.anime} | Character: ${data.character}` }) 
      
    await this.interaction.followUp({ embeds: [ranembed] })
    
    } else { 
      
    const title = this.interaction.options.getString("name")
    const url = `https://animechan.vercel.app/api/quotes/anime?title=${title}`
      let response,
        data;
      
    try { 
      response = await axios.get(url); 
      data = response.data; 
    } catch (e) {
      return this.interaction.followUp(`Sorry I couldn't find a quote for ${title}`)
    } 
      const index = Math.floor(Math.random() * data.length); 
      const embed = new Discord.EmbedBuilder() 
        .setTitle(this.embedTitle) 
        .setColor(this.embedColor) 
        .setDescription(data[index].quote) 
        .setFooter({text: `Anime: ${data[index].anime} | Character: ${data[index].character}` }) 
        await this.interaction.followUp({ embeds: [embed] }) 
    } 
  } 
} 
                                                                                    module.exports = Slash;