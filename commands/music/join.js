module.exports = {
    config: {
        name: "join",
        category: 'music',
        aliases: ["summon"],
        description: "Staff Application Command",
        usage: "join",
    },
    run: async(bot, message, args) => {

        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) return message.channel.send("You Are Not In a Voice Channel!")

        try {
            await voiceChannel.join().then(connection => {
                connection.voice.setSelfDeaf(true)
            })
        } catch(error) {
            console.log(`There Was An Error Connecting To The Voice Channel: ${error}`)
            return message.channel.send(`There Was An Error Connecting To The Voice Channel: ${error}`)
        }
    }
}