const { Permissions } = require('discord.js')
const { db } = require('../../Database.js');

module.exports = {
  config: {
    name: "setsupportrole",
    category: 'admin',
    aliases: ["setsupport", "strole", "ssr"],
    description: "Sets A Support Role For Ticket-system!",
    usage: "[role name | role mention | role ID]",
  },
  run: async (bot, message, args) => {
    if (!message.member.permissions.has("PERMISSIONS.FLAGS_ADMINISTRATOR"))
      return message.channel.send(
        "**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**"
      );
    if (!args[0]) {
      let b = await db.fetch(`supportrole_${message.guild.id}`);
      let roleName = message.guild.roles.cache.get(b);
      if (message.guild.roles.cache.has(b)) {
        return message.channel.send(
          `**Supportrole Set In This Server Is \`${roleName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Please Enter A Role Name or ID To Set!**"
        );
    }

    let role =
      message.mentions.roles.first() ||
      bot.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return message.channel.send("**Please Enter A Valid Role Name or ID!**");

    try {
      let a = await db.fetch(`supportrole_${message.guild.id}`);

      if (role.id === a) {
        return message.channel.send(
          "**This Role is Already Set As Supportrole!**"
        );
      } else {
      db.set(`supportrole_${message.guild.id}`, role.id).then(console.log);

        message.channel.send(
          `**\`${role.name}\` Has Been Set Successfully As Supportrole!**`
        );
      }
    } catch (e) {
      return message.channel.send(
        "**Error - `Missing Permissions or Role Doesn't Exist!`**",
        `\n${e.message}`
      );
    }
  }
};
