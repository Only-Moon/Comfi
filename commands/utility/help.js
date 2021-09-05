const { readdirSync } = require("fs");
const prefix = "/";
let color = "#F4B3CA";

//const create_mh = require("../../modules/menu_help");

const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "Show all the Available bot Commands in Menu Form",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'particular command',
            name: 'command',
            required: false,
        },
    ],
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
          let categories = [];
    let cots = [];

    if (!args[0]) {

      //categories to ignore
      let ignored = [
          "owner",
          "context"   
      ];
      
      const emo = {
        admin: "🔑",
        anime: "⚔",
        fun: "🌈",
        info: "❓",
        levels: "📊",
        mod: "🔱",
        setup: "⚙",
        utility: "🔧"
      }

      let ccate = [];

      readdirSync("./commands/").forEach((dir) => {
         if (ignored.includes(dir.toLowerCase())) return;

          const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`;
          let nome = dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase();

        let cats = new Object();

        cats = {
          name: name,
          value: `\`/help ${dir.toLowerCase()}\``,
          inline: true,
        };

        categories.push(cats);
        ccate.push(nome);
      });

      const embed = new MessageEmbed()
        .setTitle("Help Menu:")
        .setDescription(`>>> My prefix is ${prefix}\nUse \`${prefix}help (category)\` to view commands base on their category!`)
        .addFields(categories)
        .setFooter(`Requested by ${interaction.member.displayName}`, interaction.user.avatarURL({ dynamic: true }))
        .setTimestamp()
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setColor(color);

      //let menus = create_mh(ccate);
      return interaction.editReply({ embeds: [embed]/*, components: menus.smenu*/ });
    }
  }
}