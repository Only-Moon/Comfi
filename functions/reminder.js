const users = require(`../models/timer`)
const {
  MessageEmbed
} = require("discord.js");

module.exports = async (bot) => {

try {
  
let timer = await users.findOne({
      remind_endsAt: Math.floor(new Date().getTime() / 1000.0),
    });
    if (!timer) return;
    if (timer.remind_location === "dm") {
      let user = await bot.users.fetch(timer.userId);
      let embed = new MessageEmbed()
        .setTitle(`Comfi™ Reminder !!`)
        .setDescription(`${bot.tick} • Your reminder is here\n**Reason :** ${timer.remind_reason.split("").slice(0, 3000).join("")}`)
        .setFooter({ text: `Set ${bot.ms(timer.remind_duration * 1000, { long: true })} ago`})
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setColor(bot.color);
      await user.send({ embeds: [embed] }).catch(() => null);

      await users.deleteOne({
        remind_endsAt: Math.floor(new Date().getTime() / 1000.0),
      });

    } else if (timer.remind_location === "channel") {
      let user = await bot.users.cache.get(timer.userId);
      let channel = await bot.channels.fetch(timer.remind_channel);
      let embed = new MessageEmbed()
        .setTitle(`Comfi™ Reminder !!`)
        .setDescription(`${bot.tick} • Your reminder is here\n**Reason :** ${timer.remind_reason.split("").slice(0, 3000).join("")}`)
        .setFooter({text: `Set ${bot.ms(timer.remind_duration * 1000, { long: true })} ago`})
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setColor(bot.color);
      if (!channel) return;
      else await channel
        .send({content: `<@${user.id}>`, embeds: [embed]})
        .then((msg) => {
  setTimeout(() => { 
    if(!msg.deleted) msg.delete() 
  }, bot.ms('30s'))
        })
        .catch(() => null);

       await users.deleteOne({
        remind_endsAt: Math.floor(new Date().getTime() / 1000.0),
      });

    } else return;
} catch (e) {
			let emed = new MessageEmbed()
				.setTitle(`${bot.error} • Error Occured`)
				.setDescription(`\`\`\`${e.stack}\`\`\``)
				.setColor(bot.color)

			bot.sendhook(null, {
				channel: bot.err_chnl,
				embed: emed
			})
}}
