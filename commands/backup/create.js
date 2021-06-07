const Discord = require("discord.js");
const backup = require("discord-backup");
const client = new Discord.Client();
const config = require("../../config.json")

module.exports = {
    config: {
  name: "create",
  aliases: ["create-backup", "backup"],
  description: "create backup of bot db",
  category: "backup",
  usage: "none",
    },
  run: async (client, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) {
  return message.channel.send(":x: | You must be an administrator of this server to request a backup!");
}
if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(":x: | I must be an administrator of this server to create a backup!");
    }
// Create the backup
backup.create(message.guild, {
  jsonBeautify: true
}).then((backupData) => {
  // And send informations to the backup owner
  message.author.send("The backup has been created! To load it, type this command on the server of your choice: `" + config.default_prefix + "load-backup " + backupData.id + "`!");
  message.channel.send(":white_check_mark: Backup successfully created. Back up id sended in your DMs!");
});
  }
}