const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType} = require("discord.js");

module.exports = {
    name: "rewards",
    description: "Claim weekly or daily reward",
    ownerOnly: false,
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            description: 'Claim daily money',
            name: 'daily',         
        },
        {
           name: "weekly",
           description: "Claim weekly rewards", 
          type: ApplicationCommandOptionType.Subcommand 
        }
    ],
    directory: "economy",
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
    const [sub] = args
    if (sub === "daily") {
    let data = await bot.eco.Daily({ UserID: interaction.user.id })
      
    if (data.error === 'ALREADY_USED') {
    const embed = new EmbedBuilder()
          .setTitle(`You've already claimed your daily today`)
          .setDescription(`Wait for ${data.timeout} hours to claim again`)
          .setFooter({text: `Comfi™ Economy System`})
          .setColor(bot.color)
          .setTimestamp()

   await interaction.editReply({embeds: [embed]}) 
  
    } else {
      let embed = new EmbedBuilder()
        .setTitle(`Here are your daily coins, ${interaction.user.username}`)
        .setDescription(`Your daily bonus was placed in your wallet`)
        .setFooter({text: `Comfi™ Economy System`})
        .setColor(bot.color)
        .setTimestamp();
    await interaction.editReply({ embeds: [embed] })
            }
      } 
    if (sub === "weekly") {

    let data = await bot.eco.Weekly({ UserID: interaction.user.id })
      
    if (data.error === 'ALREADY_USED') {
    const embed = new EmbedBuilder()
          .setTitle(`You've already claimed your weekly rewards`)
          .setDescription(`Wait for ${data.timeout} to claim your weekly rewards again`)
          .setFooter({text: `Comfi™ Economy System`})
          .setTimestamp()
          .setColor(bot.color)

   await interaction.editReply({embeds: [embed]}) 
  
    } else {
      let embed = new EmbedBuilder()
        .setTitle(`Here are your weekly coins, ${interaction.user.username}`)
        .setDescription(`Your weekly bonus has been placed in your wallet`)
        .setFooter({text: `Comfi™ Economy System`})
        .setTimestamp()
        .setColor(bot.color);
    await interaction.editReply({ embeds: [embed] })
            }
      
    }
  }
}