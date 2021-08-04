const { Message, MessageEmbed } = require("discord.js");
const { Bot } = require("./index.js");

/**
 *
 * @param { String } of
 * @param { Message } message
 * @param { Array } permissions
 */
async function checkPermission(of, message, permissions) {
  //checking
  if (!of || !message || !permissions)
    throw new Error("Unable to access of/message/permissions");

  /**
   * @type { Bot }
   */
  const bot = message.client;

  switch (of.toLowerCase()) {
    case "bot":
      //embed
      let cEmbed = new MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.avatarURL({ dynamic: true })
        )
        .setColor('#F8B6D4')
        .setFooter(
            "© Comfi",
            "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png"
        )
        .setDescription(
          `❌ **Bot needs some permissions to executive the command**`
        );

      //array
      let array = [];

      //looping each permissions
      permissions.forEach((permission) => {
        //checking permission
        if (!message.guild.me.hasPermission(permission)) {
          //pushing to array
          array.push(permission);
        }
      });

      //if it includes administrator
      if (array.length && array.includes("ADMINISTRATOR")) {
        cEmbed.addField(
          `❌ Missing Permission(s)`,
          `\`ADMINISTRATOR\``
        );
        message.channel.send(cEmbed).catch(() => {});
        return true;
      }

      //if not includes administrator
      else if (array.length) {
        cEmbed.addField(
          `❌ Missing Permission(s)`,
          `\`${array.join(" , ")}\``
        );
        message.channel.send(cEmbed).catch(() => {});
        return true;
      }
      break;

    //case member
    case "member":
      let mEmbed = new MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.avatarURL({ dynamic: true })
        )
        .setColor('#F8B6D4')
        .setFooter(
            "© Comfi",
            "https://cdn.discordapp.com/attachments/725019921159028808/739770316754256012/Screenshot_20200803-1459592.png"
        )
        .setDescription(
          `❌ **You don't have enough permissions to use this command!**`
        );

      //array
      let mArray = [];

      //looping permissions
      permissions.forEach((permission) => {
        if (!message.member.hasPermission(permission)) {
          //pushing to array
          mArray.push(permission);
        }
      });

      //if includes administrator
      if (mArray.length && mArray.includes("ADMINISTRATOR")) {
        mEmbed.addField(
          `❌ Missing Permission(s)`,
          `\`ADMINISTRATOR\``
        );
        message.channel.send(mEmbed).catch(() => {});
        return true;
      }

      //if not includes administrator
      else if (mArray.length) {
        mEmbed.addField(
          `❌ Missing Permission(s)`,
          `\`${mArray.join(" , ")}\``
        );
        message.channel.send(mEmbed).catch(() => {});
        return true;
      }
      break;
  }
}

module.exports = {
  checkPermission,
};