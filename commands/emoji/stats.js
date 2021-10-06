const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow, Util } = require("discord.js");

module.exports = {
    name: "emoji-stats",
    description: "Shows List of Emoji in the server",
    ownerOnly: false,
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
      
let Animated = interaction.guild.emojis.cache.filter(emoji => emoji.animated).size.toString();
let Emani = interaction.guild.emojis.cache.filter(emoji => emoji.animated).map(em => em.toString());
let EmojisAnimated = (Emani.length < 25 ? Emani.join(' ') : Emani.length > 25 ? `${Emani.slice(0, 25).join(' ')} \`+ ${Emani.length-25} roles...\`` : 'None')

let EmojiCount = interaction.guild.emojis.cache.filter(emoji => !emoji.animated).size.toString();
let Em = interaction.guild.emojis.cache.filter(emoji => !emoji.animated).map(emo => emo.toString());
let Emojis = (Em.length < 25 ? Em.join(' ') : Em.length > 25 ? `${Em.slice(0, 25).join(' ')} \`+ ${Em.length-25} roles...\`` : 'None')

let OverallEmoji = Number(Animated) + Number(EmojiCount)

let Embed1 = new MessageEmbed() 
  .setTitle(`Emojis in ${interaction.guild.name}.`) 
  .setThumbnail(interaction.guild.iconURL({ dynamic:  true}))
  .addFields(
    {
      name: `**Animated [${Animated}]**`, 
      value: `${EmojisAnimated}`, 
      inline: true
    },
    {
       name: `**Standard [${EmojiCount}]**`, 
       value: `${Emojis}`,
       inline: true
    },
    {
       name: `**Over all emojis**`, 
       value: `${OverallEmoji}`, 
       inline: true
    }
)
  .setColor(bot.color); 
  
interaction.editReply({embeds: [Embed1]}); 
      
    }}