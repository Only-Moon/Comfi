const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "emoji-rename",
    description: "Renames an emoji in the server",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Emoji to rename',
            name: 'emoji',
            required: true,
        },
        {
            type: 'STRING',
            description: 'new name for emoji',
            name: 'name',
            required: true,
        }
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
      if (!emo.name || !emo.id) return interaction.editReply(`${bot.error}Invalid emote argument`);
      try { 
        emo.setName(args.slice(1).join("_")) 
        interaction.editReply("**The name for the emoji has been changed to " + args.slice(1).join("_") + "**") 
        
      } catch (err) { 
        interaction.editReply(`${bot.error} | **An Error occured** \n Error: ${err}`) } }}