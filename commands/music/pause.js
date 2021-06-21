const { MessageEmbed, MessageManager } = require("discord.js")

module.exports = {
    config: {
        name: "pause",
        category: 'music',
        aliases: [],
        description: "Pause Music",
        usage: "pause",
    },
    run: async(bot, message, args) => {
        if (!message.member.voice.channel) {
            const pauseError = new MessageEmbed()
              .setDescription("You Need to be in a Voice Channel to pause Music!")
              .setColor("RED")
            return message.channel.send(pauseError)
        }
        if(!bot.distube.isPlaying(message)) {
            const pauseError2 = new MessageEmbed()
            .setDescription("There is Nothing Playing")
            .setColor("RED")
            return message.channel.send(pauseError2)
        }
        if(bot.distube.isPaused(message)) {
            const pauseError3 = new MessageEmbed()
            .setDescription('The Music is Already Paused!')
            .setColor("RED")
            return message.channel.send(pauseError3)
        }

        bot.distube.pause(message)
        const embed = new MessageEmbed()
        .setDescription('Paused!')
        .setColor("BLUE")
        message.channel.send(embed)
    }
}