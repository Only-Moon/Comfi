const { Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'purge',
    description: 'delete x amount of messages',
    permission: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    options: [
        {
            name: 'amount',
            type: 'STRING',
            description: 'Number of messages to delete (2-99)',
            required: true
        }
    ],
    /** 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (bot, interaction, args, message) => {
        let amount = args[0]
        if (amount <= 100) {
            interaction.channel.bulkDelete(amount, true)
        }

        interaction.channel.send({
            content: `I've cleared \`${amount}\` messages :broom:`
        })
    }
}
