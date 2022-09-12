const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType} = require("discord.js");

module.exports = {
    name: "profile",
    description: "Check your or others profile",
    ownerOnly: false,
    options: [
        {
            type: ApplicationCommandOptionType.User,
            description: 'User to check profile',
            name: 'user',
            required: false,
        },
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

    const user = interaction.options.getUser("user")
     const data = await bot.eco.GetProfile({UserID:  user ? user.id : interaction.user.id })

      if (data.status === "error") {
      const embed = new EmbedBuilder()
      embed.setTitle(data.value)
      embed.setDescription(data.description)
      embed.setColor(bot.color)
      embed.setFooter({text:"Comfi™ Economy System"})
      await interaction.editReply({embeds: [embed]})
      
  } else if (data.status === "success") {
      
 const Profile = data.value
  .map(async(item) => {

    const money = (item.wallet) || 0;
    const bank = (item.bank) || 0;
    const inventory = (item.inventory) || 0;
    const job = (item.job);
    const salary = (item.salary) || 0

    const embed = new EmbedBuilder()
      .setDescription(`${data.description} <@${item.user}>`)
      .addFields(
        {
          name: "Balances",
          value: `• Bank: ${bot.eco.currency} ${bank}\n• Wallet: ${bot.eco.currency} ${money}`,
         inline: true
        },
        {
          name: "Job",
          value: job !== null ? `• Working as ${job}\n• Salary: ${salary}` : `Not Working`,
          inline: true
        },
        {
          name: "Inventory Items",
          value: `• ${item.inventory[0].Name.split(`\n • `).join(`\n• `)}`,
          inline: true
        }
      )
      .setColor(bot.color)
      .setFooter({text: "Comfi™ Economy System"});

await interaction.editReply({ embeds: [embed] });   
                  })
    }
      
    }
  }