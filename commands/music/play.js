const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "play",
        category: 'musi',
        aliases: ["p"],
        description: "Plays Songs <3",
        usage: "play <Song Name / URL>",
    },
    run: async (bot, message, args) => {

if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.'); 

bot.buttube.play(message, args.join(" "));

}}