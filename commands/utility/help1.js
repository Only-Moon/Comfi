const { MessageEmbed, Message, Client } = require("discord.js");
const { readdirSync } = require("fs");
const { PREFIX } = require("../../config.js");
const db = require('old-wio.db');
let color = "#36393f";

const create_mh = require("../../modules/menu-help.js");

module.exports = {
config: {
    name: "h1",
    description: "Help Menu",
    category: 'utility',
    usage: "1) !help \n2) !help [module name]\n3) !help [command (name or alias)]",
    example: "1) !help\n2) !help util\n3) !help ban",
    aliases: ['hh']
},
run: async (bot, message, args) => {

  let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };
  
  let categories = [];
    let cots = [];

    if (!args[0]) {
      const emo = {
    admin: "798617643775033394",
    emoji: "855602231986487326",
    economy: "812034164891189289",
    fun: "798458300219785216",
    images: "796373339651571744",
    info: "783028553897869332",
    mod: "783028559580495923",
    music: "779274421574959127",
    utility: "797027740007661578"
      };

      let ccate = [];

      readdirSync("./commands/").forEach((dir) => {
        // if (ignored.includes(dir.toLowerCase())) return;
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        // if (ignored.includes(dir.toLowerCase())) return;

        const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`;
        //let nome = dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase();
        let nome = dir.toUpperCase();

        let cats = new Object();

        cats = {
          name: name,
          value: `\`${prefix}help ${dir.toLowerCase()}\``,
          inline: true,
        };

        categories.push(cats);
        ccate.push(nome);
      });

      const embed = new MessageEmbed()
        .setTitle("Help Menu:")
        .setDescription(
          `>>> My prefix is ${prefix}\nUse the menu, or use \`${prefix}help [category]\` to view commands base on their category!`
        )
        .addFields(categories)
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({
            dynamic: true,
          })
        )
        .setTimestamp()
        .setThumbnail(
          bot.user.displayAvatarURL({
            dynamic: true,
          })
        )
        .setColor(color);

      let menus = create_mh(ccate);
      return message.channel
        .send({ embeds: [embed], components: menus.smenu })
        .then((msgg) => {
          const menuID = menus.sid;

          const select = async (interaction) => {
            if (interaction.customId != menuID) return;

            let { values } = interaction;

            let value = values[0];

            let catts = [];

            readdirSync("./commands/").forEach((dir) => {
              if (dir.toLowerCase() !== value.toLowerCase()) return;
              const commands = readdirSync(`./commands/${dir}/`).filter(
                (file) => file.endsWith(".js")
              );

              const cmds = commands.map((command) => {
                let file = require(`../../commands/${dir}/${command}`);

                if (!file.name) return "No command name.";

                let name = file.name.replace(".js", "");

                if (bot.commands.get(C => C.config.category).hidden) return;

                let des = bot.commands.get(name).description;
                let emo = bot.commands.get(name).emoji;
                let emoe = emo ? `${emo} - ` : "";

                let obj = {
                  cname: `${emoe}\`${name}\``,
                  des,
                };

                return obj;
              });

              let dota = new Object();

              cmds.map((co) => {
                if (co == undefined) return;

                dota = {
                  name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                  value: co.des ? co.des : "No Description",
                  inline: true,
                };
                catts.push(dota);
              });

              cots.push(dir.toLowerCase());
            });

            if (cots.includes(value.toLowerCase())) {
              const combed = new MessageEmbed()
                .setTitle(
                  `__${
                    value.charAt(0).toUpperCase() + value.slice(1)
                  } Commands!__`
                )
                .setDescription(
                  `Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`
                )
                .addFields(catts)
                .setColor(color);

              await interaction.deferUpdate();

              return interaction.message.edit({
                embeds: [combed],
                components: menus.smenu,
              });
            }
          };

          const filter = (interaction) => {
            return (
              !interaction.user.bot && interaction.user.id == message.author.id
            );
          };

          const collector = msgg.createMessageComponentCollector({
            filter,
            componentType: "SELECT_MENU",
          });
          collector.on("collect", select);
          collector.on("end", () => null);
        });
    } else {
      let catts = [];

      readdirSync("./commands/").forEach((dir) => {
        if (dir.toLowerCase() !== args[0].toLowerCase()) return;
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          if (bot.commands.get(name).hidden) return;

          let des = bot.commands.get(name).description;
          let emo = bot.commands.get(name).emoji;
          let emoe = emo ? `${emo} - ` : "";

          let obj = {
            cname: `${emoe}\`${name}\``,
            des,
          };

          return obj;
        });

        let dota = new Object();

        cmds.map((co) => {
          if (co == undefined) return;

          dota = {
            name: `${cmds.length === 0 ? "In progress." : co.cname}`,
            value: co.des ? co.des : "No Description",
            inline: true,
          };
          catts.push(dota);
        });

        cots.push(dir.toLowerCase());
      });

      const command =
        bot.commands.get(args[0].toLowerCase()) ||
        bot.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (cots.includes(args[0].toLowerCase())) {
        const combed = new MessageEmbed()
          .setTitle(
            `__${
              args[0].charAt(0).toUpperCase() + args[0].slice(1)
            } Commands!__`
          )
          .setDescription(
            `Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`
          )
          .addFields(catts)
          .setColor(color);

        return message.channel.send({ embeds: [combed] });
      }

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(
            `Invalid command! Use \`${prefix}help\` for all of my commands!`
          )
          .setColor("RED");
        return await message.channel.send({ embeds: [embed] });
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField(
          "Command:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "Aliases:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "Usage:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Command Description:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({
            dynamic: true,
          })
        )
        .setTimestamp()
        .setColor(color);
      return await message.channel.send({ embeds: [embed] });
    }
  },
};
