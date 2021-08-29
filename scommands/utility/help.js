const { ContextMenuInteraction, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const Prefix = "/";
const { db } = require('../../Database.js');

module.exports = {
  name: 'help',
  description: 'Show All Commands',
  options: [
        {
            type: 'STRING',
            description: 'command name',
            name: 'command',
            required: false,
        },
    ],
  userperm: [""],
  botperm: [""],
  
  /**
   * @param {ContextMenuInteraction} interaction
   * @param {String[]} args
   */
  
  run: async (bot, interaction, args) => {
    
    const roleColor =
    interaction.guild.me.displayHexColor === "#F4B3CA"
        ? "#ffffff"
        : interaction.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./scommands/").forEach((dir) => {
        const commands = readdirSync(`./scommands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../scommands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Need help? Here are all of my commands:")
        .addFields(categories)
        .setDescription(
          `Use \`${Prefix}help\` followed by a command name to get more additional information on a command. For example: \`${Prefix}help invite\`.`      
        )
        .setFooter(
          `Requested by ${interaction.user.tag}`,
        )
        .setTimestamp()
        .setColor(roleColor);
      return interaction.followUp({ embeds: [embed] });
    } else {
      const command =      bot.slashCommands.get(args[0].toLowerCase());
      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(
            `Invalid command! Use \`${Prefix}help\` for all of my commands!`
          )
          .setColor("FF0000");
        return interaction.followUp({ embeds: [embed] });
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
            `Requested by ${interaction.user.tag}`,
          )
        .setTimestamp()
        .setColor(roleColor);
      return interaction.followUp({ embeds: [embed] });
    }
  },
};