const bot = require('../../index')
const {
  Permissions,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  Discord
} = require('discord.js')
const guilds = require('../../models/guild')
const users = require('../../models/users')
const Client = require('../../models/Client')

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

bot.on('interactionCreate', async (interaction, args) => {
  // Slash Command Handling

  if (interaction.isModalSubmit()) {

    const cmd = bot.slashCommands.get(interaction.commandName)

if (interaction.customId === "Bug") {
    
    await interaction.deferReply({ ephemeral: true });

    const title = interaction.fields
      .getTextInputValue('title')
      .split('')
      .slice(0, 100)
      .join('')
    
    const desc = interaction.fields
      .getTextInputValue('description')
      .split('')
      .slice(0, 2000)
      .join('');

    const member = interaction.member
    const reportCh = bot.channels.cache.get(
      '889149873893539900') || bot.channels.cache.get('863684464176922664')
      const owner = bot.users.cache.get("753974636508741673") 
    
    const reportEmbed = new MessageEmbed()
      .setTitle(`Comfi™ Bug Report`)
      .setDescription(
        `**Author :**\n> ${member.user.username} \n**Report Title :**\n> ${title} \n**Report Description:**\n\`\`\`${desc}\`\`\``
      )
      .setFooter({ text: `Sent From ${member.guild.id}` })
      .setThumbnail(member.user.avatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(bot.color);

     if (reportCh) {
      reportCh.send({ embeds: [reportEmbed] })
    } else if (owner) {
      await owner.send({ embeds: [reportEmbed] })
    }  

    return await bot.successEmbed(bot, interaction, `Bug Report has been sent to the developers!`)

 }
    
}
})