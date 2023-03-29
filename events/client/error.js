const { EmbedBuilder, WebhookClient } = require('discord.js');
const bot = require('../../index.js');

/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const hook = new WebhookClient({ url: process.env.debughook });

setTimeout(() => {
  if (!bot || !bot.user) {
    process.kill(1).catch(() => null);
  }
}, 3 * 1000 * 60);

bot
  .on('disconnect', (e) => bot.logger.log(`disconnect \n${e}`))
  .on('reconnecting', (e) => bot.logger.log(`Bot is reconnecting \n${e}`))
  .rest.on('rateLimit', (err) => {
    const emed = new EmbedBuilder()
      .setTitle(`${bot.error} • Error Occured`)
      .setDescription(`Timeout: ${err.timeout}\n Limit: ${bot.ms(err.limit)}\n Method: ${err.method}\nPath: ${err.path}\nRoute: ${err.route}\nGlobal: ${err.global}`)
      .setColor(bot.color);

    bot.sendhook(null, {
      channel: bot.err_chnl,
      embed: emed,
    });
  })

  .on('warn', (info) => bot.logger.warn(`info \n${info}`))
  .on('debug', (info) => {
    hook.send({ content: info });
  });

process.on('unhandledRejection', (reason, promise) => {
  const channel = bot.channels.cache.find((c) => c.id === bot.err_chnl);

  if (reason.stack.includes('DiscordAPIError: Unknown Message')) return;

  if (reason.stack.includes('DiscordAPIError: Missing Access')) return;

  if (reason.stack.includes('DiscordAPIError: Unknown Webhook')) return;

  if (reason.stack.includes('DiscordAPIError: Invalid Webhook Token')) return;

  if (reason.stack.includes('DiscordAPIError: Missing Permissions')) return;

  bot.logger.log(reason.stack);

  const embed = new EmbedBuilder()
    .setTitle(`${bot.emoji('error_CS')} • Unhandled Rejection`)
    .setURL('https://nodejs.org/api/process.html#event-unhandledrejection')
    .setDescription(`\`\`\`${reason.stack.split('').slice(0, 3500).join('')}\`\`\``)
    .setTimestamp()
    .setImage('https://giffiles.alphacoders.com/354/35481.gif')
    .setFooter({ text: 'Imagine a bot without anti-crash' })
    .setColor(bot.color);

  if (channel) {
    channel.send({ embeds: [embed] });
  } else if (!channel) {
    bot.logger.error(`${reason.stack}`);
  }
});

process.on('uncaughtException', (err, origin) => {
  const channel = bot.channels.cache.find((c) => c.id === bot.err_chnl);

  const embed = new EmbedBuilder()
    .setTitle(`${bot.emoji('error_CS')} • Uncaught Exception`)
    .setURL('https://nodejs.org/api/process.html#event-uncaughtexception')
    .setDescription(`\`\`\`${err.stack.split('').slice(0, 3500).join('')}\`\`\``)
    .setTimestamp()
    .setImage('https://giffiles.alphacoders.com/354/35481.gif')
    .setFooter({ text: 'Imagine a bot without anti-crash' })
    .setColor('#FF5757');

  if (channel) {
    channel.send({ embeds: [embed] });
  } else if (!channel) {
    bot.logger.error(`${err.stack}`);
  }
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
  const channel = bot.channels.cache.find((c) => c.id === bot.err_chnl);

  const embed = new EmbedBuilder()
    .setTitle(`${bot.error} • Uncaught Exception Monitor`)
    .setURL(
      'https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor',
    )
    .addFields({ name: 'Origin', value: origin.toString(), inline: true })
    .setDescription(`\`\`\`${err.stack.split('').slice(0, 3500).join('')}\`\`\``)
    .setImage('https://giffiles.alphacoders.com/354/35481.gif')
    .setTimestamp()
    .setFooter({ text: 'Imagine a bot without anti-crash' })
    .setColor('#FF5757');

  if (channel) {
    channel.send({ embeds: [embed] });
  } else if (!channel) {
    bot.logger.error(`${err.stack}`);
  }
});
