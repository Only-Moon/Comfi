const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "queue",
        category: 'music',
        aliases: [],
        description: "Gives you the server queue list!",
        usage: "queue",
    },
    run: async(bot, message, args) => {
        let queue = bot.distube.getQueue(message);
        if (!queue) {
            const queueError = new MessageEmbed()
            .setDescription("There is Nothing Playing")
            .setColor("RED")
            return message.channel.send(queueError)
        }
        let q = queue.songs.map((song, i) => {
            return `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``
        }).join("\n");

        const embed = new MessageEmbed()
        .setDescription(`**Server Queue: ** \n\n  ${q}`)
        .setColor("BLUE")

        message.channel.send(embed)
    }
}