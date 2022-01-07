const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "announce",
    description: "Send a announcement to specified channel.",
    cooldown: 10,
    userperm: ["ADMINISTRATOR"],
    botperm: ["MANAGE_GUILD"],
    options: [
        { 
          name: "channel", 
          description: "Channel where you want to send the announcement.",
          type: "CHANNEL",
          channelTypes: ["GUILD_TEXT"],
          required: true
        },
        { 
          name: "message",
          description: "The message", 
          required: true,
          type: "STRING"
        },
    ],
  run: async (bot, interaction, args) => {
        try {
    const channel = interaction.options.getChannel("channel");
    const msg = interaction.options.getString("message")
      .split("")
      .slice(0, 4000)
      .join("");
      
    const embed = new MessageEmbed()
          .setTitle("Announcement")
          .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
          .setDescription(`${msg}`)
           .setTimestamp()
           .setColor(bot.color)
            const channel1 = interaction.guild.channels.cache.get(channel.id)
        if (!channel1) return;      
      channel1.send({ embeds: [embed]}).catch(() => null)
    const row = new MessageActionRow()
        .addComponents(
           new MessageButton().setCustomId("everyone").setLabel("@Everyone").setEmoji("📡").setStyle('SUCCESS'),
          new MessageButton().setCustomId("ghostping").setLabel("Ghost-Ping").setEmoji("👻").setStyle('SECONDARY'),
          new MessageButton().setCustomId("here").setLabel("@Here").setEmoji("🏠").setStyle('SECONDARY'),
          new MessageButton().setCustomId("delete").setLabel("Delete").setEmoji("❌").setStyle('DANGER'),
                    )
      const done = new MessageEmbed()
              .setTitle(`Successful`)
              .setDescription(`${bot.tick} • The announcement was successfully sent to ${channel1}.`)
              .setColor(bot.color);
            
          await interaction.editReply({ embeds: [done], components: [row] })

          bot.on('interactionCreate', async (interaction) => {
                    if (interaction.isButton()) {
                      
        if (!interaction.user.permisions.has("ADMINISTRATOR")) {
          return await interaction.reply({content: `${bot.error} • You need admin permission to use these buttons`,  ephemeral: true})
        } else {    
                      
                        if (interaction.customId === "everyone") {

                                channel1.send({ content: '@everyone' })
                      interaction.reply({content: `${bot.tick} • Successfully pinged ${interaction.customId}`, ephemeral:  true})

                        }
                        if (interaction.customId === "here") {
                            
                                channel1.send({ content: '@here' })
                      interaction.reply({content: `${bot.tick} • Successfully pinged ${interaction.customId}`, ephemeral:  true})
                        }
                        if (interaction.customId === "ghostping") {
                        channel1.send({ content: '@everyone' }).then((msg) => {
  setTimeout(() => { if(!msg.deleted) msg.delete() }, bot.ms('10ms'))
  });
                       interaction.reply({content: `${bot.tick} • Successfully pinged ${interaction.customId}`, ephemeral:  true})
                        }
                        if (interaction.customId === "delete") {
                          
                                await channel1.bulkDelete("1")
                      interaction.reply({content: `${bot.tick} • Successfully Deleted the Announcement`, ephemeral:  true})
                        }
        }
                    }
                })
            
        } catch (e) {
			let emed = new MessageEmbed()
				.setTitle(`${bot.error} • Error Occured`)
				.setDescription(`\`\`\`${e.stack}\`\`\``)
				.setColor(bot.color)

			bot.sendhook(null, {
				channel: bot.err_chnl,
				embed: emed
			})

			interaction.followUp({
				embeds: [
					{
						description: `${
							bot.error
						} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
						color: bot.color
					}
				]
			})
        }
    }
}