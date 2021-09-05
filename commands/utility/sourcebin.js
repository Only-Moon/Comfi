const { create } = require("sourcebin");
const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "sourcebin",
    description: "Uploads your js code to sourcebin",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Text/code to upload',
            name: 'code',
            required: true,
        },
    ],
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {
      const options = interaction.options._hoistedOptions;
      
      const content = args[0]
      const Title = "Javascript Code"; 
    if (!content)
      return interaction.editReply(
        new MessageEmbed()
          .setDescription(
            "<:no_HE:778611410539905044> plese provide content to make a bin out of it!"
          )
          .setColor("#303136")
      );

    create(
      [
        {
          name: `Code by ${interaction.user.tag}`,
          content,
          language: "Javascript",
        },
      ],
      {
        title: Title.toString(),
      }
    ).then((value) => {
  
   const embed = new MessageEmbed() 
      .setAuthor(`${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
     .setDescription(`[Bin Link](${value.url}) \n **Code Sent to Sourcebin**`
      )
      .setTimestamp()
      .setColor('#F4B3CA');
      
      const row = new MessageActionRow()			.addComponents( new MessageButton()
        .setStyle('LINK')
        .setURL(`${value.url}`) 
        .setLabel('Bin Url!')
           )                                                  


interaction.editReply({embeds: [ embed ],
    components: [ row ]
});
})
    }
  }
