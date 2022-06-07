/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "clever",
  description: "clever rate user",
  directory: "fun",
  ownerOnly: false,
  options: [
    {
      type: 'USER',
      description: 'The user',
      name: 'user',
      required: false,
    },
  ],
  userperm: [""],
  botperm: [""],

  run: async (bot, interaction, args) => {

    try {

      const member = interaction.guild.members.cache.get(args[0]) || interaction.member;

      let rng = Math.floor(Math.random() * 101);

      const cleverembed = new MessageEmbed()

        .setTitle("CLEVER Rate 💡")

        .setDescription(`**__${member.user.username}#${member.user.discriminator}__** ➡️` + rng + `**% Clever!!**`)

        .setColor(bot.color)

        .setThumbnail('https://www.poetry4kids.com/wp-content/uploads/2008/05/im-clever-whenever.png')

        .setFooter(member.user.username, member.user.avatarURL())

        .setTimestamp()

      await interaction.editReply({ embeds: [cleverembed] });

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