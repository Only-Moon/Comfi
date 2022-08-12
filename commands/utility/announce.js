/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, ButtonStyle, ChannelType } = require("discord.js");

module.exports = {
  name: "announce",
  description: "Send a announcement to specified channel.",
  directory: "utility",
  cooldown: 10,
  userperm: ["ADMINISTRATOR"],
  botperm: ["MANAGE_GUILD"],
  options: [
    {
      name: "channel",
      description: "Channel where you want to send the announcement.",
      type: ApplicationCommandOptionType.Channel,
      channelTypes: [ChannelType.GuildText],
      required: true
    },
    {
      name: "message",
      description: "The message",
      required: true,
      type: ApplicationCommandOptionType.String
    },
  ],
  run: async (bot, interaction, args) => {
    try {
      const channel = interaction.options.getChannel("channel");
      const msg = interaction.options.getString("message")
        .split("")
        .slice(0, 4000)
        .join("");

      const embed = new EmbedBuilder()
        .setTitle("Announcement")
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`${msg}`)
        .setTimestamp()
        .setColor(bot.color)
      const channel1 = interaction.guild.channels.cache.get(channel.id)
      if (!channel1) return;
      channel1.send({ embeds: [embed] }).catch(() => null)

      let everyonebtn = new ButtonBuilder().setCustomId("everyone").setLabel("@Everyone").setEmoji("📡").setStyle(ButtonStyle.Success)
      let ghostbtn = new ButtonBuilder().setCustomId("ghostping").setLabel("Ghost-Ping").setEmoji("👻").setStyle(ButtonStyle.Secondary)
      let herebtn = new ButtonBuilder().setCustomId("here").setLabel("@Here").setEmoji("🏠").setStyle(ButtonStyle.Secondary )

      let delbtn = new ButtonBuilder().setCustomId("delete").setLabel("Delete").setEmoji("❌").setStyle(ButtonStyle.Danger)

      const row = new ActionRowBuilder().addComponents(everyonebtn, herebtn, ghostbtn, delbtn)

      const done = new EmbedBuilder()
        .setTitle(`Successful`)
        .setDescription(`${bot.tick} • The announcement was successfully sent to ${channel1}.`)
        .setColor(bot.color);

      const sent = await interaction.editReply({ embeds: [done], components: [row] })

      let collector = await sent.createMessageComponentCollector({ time: 60000 })

      const disable = new ActionRowBuilder().addComponents(
        everyonebtn.setDisabled(true),
        herebtn.setDisabled(true),
        ghostbtn.setDisabled(true)
      );

      collector.on("collect", (inter) => {

        if (!inter.member.permissions.has("ADMINISTRATOR")) {
          return inter.reply({ content: `${bot.error} • You need admin permission to use these buttons`, ephemeral: true })
        } else {

          if (inter.customId === "everyone") {

            channel1.send({
              content: `@everyone`,
              allowedMentions: {
                repliedUser: true,
                parse: ['users', 'roles', 'everyone'],
              }
            })
            inter.reply({ content: `${bot.tick} • Successfully pinged ${interaction.customId}`, ephemeral: true })

          }
          if (inter.customId === "here") {

            channel1.send({
              content: `@here`,
              allowedMentions: {
                parse: ['users', 'roles', 'everyone'],
                repliedUser: true
              }
            })
            inter.reply({ content: `${bot.tick} • Successfully pinged ${interaction.customId}`, ephemeral: true })
          }
          if (inter.customId === "ghostping") {
            channel1.send({
              content: `@everyone`,
              allowedMentions: {
                parse: ['users', 'roles', 'everyone'],
                repliedUser: true
              }
            }).then((msg) => {
              setTimeout(() => { if (msg.deletable) msg.delete() }, bot.ms('10ms'))
            });;
            inter.reply({ content: `${bot.tick} • Successfully pinged ${interaction.customId}`, ephemeral: true })
          }
          if (interaction.customId === "delete") {

            channel1.bulkDelete("1")
            inter.reply({ content: `${bot.tick} • Successfully Deleted the Announcement`, ephemeral: true })
          }
        }
      })

      collector.on("stop", async (inter, reason) => {
        if (reason == "time") {
          sent.edit({ components: [disabled] })
        }

      })

    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
}