const { db } = require('../../Database.js');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "set-muterole",
    description: "Sets a Mute Role For Muted User",
    ownerOnly: false,
    options: [
        {
            type: 'ROLE',
            description: 'Muted Role',
            name: 'role',
            required: true,
        },
    ],
    userperm: ["MANAGE_SERVER"],
    botperm: ["MANAGE_SERVER"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {
    if (!args[0]) {
      let b = await db.get(`muterole_${interaction.guild.id}`);
      let roleName = interaction.guild.roles.cache.get(b);
      if (interaction.guild.roles.cache.has(b)) {
        return interaction.editReply(
          `**Muterole Setted In This Server As \`${roleName.name}\`!**`
        );
      } else
        return interaction.editReply(
          "**Please Enter A Role Name or ID To Set!**"
        );
    }

    let role =
      interaction.options.getRole('role') ||
      bot.guilds.cache.get(interaction.guild.id).roles.cache.get(args[0]) ||
      interaction.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return interaction.editReply("**Please Enter A Valid Role Name or ID!**");

    try {
      let a = await db.fetch(`muterole_${interaction.guild.id}`);

      if (role.id === a) {
        return interaction.editReply(
          "**This Role is Already Set As Muterole!**"
        );
      } else {
        await db.set(`muterole_${interaction.guild.id}`, role.id);

        interaction.editReply(
          `**\`${role.name}\` Has Been Set Successfully As Muterole!**`
        );
      }
    } catch (e) {
      return interaction.editReply(
        "**Error - `Missing Permissions or Role Doesn't Exist!`**",
        `\n${e.message}`
      );
    }
  }
};
