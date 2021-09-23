const { Discord, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "emotee",
    description: "Enlarge an Emoji or Get a List of Server Emotes",
    ownerOnly: false,
    options: [
        {
            type: 'SUB_COMMAND',
            description: 'Enlarges an Emoji',
            name: 'enlarge',
            options: [
        {
            type: 'STRING',
            description: 'Emote to Enlarge',
            name: 'name',
            required: true,
        },
    ],
        },
        {
          type: 'SUB_COMMAND',
          description: 'Shows a list of Server Emotes',
          name: 'list',
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

let [ option ] = args

if (option === 'enlarge') {
const emote = interaction.options.getString('name')
const emo = Discord.Util.parseEmoji(emote);
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

}

if (option === 'list') {

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
                                                                                                                                                                                                                                                       }

}}