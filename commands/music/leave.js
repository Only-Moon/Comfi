module.exports = {
    config: {
        name: "leave",
        category: 'music',
        aliases: ['dc', 'disconnect'],
        description: "Staff Application CommandLeaves The Voice Channel",
        usage: "leave",
    },
    run: async(bot, message, args) => {

        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) return message.channel.send("I\'m Not In A Voice Channel")

        try {
            voiceChannel.leave()
            await message.react(`✅`)
        } catch(error) {
            console.log(`There Was An Error Disconnecting To The Voice Channel: ${error}`)
            return message.channel.send(`There Was An Error Disconnecting To The Voice Channel: ${error}`)
        }
    }
}