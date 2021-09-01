const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "register",
    description: "Register Slash Commands",
    ownerOnly: false,
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {

if(interaction.user.id !== interaction.guild.ownerId) return interaction.editReply(`❌ This command can only be used by server owner.`) 
await interaction.guild.commands.set([...bot.slashCommands].map(x => x[1])) 
  
return interaction.editReply("✅ Slash commands are registered successfully.")


    }}
