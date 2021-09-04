const { translate } = require('bing-translate-api');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "translate",
    description: "Translate Text to your preferred language",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Language you want the text to get translated to',
            name: 'language',
            required: true,
        },
      {
            type: 'STRING',
            description: 'Text to translate',
            name: 'text',
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

      const result = await translate(args.slice(1).join(' '), null, args[0]);
      
      const embed = new MessageEmbed()
  
      .setTitle('Translator')
      .setColor(interaction.guild.me.displayHexColor)
      .addField('Translated from', `\`\`\`${result.text}\`\`\``)
      .addField('Translated to', `\`\`\`${result.translation}\`\`\``)
      .setTimestamp()
      interaction.editReply({embeds: [ embed ]})
    }  catch (err) {
      interaction.editReply(`<a:Attention:883349868062576701> Failed to translate **${args[1]}** to **${args[0]}**`);
    }
  }
}