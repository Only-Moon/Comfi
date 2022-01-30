const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'npm',
  description: 'Get info about npm package',
  ownerOnly: false,
  options: [
    {
      type: 'STRING',
      description: 'Package Name',
      name: 'npm',
      required: true
    }
  ],
  directory: "info",
  userperm: [''],
  botperm: ['SEND_MESSAGES'],
  /**	 
*	 
* @param {CommandInteraction} interaction	 
* @param {String[]} args	 
*/

  run: async (bot, interaction, args) => {
    let npm = interaction.options.getString('npm')
    try {
      const response = await fetch(`https://api.notzerotwo.ml/data/npm?api=moon_bow&package=${npm}`)
      
      const data = await response.json()
      
if (data.error) return await  bot.errorEmbed(bot, interaction, `**The Npm Package doesn't exists**`)
      
      let embed = new MessageEmbed()
        .setAuthor({name: `Comfi™ Npm Info - ${data.name}`, iconURL: bot.user.displayAvatarURL({dynamic:true})})
        .setDescription(`**Name: ** ${data.name} \n**Version: ** ${data.version} \n**Description :** ${data.description} \n**Author :** ${data.author} \n **License :** ${data.license}`)
        .setColor(bot.color)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true})});

				const row = new MessageActionRow().addComponents(
					new MessageButton()
						.setStyle('LINK')
						.setURL(`https://www.npmjs.com/package/${npm}`)          
          .setEmoji(`883017868944502804`)
						.setLabel('Go to Package!!')	);

      await interaction.editReply({ embeds: [embed], components: [row] })
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