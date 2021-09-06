const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "emoji-list",
    description: "Shows a list of Emojis present in the server",
    ownerOnly: false,
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
    let list = [];
    let emojis = interaction.guild.emojis.cache.values();
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
    .setColor("#F4B3CA");
    const msg = await interaction.editReply({ embeds: e });
    symbols.forEach(symbol => msg.react(symbol));
    let doing = true;
    while (doing) {
    let r;
    const filter = (r, u) => symbols.includes(r.emoji.name) && u.id == interaction.user.id;
    try { r = await msg.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }) }
    catch { return interaction.channel.send("Command timed out.") }
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
     .setColor("#F4B3CA");
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
     .setColor("#F4B3CA");
     msg.edit('', { embeds: newEmbed });
      }
    } else if (r.emoji.name == symbols[1]) {
       msg.reactions.removeAll();
       return;
      }
  }}
}
