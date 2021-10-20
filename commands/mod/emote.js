const { CommandInteraction, MessageEmbed, Util } = require("discord.js");

module.exports = {
    name: "emotee",
    description: "Add, Addmany, Remove, Rename, Stats of Server Emotes",
    ownerOnly: false,
    options: [
        {
        name: "add",
        type: "SUB_COMMAND",
        description: "Add emoji from other server using name or url",
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
            description: "Custom Name for Emoji",
            required: false,
        },
    ],
        },
        {
          name: "addmany",
          type: "SUB_COMMAND",
          description: "Add Multiple Emotes From another server",
          options: [
        {
            type: 'STRING',
            description: 'Emotes from other server',
            name: 'emote',
            required: true,
        },
    ],
        },
        {
          name: "stats",
          type: "SUB_COMMAND",
          description: "Shows a list of server emotes",
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

let [ sub ] = args

if (sub === "add") {

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
}

if (sub === "addmany") {
  
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
  
}

if (sub === "stats") {
  
  let Animated = interaction.guild.emojis.cache.filter(emoji => emoji.animated).size.toString();

let Emani = interaction.guild.emojis.cache.filter(emoji => emoji.animated).map(em => em.toString());

let EmojisAnimated = (Emani.length < 25 ? Emani.join(' ') : Emani.length > 25 ? `${Emani.slice(0, 25).join(' ')} \`+ ${Emani.length-25} emotes...\`` : 'None')


let EmojiCount = interaction.guild.emojis.cache.filter(emoji => !emoji.animated).size.toString();

let Em = interaction.guild.emojis.cache.filter(emoji => !emoji.animated).map(emo => emo.toString());

let Emojis = (Em.length < 25 ? Em.join(' ') : Em.length > 25 ? `${Em.slice(0, 25).join(' ')} \`+ ${Em.length-25} emotes...\`` : 'None')

let OverallEmoji = Number(Animated) + Number(EmojiCount)

let Embed1 = new MessageEmbed() 
  .setTitle(`Emojis in ${interaction.guild.name}.`) 
  .setThumbnail(interaction.guild.iconURL({ dynamic:  true}))
  .addFields(
    {
      name: `**Animated [${Animated}]**`, 
      value: `${EmojisAnimated}`, 
      inline: true
    },
    {
       name: `**Standard [${EmojiCount}]**`, 
       value: `${Emojis}`,
       inline: true
    },
    {
       name: `**Over all emojis**`, 
       value: `${OverallEmoji}`, 
       inline: true
    }
)
  .setColor(bot.color); 
  
interaction.editReply({embeds: [Embed1]}); 
  
}

          }}