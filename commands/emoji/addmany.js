const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow, Util } = require("discord.js");

module.exports = {
    name: "emoji-addmany",
    description: "Add Multiple Emojis from another server1",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Emotes from other server',
            name: 'emote',
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
 
const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
        if (!emojis) return interaction.editReply(`${bot.error} | **Provde The emojis to add**`);

interaction.deleteReply();
      
        emojis.forEach(emote => {
        let emoji = Util.parseEmoji(emote);
        if (emoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
       emoji.animated ? "gif" : "png"
}`
            interaction.guild.emojis.create(
                `${Link}`,
                `${`${emoji.name}`}`
            ).then(em => interaction.channel.send(em.toString() + " added!")).catch (e => {
            let embed = new MessageEmbed()
            .setColor(bot.color)
            .setTitle(`${bot.Error} Error!`)
            .setDescription(`${bot.error} An error has occured \nError: ${e} \n [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord)`);

            interaction.editReply({embeds: [ embed ]});

        })
          
        }
        })
    
}}