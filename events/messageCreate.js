const bot = require("../index");
const ms = require("ms");
const { Collection, MessageEmbed } = require("discord.js");
const { db } = require('../Database.js');
const Timeout = new Collection();
const config = require("../config.json");

bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  let p = "Cr!";

  if (!message.content.startsWith(p)) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(p.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  const command =
    bot.commands.get(cmd.toLowerCase()) ||
    bot.commands.get(bot.aliases.get(cmd.toLowerCase()));

  if (!command) return;
  if (command) {
    if (!message.member.permissions.has(command.userPerms || []))
      return message.reply({
        content: `${bot.error} You dont have ${command.userPerms} permissions to execute that command.`,
      });
    if (!message.guild.me.permissions.has(command.botPerms || []))
      return message.reply({
        content: `${bot.error} I dont have ${command.botPerms} permissions to execute that command.`,
      });
    if (command.timeout) {
      if (Timeout.has(`${command.name}${message.author.id}`))
        return message.channel.send(
          `${bot.error} You are on a \`${ms(
            Timeout.get(`${command.name}${message.author.id}`) - Date.now(),
            { long: true }
          )}\` cooldown.`
        );
      if (command.ownerOnly && message.author.id != config.owners) {
        message.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(`${bot.error} Only the bot owner can use that command.`)
              .setColor("RED"),
          ],
        });
        return;
      }
      if (command.nsfw && !message.channel.nsfw) {
        message.reply({
          embeds: [
            new MessageEmbed()
              .setTitle("WOAH! NSFW not allowed here!")
              .setDescription(
                `${bot.error} Use NSFW commands in a NSFW marked channel (look in channel settings, dummy)`
              )
              .setColor("RED")
              .setImage("https://i.imgur.com/oe4iK5i.gif"),
          ],
        });
        return;
      }
      command.run(bot, message, args);
      Timeout.set(
        `${command.name}${message.author.id}`,
        Date.now() + command.timeout
      );
      setTimeout(() => {
        Timeout.delete(`${command.name}${message.author.id}`);
      }, command.timeout);
    }
  }
  
});