const { CommandInteraction, MessageEmbed, Util } = require("discord.js");
const simplydjs = require("simply-djs")

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

let Name = interaction.options.getString("name");
      
if (sub === "add") {

   let maxLength 
        if(interaction.guild.premiumTier === "NONE") {
            maxLength = 100
        }
        if(interaction.guild.premiumTier === "TIER_1") {
            maxLength = 200
        }
        if(interaction.guild.premiumTier === "TIER_2") {
            maxLength = 300
        }
        if(interaction.guild.premiumTier === "TIER_3") {
            maxLength = 500
        }
if(interaction.guild.emojis.cache.size >= maxLength) {
  interaction.editReply({content: `${bot.error} • Guild at max emoji cap ~ ${interaction.guild.emojis.cache.size}/${maxLength}`});
} else {
try {
  
let isUrl = require("is-url");
let type = "";
let name = "";
let emote = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
if (emote) {
  emote = emote[0];
  type = "emoji";
  name = Name;
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

return interaction.editReply(`${bot.error} An error has occured [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord) \nError: ${err}`)
    }
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
            .setTitle(`${bot.error} Error!`)
            .setDescription(`${bot.error} An error has occured [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord) \nError: ${e}`);

            interaction.editReply({embeds: [ embed ]});

        })
          
        }
        })
  
}

if (sub === "stats") {

   let maxLength 
        if(interaction.guild.premiumTier === "NONE") {
            maxLength = 50
        }
        if(interaction.guild.premiumTier === "TIER_1") {
            maxLength = 100
        }
        if(interaction.guild.premiumTier === "TIER_2") {
            maxLength = 150
        }
        if(interaction.guild.premiumTier === "TIER_3") {
            maxLength = 250
        }
          
let Animated = interaction.guild.emojis.cache.filter(emoji => emoji.animated).size.toString();

let Emani = interaction.guild.emojis.cache.filter(emoji => emoji.animated).map(em => em.toString());

let EmojisAnimated = (Emani.length < maxLength ? Emani.join(' ') : Emani.length > maxLength ? `${Emani.slice(0, maxLength).join(' ')} \`+ ${Emani.length-maxLength} emotes...\`` : 'None')


let EmojiCount = interaction.guild.emojis.cache.filter(emoji => !emoji.animated).size.toString();

let Em = interaction.guild.emojis.cache.filter(emoji => !emoji.animated).map(emo => emo.toString());

let Emojis = (Em.length < maxLength ? Em.join(' ') : Em.length > maxLength ? `${Em.slice(0, maxLength).join(' ')} \`+ ${Em.length-maxLength} emotes...\`` : 'None')

let OverallEmoji = Number(Animated) + Number(EmojiCount)

let Embed1 = new MessageEmbed() 
  .setTitle(`Animated Emojis in ${interaction.guild.name} ~ ${Animated}.`) 
  .setThumbnail(interaction.guild.iconURL({ dynamic:  true }))
  .setDescription(`${EmojisAnimated}`)
  .setColor(bot.color); 

let Embed2 = new MessageEmbed() 
  .setTitle(`Non-Animated Emojis in ${interaction.guild.name} ~ ${EmojiCount}.`) 
  .setThumbnail(interaction.guild.iconURL({ dynamic:  true}))
  .setDescription(`${Emojis}`)
  .setColor(bot.color); 

let pages = [ Embed1, Embed2 ]
  
simplydjs.embedPages(bot, interaction, pages, {
slash: true,
backEmoji: '884420649580363796', 
delEmoji: '891534962917007410',  
forwardEmoji: '884420650549272586', 
btncolor: 'SECONDARY',
delcolor: 'SECONDARY', 
skipBtn: false,
})
  
}

          }}