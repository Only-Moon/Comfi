const bot = require("../../index");
const ms = require("ms");
const guilds = require("../../models/guild")
const users = require("../../models/users")
const { Collection, MessageEmbed } = require("discord.js");
const Timeout = new Collection();
bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if(!message.guild) return;
  
  const guild = await guilds.findOne({guildId: message.guild.id})
    if(!guild) { await guilds.create({guildId: message.guild.id})}

    require(`../../functions/afk`)(message)
    
  if(guild.leveling) {
  if(message.author.bot) return;
  const userOnLevel = await users.findOne({userId: message.author.id, guildId: message.guild.id})
if(!userOnLevel) { await users.create({userId: message.author.id, guildId: message.guild.id})}
            require(`../../functions/leveling`)(message, bot)
        }
  
  let p;
  let mentionRegex = message.content.match(
    new RegExp(`^<@!?(${bot.user.id})>`, "gi")
  );
  if (mentionRegex) {
    p = `${mentionRegex}`;
 } else {
    p = "Cr!";
  }
  
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
    
  const user = await users.findOne({userId: message.author.id, guildId: message.guild.id})
  if(!user) { await users.create({userId: message.author.id, guildId: message.guild.id})}
    
    if (!message.member.permissions.has(command.userPerms || []))
      return message.reply({
        content: `You dont have permissions to execute that command.`,
      });
    if (!message.guild.me.permissions.has(command.botPerms || []))
      return message.reply({
        content: `I dont have permissions to execute that command.`,
      });
    if (command.timeout) {
      if (Timeout.has(`${command.name}${message.author.id}`))
        return message.channel.send(
          `You are on a \`${ms(
            Timeout.get(`${command.name}${message.author.id}`) - Date.now(),
            { long: true }
          )}\` cooldown.`
        );
      if (command.ownerOnly && message.author.id != config.owner) {
        message.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(`Umm... Only the bot owner can use that command.`)
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
                `Use NSFW commands in a NSFW marked channel (look in channel settings, dummy)`
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
