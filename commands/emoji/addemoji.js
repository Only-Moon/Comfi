const { CommandInteraction, MessageEmbed, Util } = require("discord.js");

module.exports = {
    name: "emoji-add",
    description: "Add emoji from other server or url",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Server Emote or Url',
            name: 'emoji',
            required: true,
        },
        {
            type: "STRING",
            name: "name",
            description: "Custom Emoji From Server",
            required: false,
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

try {
      
  
let isUrl = require("is-url");
let type = "";
let name = "";
let emote = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
if (emote) {
  emote = emote[0];
  type = "emoji";
  name = args.join(" ").replace(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi, "").trim().split(" ")[0];
} else  {
  emote = `${args.find(arg => isUrl(arg))}`
  name = args.find(arg => arg != emote);
  type = "url";
}
let emoji = { name: "" };
      let Link;
      if (type == "emoji") {
        emoji = Util.parseEmoji(emote);
      Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
       emoji.animated ? "gif" : "png"
}`
} else { 
  if (!name) return interaction.editReply("Please provide a name!");
  Link = interaction.options.getString("emoji") }
            interaction.guild.emojis.create(
                `${Link}`,
                `${`${name || emoji.name}`}`
            ).then(em => interaction.editReply(em.toString() + " added!")).catch (e => {
            let embed = new MessageEmbed()
            .setColor(bot.color)
            .setTitle(`${bot.error} Error!`)
            .setDescription(e.toString());

            interaction.editReply({embeds: [ embed ]});

        })

     } catch (err) {

return interaction.editReply(`${bot.error} An error has occured. \nError: ${err} \n [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord)`)
    }
  
          }}