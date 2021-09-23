const { CommandInteraction } = require('discord.js'),
      ms = require("ms");

module.exports = {
    name: 'purge',
    description: 'delete x amount of messages',
    userperm: ['MANAGE_MESSAGES'],
    botperm: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    options: [
        {
            name: 'amount',
            type: 'INTEGER',
            description: 'Number of messages to delete (2-99)',
            required: true
        }
    ],
    /** 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (bot, interaction, args) => {
     
let amount = interaction.options.getInteger('amount')    

if (amount > 99) return interaction.followUp({content: `${bot.error} You cannot delete more than 100 messages`});

const messages = await interaction.channel.messages.fetch({ 
   limit: amount + 1,
})

const filtered = messages.filter(
  (msg) => Date.now() - msg.createdTimestamp < ms("14 days")
  );

await interaction.channel.bulkDelete(filtered);
      
interaction.channel.send({            content: `I've cleared \`${filtered.size 
- 1}\` messages :broom:`       
}).then((msg) => {
  setTimeout(() => msg.delete(), ms('5 seconds'))
  });
}
    }