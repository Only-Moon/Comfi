const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
  config: {
  name: "emoji-list",
  aliases: [],
  description: "Shows a list of emojis present in server",
  usage: "emoji-list",
  category: "emoji",
  },
  run: async (bot, message, args) => {
    
    let list = [];
    let emojis = message.guild.emojis.cache.values();
    if (emojis.size === 0) return interaction.editReply("There are no emojis in this server");
     emojis = emojis.map((e, i) => `${i + 1}. ${e} \\${e}`);
    for (var i = 0; i < emojis.length; i += 10) {
      const items = emojis.slice(i, i + 10);
      list.push(items.join("\n"));
    }
    const symbols = ["⬅️️", "⏹", "➡"];
    let page = 0;
    let e  = new MessageEmbed()
    .setDescription(list[page])
    .setFooter(`Page ${page + 1} of ${list.length} (${emojis.length} entries)`)
    .setColor("YELLOW");
    const msg = await message.channel.send({ embeds: e });
    symbols.forEach(symbol => msg.react(symbol));
    let doing = true;
    while (doing) {
    let r;
    const filter = (r, u) => symbols.includes(r.emoji.name) && u.id == message.author.id;
    try { r = await msg.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }) }
    catch { return message.channel.send("Command timed out.") }
    const u = message.author;
    r = r.first();
    if (r.emoji.name == symbols[0]) {
      if (!list[page + 1]) msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
      else {
      page++;
      msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
      let newEmbed = new MessageEmbed()
     .setDescription(list[page])
     .setFooter(`Page ${page + 1} of ${list.length} (${emojis.length} entries)`)
     .setColor("YELLOW");
     msg.edit('', { embeds: newEmbed });
      }
    } else if (r.emoji.name == symbols[2]) {
      if (!list[page - 1]) msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
      else {
      page--;
      msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
      let newEmbed = new MessageEmbed()
     .setDescription(list[page])
     .setFooter(`Page ${page + 1} of ${list.length} (${emojis.length} entries)`)
     .setColor("YELLOW");
     msg.edit('', { embeds: newEmbed });
      }
    } else if (r.emoji.name == symbols[1]) {
       msg.reactions.removeAll();
       return;
      }
  }}
}
