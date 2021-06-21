const { MessageEmbed } = require("discord.js");
const { setFilter } = require('distube')

module.exports = {
    config: {
        name: "filter",
        category: 'music',
        aliases: ["setfilter"],
        description: "Set Music Filter! \n Filter Option: `3d, bassboost, echo, karaoke, nightcore, vaporwave`",
        usage: "filter <filterOption>",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) {
            const filterError = new MessageEmbed()
                .setDescription("You Need to be in a Voice Channel to filter Music!")
                .setColor("RED")
            return message.channel.send(filterError)
        }
        if (!bot.distube.isPlaying(message)) {
            const filterError2 = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
            return message.channel.send(filterError2)
        }

        let filterOption = args[0];
        if (!args[0]) {
            const filterOptions = new MessageEmbed()
                .setTitle(`**Filter Options:**`)
                .setDescription(`\`3d, bassboost, echo, karaoke, nightcore, vaporwave\``)
                .setColor("BLUE")

            return message.channel.send(filterOptions)
        }

        try {
            await bot.distube.setFilter(message, filterOption)
                const embed = new MessageEmbed()
                    .setDescription('Music Filter has been set to: ' + `(${filterOption})` || 'Off')
                    .setColor("BLUE")
    
                return message.channel.send(embed)
        } catch (error) {
            return;
        }



        }
}