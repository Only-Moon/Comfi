const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow, Util } = require("discord.js");

module.exports = {
    name: "emoji",
    description: "Enlarge an Emoji or Get a List of Server Emotes",
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

const emote = interaction.options.getString('name')
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

}}