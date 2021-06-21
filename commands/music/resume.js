const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "resume",
        category: 'music',
        aliases: [],
        description: "Resume Music",
        usage: "resume",
    },
    run: async(bot, message, args) => {
        if (!message.member.voice.channel) {
            const resumeError = new MessageEmbed()
              .setDescription("You Need to be in a Voice Channel to resume Music!")
              .setColor("RED")
            return message.channel.send(resumeError)
        }
        // if(!bot.distube.isPlaying(message)) {
        //     const resumeError2 = new MessageEmbed()
        //     .setDescription("There is Nothing Playing")
        //     .setColor("RED")
        //     return message.channel.send(resumeError2)
        // }
        let queue = bot.distube.getQueue(message);
        if (!queue) {
            const queueError = new MessageEmbed()
            .setDescription("There is Nothing Playing")
            .setColor("RED")
            return message.channel.send(queueError)
        }
        if(!bot.distube.isPaused(message)) {
            const resumeError3 = new MessageEmbed()
            .setDescription('The Music is not Paused')
            .setColor("RED")
            return message.channel.send(resumeError3)
        }

        bot.distube.resume(message)
        const embed = new MessageEmbed()
        .setDescription('Resumed!')
        .setColor("BLUE")
        message.channel.send(embed)
    }
}