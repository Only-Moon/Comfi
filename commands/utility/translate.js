/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const fetch = require('axios');
const { CommandInteraction, EmbedBuilder,  ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "translatee",
  description: "Translate Text to your preferred language",
  directory: "utility",
  ownerOnly: false,
  options: [{
    name: "text",
    description: "The text to translate",
    type: ApplicationCommandOptionType.String,
    required: true
  }, {
    name: "to",
    description: "The language you want your text to translate to",
    type: ApplicationCommandOptionType.String,
    choices: [
      {
        name: "english",
        value: "en"
      },
      {
        name: "arabic",
        value: "ar"
      },
      {
        name: "chinese",
        value: "zh"
      },
      {
        name: "french",
        value: "fr"
      },
      {
        name: "german",
        value: "de"
      },
      {
        name: "hindi",
        value: "hi"
      },
      {
        name: "indonesia",
        value: "id"
      },
      {
        name: "irish",
        value: "ga"
      },
      {
        name: "italian",
        value: "it"
      },
      {
        name: "japanese",
        value: "ja"
      },
      {
        name: "korean",
        value: "ko"
      },
      {
        name: "polish",
        value: "pl"
      },
      {
        name: "portuguese",
        value: "pt"
      },
      {
        name: "russian",
        value: "ru"
      },
      {
        name: "spanish",
        value: "es"
      },
      {
        name: "turkish",
        value: "tr"
      },
      {
        name: "vietnamese",
        value: "vi"
      }
    ],
    required: true
  }, {
    name: "from",
    description: "The language you are translating from",
    type: ApplicationCommandOptionType.String,
    choices: [
      {
        name: "auto",
        value: "auto"
      },
      {
        name: "english",
        value: "en"
      },
      {
        name: "arabic",
        value: "ar"
      },
      {
        name: "chinese",
        value: "zh"
      },
      {
        name: "french",
        value: "fr"
      },
      {
        name: "german",
        value: "de"
      },
      {
        name: "hindi",
        value: "hi"
      },
      {
        name: "indonesia",
        value: "id"
      },
      {
        name: "irish",
        value: "ga"
      },
      {
        name: "italian",
        value: "it"
      },
      {
        name: "japanese",
        value: "ja"
      },
      {
        name: "korean",
        value: "ko"
      },
      {
        name: "polish",
        value: "pl"
      },
      {
        name: "portuguese",
        value: "pt"
      },
      {
        name: "russian",
        value: "ru"
      },
      {
        name: "spanish",
        value: "es"
      },
      {
        name: "turkish",
        value: "tr"
      },
      {
        name: "vietnamese",
        value: "vi"
      }
    ],
    required: true
  }],
  userperm: [""],
  botperm: ["SEND_MESSAGES"],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {

    try {
      const lang = interaction.options.getString("to");
      const text = interaction.options
        .getString('text')
        .split("")
        .slice(0, 999)
        .join("");
      const from = interaction.options.getString("from")
      const key = process.env["UltraX"]

      const result = await fetch(`https://api.ultrax-yt.com/v1/translate?from=${from}&to=${lang}&query=${text}&key=${key}`);

      if (!result.data || result.data.translation) return await bot.errorEmbed(bot, interaction, `Something Went Wrong While Translating`)

      const embed = new EmbedBuilder()
        .setTitle("Comfi™ Translation")
        .setDescription(`Translation: ${result.data.translation}`)
        .setColor(bot.color)

      await interaction.editReply({ embeds: [embed] })
    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
}