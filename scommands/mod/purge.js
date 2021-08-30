const { CommandInteraction } = require('discord.js');

module.exports = {
    name: 'purge',
    description: 'delete x amount of messages',
    userperm: ['MANAGE_MESSAGES'],
    botperm: ['MANAGE_MESSAGES'],
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
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (bot, interaction, args) => {
     
let amount = args[0]        
 if (amount < 2) return interaction.followUp({content: 'You cannot delete less than 2 messages'});
if (amount <= 100) {            
    interaction.channel.bulkDelete(amount, true)       
         }
      
        interaction.channel.send({            content: `I've cleared \`${amount}\` messages :broom:`       
})   
    }}