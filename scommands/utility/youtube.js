const { CommandInteraction, MessageEmbed } = require("discord.js");
const he = require('he');
const search = require('youtube-search');
const emoji = require('../../emojis.json');

module.exports = {
    name: "youtube-search",
    description: "Search youtube for a specific text provided",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'name of video',
            name: 'video',
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
    const apiKey = process.env.YT_KEY
    const videoName = args.join(' ');
    const banned = ["porn", "sex", "fucking", "moaning", "blowjob", "tits", "dick", "sucking", "nigga", "nigger", "cock", "boobs", "xvideos", "xnxx", "clits", "naked", "hentai", "horny", "faping", "masturbating", "masturbation", "fuck", "stript", "naked"]  

    if (!videoName) return interaction.editReply(`${emoji.Error} Please provide a YouTube video name`);

    const searchOptions = { maxResults: 1, key: apiKey, type: 'video' };

    if (banned.some(word => args[0].toLowerCase().includes(word))) {
      return interaction.editReply(`${emoji.Error} Yo go search these things by yourself,  Search again and see the results 💢`)
    }

    let result = await search(videoName, searchOptions)
      .catch(err => {
        return interaction.editReply(`${emoji.Error} Please try again in a few seconds`);
      });

    result = result.results[0];
    if (!result) 
    return interaction.editReply(`${emoji.Error} Unable to find **${videoName}**, please try a different YT Title`);

    const decodedTitle = he.decode(result.title);
    const embed = new MessageEmbed()
    .setTitle(decodedTitle)
    .setURL(result.link)
    .setThumbnail('https://cdn1.iconfinder.com/data/icons/logotypes/32/youtube-512.png')
    .setDescription(result.description)
    .setFooter(`${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
    .setImage(result.thumbnails.high.url)
    .setTimestamp()
    .setColor(interaction.guild.me.displayHexColor)

    interaction.editReply({ embeds: [ embed ] })
  }
}