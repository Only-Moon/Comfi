const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "purge",
    description: "Purge messages",
    options: [
      {
          name: "msg-count",
          type:"STRING", 
          description:"The number of messages you want to purge",
          required: true
      }
    ],
    userperm: ["MANAGE_MESSAGES"],
    botperm: ["MANAGE_MESSAGES"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
run: async (bot, interaction, args) => {
  if (args[0] > 100) return interaction.followUp({content: 'You cannot delete more than 100 messages!'});
  if (args[0] < 1) return interaction.followUp({content: 'To delete messages please delete atleast 1 message.'});

  await interaction.channel.messages.fetch({ limit: args[0] + 1 }).then(messages => {
   interaction.channel.bulkDelete(messages);
  });
  }
}