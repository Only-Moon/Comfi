const shorten = require('isgd');
const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "linkshorten",
    description: "Shorten your Url to is.gd format !!",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'link to shorten',
            name: 'link',
            required: true,
        },
      {
            type: 'STRING',
            description: 'Short name for url',
            name: 'name',
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

try {
      
        if (!args[0]) {
            shorten.shorten(args[0], function(res) {
                if(res.startsWith('Error:')) return interaction.editReply(`<a:Attention:883349868062576701> Provide a valid url **${res}**`)

        }) 
        } else {

            shorten.custom(args[0], args[1], function(res) {
                if(res.startsWith('Error:')) return interaction.editReply(`<a:Attention:883349868062576701> **${res}**`)
            
      const row = new MessageActionRow()			.addComponents( new MessageButton()
        .setStyle('LINK')
        .setURL(`${res}`) 
        .setLabel('Your Shortened Url!')
    )                                                         

  const embed = new MessageEmbed()
.setAuthor(`${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
  .setDescription(`Here is your shortened url \n ${res}`)
.setColor('#F4B3CA');

interaction.editReply({embeds: [ embed ],
    components: [ row ]
});


        })

    }

     } catch (err) {

return interaction.editReply(`${bot.error} An error has occured. \nError: ${err} \n [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord)`)
    }
  
}}