const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow, Util } = require("discord.js");
const simplydjs = require("simply-djs")

module.exports = {
    name: "emoji",
    description: "Enlarge an one or more than one emote",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Emote to Enlarge',
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
      
const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)

const emote = interaction.options.getString("name")
      
if (emojis.length === 1) {
      
const emo = Util.parseEmoji(emote);
  
if (!emo.name || !emo.id) return interaction.editReply(`${bot.error} Invalid emote argument`);
  
    const res = `https://cdn.discordapp.com/emojis/${emo.id}.${emo.animated ? "gif" : "png"}`;
    
    let embed = new MessageEmbed()
      .setColor(bot.color)
      .setAuthor("Enlarged Emoji", interaction.user.avatarURL({ dynamic: true }))
      .setImage(`${res}`)
      .setDescription(`${emo.name} ${emo.id}`);

    const row = new MessageActionRow()
			.addComponents( new MessageButton()
        .setStyle('LINK')
        .setURL(`${res}`) 
        .setLabel('Emote Url!'), 
);
  
interaction.followUp({embeds: [ embed ],
    components: [row]
});
               

} else if (emojis.length > 1) {

let pages = []
  
emojis.forEach(emoji => {

const emo = Util.parseEmoji(emoji);

    if (!emo.name || !emo.id) return interaction.editReply(`${bot.error} Invalid emote argument`);
  
    const res = `https://cdn.discordapp.com/emojis/${emo.id}.${emo.animated ? "gif" : "png"}`;
    
    let embed = new MessageEmbed()
      .setColor(bot.color)
      .setAuthor("Enlarged Emoji", interaction.user.avatarURL({ dynamic: true }))
      .setImage(`${res}`)
      .setDescription(`${emo.name} ${emo.id}`);

pages.push(embed)
})
  
simplydjs.embedPages(bot, interaction, pages, {
slash: true,
backEmoji: '884420649580363796', 
delEmoji: '891534962917007410',  
forwardEmoji: '884420650549272586', 
btncolor: 'SECONDARY',
delcolor: 'SECONDARY', 
skipBtn: false,
})

}

     } catch (err) {

return interaction.editReply(`${bot.error} An error has occured. \n[Contact Support](https://comfi.xx-mohit-xx.repl.co/discord)`)
}
  
}}