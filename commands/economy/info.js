const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType} = require("discord.js");

module.exports = {
    name: "info",
    description: "Commands related to information like profile, inventory and rich of people",
    ownerOnly: false,
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            description: "Check your or someone's inventory",
            name: 'inventory',
            options: [
              {
                name: "user",
                description: "user to check inventory", 
                type: ApplicationCommandOptionType.User,
                required: false
              }
            ],
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

      let data;
      const user = interaction.options.getUser("user")
      const [sub] = args
      const embed = new EmbedBuilder()

if (sub === "inventory") {
  
  data = await bot.eco.GetInv({UserID: user ? user.id : interaction.user.id})

    if (data.status === "error") {
      
      embed.setTitle(data.value)
      embed.setDescription(data.description)
      embed.setColor(bot.color)
      embed.setFooter({text:"Comfi™ Economy System"})
      await interaction.editReply({embeds: [embed]})
      
  } else if (data.status === "success") {
      
 embed.setTitle(data.description)
      data.value.forEach(item => {
				embed.addFields({name: `${item.Name}`, value: `Price: ${item.Price}\nSell Price: ${item.Sell}\nType: ${item.Type}\nUse: ${item.Use}\nQuantity: ${item.Quantity}\nID: ${item.id}`, inline: true});
			});
      embed.setColor(bot.color)
      embed.setFooter({text:"Comfi™ Economy System"})
      await interaction.editReply({embeds: [embed]})     
    }
  
}
      
    }
}