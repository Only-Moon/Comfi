const Discord = require('discord.js');
const { translate } = require('bing-translate-api');
const config = require('../../config.json');
const emoji = require('../../emojis.json');

module.exports = {
    config: {
        name: "translate",
        description: "Transaltes to your prefered language",
        aliases: ["t"],
        category: "utility",
        example: `${config.default_prefix}translate english Hola`,
        usage: "Translate from any language!!",
    },
    run: async (bot, message, args) => {

    if (args.length < 2) {
    return message.reply(`You missed an argument **\`${config.Prefix}translate [language that you wanne translate] Word\`** for example **\`${config.Prefix}translate spanish Hello\`**`)
    }
  
    try {

      const result = await translate(args.slice(1).join(' '), null, args[0]);
      
      const embed = new Discord.MessageEmbed()
  
      .setTitle('Translator')
      .setColor(message.guild.me.displayHexColor)
      .addField('Translated from', `\`\`\`${result.text}\`\`\``)
      .addField('Translated to', `\`\`\`${result.translation}\`\`\``)
      .setTimestamp()
      message.channel.send(embed)
    }  catch (err) {
      message.channel.send(`${emoji.Error} Failed to translate **${args[1]}** to **${args[0]}**`);
    }
  }
}