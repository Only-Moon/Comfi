const { CommandInteraction, MessageEmbed } = require('discord.js');
const child = require("child_process")

module.exports = {
    name: 'terminal',
    description: 'Terminal of the bot',
    userperm: [""],
    botperm: [""],
    ownerOnly: true,
    options: [
        {
            type: 'STRING',
            description: 'Type a command',
            name: 'command',
            required: true,
        },
    ],
    /** 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (bot, interaction, args, message) => {
        const command = args.join(" ")
        if (!command)
            return interaction.followUp({ content: "Specify a command" })
        child.exec(command, (err, res) => {
            if (err) return interaction.followUp({ content: `\`\`\`js\n${err}\`\`\``})
            interaction.followUp({ content: `\`\`\`js\n${res}\`\`\`` })
        })
    }
}
