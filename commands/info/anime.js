module.exports = {
    name: "anime",
    description: "Get Anime Actions",
    options: [
        { 
            name: 'category', 
            description: "which action do you want",
            required: true,
            type: "STRING",
            choices: [
                { 
                    name: "cuddle",
                    value: "cuddle"
                },
                { 
                    name: "hug",
                    value: "hug"
                },
                { 
                    name: "kiss",
                    value: "kiss"
                },
                { 
                    name: "smile",
                    value: "smile"
                },
                { 
                    name: "wave",
                    value: "wave"
                },
                { 
                    name: "handhold",
                    value: "handhold"
                },
                { 
                    name: "wink",
                    value: "wink"
                },
                { 
                    name: "poke",
                    value: "poke"
                },
                { 
                    name: "dance",
                    value: "dance"
                },
                { 
                    name: "cringe",
                    value: "cringe"
                },
                { 
                    name: "kill",
                    value: "kill"
                },
                { 
                    name: "slap",
                    value: "slap"
                },
                { 
                    name: "bite",
                    value: "bite"
                },
                { 
                    name: "highfive",
                    value: "highfive"
                },
                { 
                    name: "blush",
                    value: "blush"
                },
                { 
                    name: "pat",
                    value: "pat"
                },
                { 
                    name: "smug",
                    value: "smug"
                },
                { 
                    name: "bonk",
                    value: "bonk"
                },
                { 
                    name: "cry",
                    value: "cry"
                },
                { 
                    name: "bully",
                    value: "bully"
                },
                { 
                    name: "yeet",
                    value: "yeet"
                },
                { 
                    name: "happy",
                    value: "happy"
                },
                { 
                    name: "kick",
                    value: "kick"
                },
            ],
        },
    ],
    userperm: [""],
    botperm: [""],

    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
        const { Slash } = require('djs-anime')
        const slash = new Slash({
        type: args,
        interaction: interaction,
        embedFooter: `Requested by ${interaction.member.displayName}`,
        embedTitle: `Here a ${args} GIF`,
        embedColor: bot.color,
        })
        slash.anime()
        

    }
}  