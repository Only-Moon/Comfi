const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "skip",
        category: 'musix',
        aliases: [],
        description: "Skips Music in a Queue",
        usage: "skip",
    },
    run: async(bot, message, args)=> {
        if (!message.member.voice.channel) {
            const skipError = new MessageEmbed()
              .setDescription("You Need to be in a Voice Channel to skip music!")
              .setColor("RED")
            return message.channel.send(skipError)
        }
        if(!bot.distube.isPlaying(message)) {
            const skipError2 = new MessageEmbed()
            .setDescription("There is Nothing Playing")
            .setColor("RED")
            return message.channel.send(skipError2)
        }

        let queue = bot.distube.skip(message)

        const embed = new MessageEmbed()
        .setDescription(`Skipped!`)
        .setColor("BLUE")

        message.channel.send(embed)
    }
}