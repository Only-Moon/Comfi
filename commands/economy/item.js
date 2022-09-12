const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType} = require("discord.js");

module.exports = {
    name: "item",
    description: "Commands related to items",
    ownerOnly: false,
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            description: 'Buy items from the shop',
            name: 'buy',
            options: [
              {
                name: "item",
                type: ApplicationCommandOptionType.String,
                description: "Name or ID of the item to buy from shop",
                required: true
              }
            ],
        },
        {
          name: "sell",
          type: ApplicationCommandOptionType.Subcommand,
          description: "Sell items purchased from shop",
          options: [
            {
              name: "item",
              description: "Item Name or ID to sell",
              type: ApplicationCommandOptionType.String,
              required: true
            }
          ]
        },
       {
         name: "shop",
         description: "Shop of item to purchase from Comfi",
         type: ApplicationCommandOptionType.Subcommand
       },
       {
         name: "inventory",
         description: "Check your or other's item inventory",
         type: ApplicationCommandOptionType.Subcommand,
         options: [
           {
             name: "user",
             type: ApplicationCommandOptionType.User,
             description: "user to check inventory",
             required: false
           }
         ]
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
      let data;
      const item = interaction.options.getString("item")
      const user = interaction.options.getUser("user")
      const embed = new EmbedBuilder()

  if (sub === "buy") {

data = await bot.eco.BuyItem({ UserID:  interaction.user.id,  Item: item})

    if (data.status === "error") {
      
      embed.setTitle(data.value)
      embed.setDescription(data.description)
      embed.setColor(bot.color)
      embed.setFooter({text:"Comfi™ Economy System"})
      await interaction.editReply({embeds: [embed]})
      
  } else if (data.status === "success") {
      
 embed.setTitle(data.value)
      embed.setDescription(data.description)
      embed.setColor(bot.color)
      embed.setFooter({text:"Comfi™ Economy System"})
      await interaction.editReply({embeds: [embed]})     
                }              
    
  }

 if (sub === "sell") {

 data = await bot.eco.SellItem({ UserID: interaction.user.id, Item: item})

    if (data.status === "error") {
      
      embed.setTitle(data.value)
      embed.setDescription(data.description)
      embed.setColor(bot.color)
      embed.setFooter({text:"Comfi™ Economy System"})
      await interaction.editReply({embeds: [embed]})
      
  } else if (data.status === "success") {
      
 embed.setTitle(data.value)
      embed.setDescription(data.description)
      embed.setColor(bot.color)
      embed.setFooter({text:"Comfi™ Economy System"})
      await interaction.editReply({embeds: [embed]})     
    }
   
 }

 if (sub === "shop") {

 data = await bot.eco.GetShop()

    if (data.status === "error") {
      
      embed.setTitle(data.value)
      embed.setDescription(data.description)
      embed.setColor(bot.color)
      embed.setFooter({text:"Comfi™ Economy System"})
      await interaction.editReply({embeds: [embed]})
      
  } else if (data.status === "success") {
      
 embed.setTitle(data.description)
      data.value.forEach(item => {
				embed.addFields({name: `${item.Name}`, value: `Price: ${item.Price}\nSell Price: ${item.Sell}\nType: ${item.Type}\nUse: ${item.Use}\nID: ${item.id}`, inline: true});
			});
      embed.setColor(bot.color)
      embed.setFooter({text:"Comfi™ Economy System"})
      await interaction.editReply({embeds: [embed]})     
                      }
   
 }

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
				embed.addFields({name: `${item.Name}: ${item.Quantity}`, value: `Price: ${item.Price}\nSell Price: ${item.Sell}\nType: ${item.Type}\nUse: ${item.Use}\nID: ${item.id}`, inline: true});
			});
      embed.setColor(bot.color)
      embed.setFooter({text:"Comfi™ Economy System"})
      await interaction.editReply({embeds: [embed]})     
                }
  
}
      
    }
}