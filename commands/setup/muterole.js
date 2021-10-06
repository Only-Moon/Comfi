const guilds = require('../../models/guild');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "muterole",
    description: "Sets a Mute Role For Muted User",
    ownerOnly: false,
    options: [
      {
      type: 'SUB_COMMAND',
      name: 'enable',
      description: 'Sets role for muted member',
      options: [
        {
            type: 'ROLE',
            description: 'role for muted user',
            name: 'role',
            required: true,
        },
    ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'disable',
            description: 'Disables the muterole',
        },
    ],
    botperm:  ["MANAGE_GUILD"],
    userperm: ["MANAGE_GUILD"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {
let [ subcommand ] = args;
      
if (subcommand === 'enable') {
      
    let role =
      interaction.options.getRole('role') ||
      bot.guilds.cache.get(interaction.guild.id).roles.cache.get(args[0]) ||
      interaction.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return interaction.editReply(`${bot.error} **Please Enter A Valid Role Name or ID!**`);

    try {

      await guilds.findOneAndUpdate({guildId: interaction.guild.id}, { 
                  mute: true, 
                  mute_role: role,
                  })

        interaction.editReply(
          `**\`${role.name}\` Has Been Set Successfully As Muterole!**`
        );
    } catch (e) {
      return interaction.editReply(
        "**Error - `Missing Permissions or Role Doesn't Exist!`**",
        `\n${e.message}`
      );
    }
}

if (subcommand === 'disable') {

await guilds.findOneAndUpdate({guildId: interaction.guild.id}, { 
                  mute: true,
                  }) 
return interaction.editReply(`Successfully Removed Muterole`)
  
}

  }
};
