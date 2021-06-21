const Discord = require("discord.js");

module.exports = {
    config: {
        name: "staff-apply",
        category: 'mod',
        aliases: ["sapply"],
        description: "Staff Application Command",
        usage: "staff-apply",
    },
    run: async (bot, message, args) => {
        message.channel.send("Application started! Check your DM!")
        const questions = [
            "What's your name?",
            "How old are you?",
            "Where are you from?",
            "What's your gender?",
            "Why a staff member should give you the role?",
            "Keyword?"
        ];

        let collectedCounter = 0;
        let endCounter = 0;

        const filter = (m) => m.author.id === message.author.id;

        const appStart = await message.author.send(questions[collectedCounter++])
        const channel = appStart.channel;

        const collector = channel.createMessageCollector(filter);
        collector.on("collect", () => {
            if (collectedCounter < questions.length) {
                channel.send(questions[collectedCounter++]);
            } else {
                channel.send("Your application has been sent!")
                collector.stop("fulfilled");
            }
        });

        const appsChannel = client.channels.cache.get("852086473700016148");
        collector.on('end', (collected, reason) => {
            if (reason === 'fulfilled') {
                let index = 1;
                const mappedResponses = collected.map((msg) => {
                    return `${index++}) ${questions[endCounter++]}\n-> ${msg.content}`
                }).join("\n\n")
                appsChannel.send(
                new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle("New application!")
                    .setDescription(mappedResponses)
                    .setColor("GREEN")
                    .setTimestamp()
                );
            }
        })
    }
}