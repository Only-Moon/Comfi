const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "emoji-remove",
    description: "Removes an emoji from the server",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Emoji to remove',
            name: 'emoji',
            required: true,
        },
    ],
    userperm: ["MANAGE_EMOJIS_AND_STICKERS"],
    botperm: ["MANAGE_EMOJIS_AND_STICKERS"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
    let emo = args[0].match(/(?<=<?a?:?\w{2,32}:)\d{17,19}(?=>?)/gi)[0]
    if (!emo) return interaction.editReply(`${bot.error}emote is a required argument that is missing.`)
    if (interaction.guild.emojis.cache.get(emo)) { 
      emo = interaction.guild.emojis.cache.get(emo)
      
    } else { 
      return interaction.editReply(`${bot.error} | Emoji not found`)}
      if (!emo.name || !emo.id) return interaction.editReply("Invalid emote argument");
      try { 
        emo.delete() 
        interaction.editReply(`**The Emoji has been removed**`)
        } catch (err) {
          interaction.editReply(`${boterror} | **An Error occured** \n Error: ${err}`) }
          }}