let { MessageEmbed } = require("discord.js")
let bot = require("../../index.js")

process.on("unhandledRejection", (reason, promise) => {

  const channel = bot.channels.cache.find(c => c.id === "880101469586604032");

    const embed = new MessageEmbed()
        .setTitle(`${bot.error} • Unhandled Rejection`)
        .setURL("https://nodejs.org/api/process.html#event-unhandledrejection")
        .addField("Promise", `\`\`\`${promise}\`\`\``, true)
        .addField("Reason", `\`\`\`${reason.stack}\`\`\``, true)
        .setTimestamp()
      .setImage('https://giffiles.alphacoders.com/354/35481.gif')
        .setFooter("Imagine a bot without anti-crash")
        .setColor("#FF5757")

        if(channel) {
    channel.send({ embeds: [ embed ]});
  } else if (!channel) {
    bot.logger.error(`${reason.stack}`)
  }

});

process.on("uncaughtException", (err, origin) => {

  const channel = bot.channels.cache.find(c => c.id === "880101469586604032");

    const embed = new MessageEmbed()
    .setTitle(`${bot.error} • Uncaught Exception`)
    .setURL("https://nodejs.org/api/process.html#event-uncaughtexception")
    .addField("Origin", `\`\`\`${origin}\`\`\``, true)
    .addField("Error", `\`\`\`${err.stack}\`\`\``, true)
    .setTimestamp()
      .setImage('https://giffiles.alphacoders.com/354/35481.gif')
    .setFooter("Imagine a bot without anti-crash")
    .setColor("#FF5757")

if(channel) {
    channel.send({ embeds: [ embed ]});
  } else if (!channel) {
    bot.logger.error(`${err.stack}`)
  }

});


process.on("uncaughtExceptionMonitor", (err, origin) => {

  const channel = bot.channels.cache.find(c => c.id === "880101469586604032");

    const embed = new MessageEmbed()
    .setTitle(`${bot.error} • Uncaught Exception Monitor`)
    .setURL("https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor")
    .addField("Origin", `\`\`\`${origin}\`\`\``, true)
    .addField("Error", `\`\`\`${err.stack}\`\`\``, true)
      .setImage('https://giffiles.alphacoders.com/354/35481.gif')
    .setTimestamp()
    .setFooter("Imagine a bot without anti-crash")
    .setColor("#FF5757")

if(channel) {
    channel.send({ embeds: [ embed ]});
  } else if (!channel) {
    bot.logger.error(`${err.stack}`)
  }

});

process.on("multipleResolves", (type, promise, reason) => {

  const channel = bot.channels.cache.find(c => c.id === "880101469586604032");

    const embed = new MessageEmbed()
    .setTitle(`${bot.error} • Multiple Resolves`)
    .setURL("https://nodejs.org/api/process.html#event-multipleresolves")
    .addField("Type", `\`\`\`${type}\`\`\``, false)
    .addField("Promise", `\`\`\`${promise.stack}\`\`\``, true)
    .addField("Reason", `\`\`\`${reason.stack}\`\`\``, true)
      .setImage('https://giffiles.alphacoders.com/354/35481.gif')
    .setTimestamp()
    .setFooter("Imagine a bot without anti-crash")
    .setColor("#FF5757")

if(channel) {
    channel.send({ embeds: [ embed ]});
  } else if (!channel) {
    bot.logger.error(`${reason.stack}`)
  }

});