const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType} = require("discord.js");

module.exports = {
    name: "eco-lb",
    description: "Commands related to nank",
    ownerOnly: false,
    directory: "economy",
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

    const embed = new EmbedBuilder()
    let data = await bot.eco.GetRich({})

    if (data.status === "error") {
      
      embed.setTitle(data.value)
      embed.setDescription(data.description)
      embed.setColor(bot.color)
      embed.setFooter({text:"Comfi™ Economy System"})
      await interaction.editReply({embeds: [embed]})
      
  } else if (data.status === "success") {
      
     const rep = bot.emoji("reply")
    const dot = bot.emoji("bunny_cs")
    const one = bot.emoji("_1_HE")
    const two = bot.emoji("_2_HE")
    const three = bot.emoji("_3_HE")

     await interaction.editReply({ content: `${bot.tick} • Generating leaderboard `}).then((msg) => {
        setTimeout(() => {
    data = data.value.sort((a, b) => (b.value.wallet + b.value.bank) - (a.value.wallet + a.value.bank)).map((value, i) => {
          let top10 = []
          let pos = 1
            const mem = interaction.guild.members.cache.find(x => x.id === value.userID)

            const emojis = [`${one}`, `${two}`, `${three}`];
            
            top10.push(`**${emojis[i] || dot} #${pos++})** \`\`\`${mem.user.username}\`\`\` \n${rep}**Net Worth** \`\`\`${value.wallet + value.bank}\`\`\``)
          return top10
          })
          msg.delete().catch(() => null)
          
          const embed = new EmbedBuilder()
            .setAuthor({name:`${interaction.guild.name}'s Eco leaderboard! (Top 15)`, iconURL: interaction.guild.iconURL({ dynamic: true })})
            .setDescription(data.slice(0, 15).join("\n"))
            .setFooter({text: `Requested by ${interaction.member.displayName}`, iconURL:  interaction.user.avatarURL({dynamic: true})})
            .setColor(bot.color);
          return msg.channel.send({ embeds: [embed] })
        }, 2000);
      })
      
    }
      
    }
}