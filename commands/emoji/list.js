const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "emoji-list",
    description: "Shows a list of Emojis present in the server",
    ownerOnly: false,
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
run: async (bot, interaction, args) => {
  let Emojis = ""; 
  let EmojisAnimated = ""; 
  let EmojiCount = 0; 
  let Animated = 0; 
  let OverallEmojis = 0; 
  
  function Emoji(id) { 
  return bot.emojis.cache.get(id).toString();
  } 
  
interaction.guild.emojis.cache.forEach((emoji) => { 
  OverallEmojis++; 
  if (emoji.animated) { 
    Animated++; EmojisAnimated += Emoji(emoji.id);
  } else { 
    EmojiCount++; 
    Emojis += Emoji(emoji.id);
  } 
}); 
  
let Embed1 = new MessageEmbed() 
  .setTitle(`Emojis in ${interaction.guild.name}.`) 
  .setDescription( `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n\n**Over all emojis [${OverallEmojis}]**` ) 
  .setColor(`#F4B3CA`); 
  
interaction.editReply({embeds: [Embed1]}); 
                                                                                                                                                                                                                                                       }
}
