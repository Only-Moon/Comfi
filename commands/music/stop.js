const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "stop",
        category: 'music',
        aliases: [],
        description: "Stops the Music & clears the queue",
        usage: "stop",
    },
    run: async(bot, message, args) => {
        if (!message.member.voice.channel) {
            const stopError = new MessageEmbed()
              .setDescription("You Need to be in a Voice Channel to stop Music!")
              .setColor("RED")
            return message.channel.send(stopError)
        }
        if(!bot.distube.isPlaying(message)) {
            const stopError2 = new MessageEmbed()
            .setDescription("There is Nothing Playing")
            .setColor("RED")
            return message.channel.send(stopError2)
        }
        bot.distube.stop(message);
        const embed = new MessageEmbed()
        .setDescription('Stopped!')
        .setColor("BLUE")
        message.channel.send(embed)

    }
}