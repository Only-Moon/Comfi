const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const bot = require('../../index');
const guilds = require('../../models/guild');

/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

bot.on('messageCreate', async (message) => {
  if (
    message.author.bot
    || !message.guild
    || message.webhookID
    || !message.channel
  ) return;

  const guild = await guilds.findOne({ guildId: message.guild.id });

  const disabled = new EmbedBuilder()
    .setTitle(`${bot.error} • Chatbot Error`)
    .setColor(bot.color)
    .setDescription('Chat Bot is disabled by the Owner in this Server!')
    .setFooter({ text: `Requested by ${message.author.username}` });

  if (guild?.chatbot) {
    const ch = guild?.chat_channel;

    if (!ch || ch === undefined) return;

    if (message.channel?.id === ch) {
      try {
        const ranges = [
          '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
          '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
          '\ud83d[\ude80-\udeff]', // U+1F680 to U+1F6FF
        ];

        let input = message.cleanContent.replace(
          new RegExp(ranges.join('|'), 'g'),
          '.',
        );

        // Replacing Emojis
        input = input.replace(/<a?:.+:\d+>/gm, '');

        await message.channel.sendTyping().catch(() => null);

        const url = new URL('http://api.brainshop.ai/get');
        const params = url.searchParams;

        params.set('bid', '169792');
        params.set('key', 'XkKMsSEdU5rsUTrw');
        params.set('uid', `[${message.author.id}`);
        params.set('msg', input);

        // Using await instead of .then
        const jsonRes = await fetch(url).then((res) => res.json()).then((data) => data).catch(async (e) => {
          await bot.senderror(message, e);
        });
        if (jsonRes.status && jsonRes.status.code === '400') {
          return await bot.errorEmbed(bot, message, 'Sorry there\'s some issue with my chatbot. Kindly report it to my Developer and Disable it untill further update from my Developer');
        }

        const chatbotReply = jsonRes.cnt
          .replace(/@everyone/g, '`@everyone`')
          .replace(/@here/g, '`@here`');

        if (chatbotReply === '') {
          return message.reply({
            content: 'Uh What ?',
            allowedMentions: { repliedUser: false },
          });
        }

        await message
          .reply({
            content: chatbotReply,
            allowedMentions: { repliedUser: false },
          })
          .catch(() => null);
      } catch (err) {
        if (err instanceof fetch.FetchError) {
          if (err.type === 'invalid-json') {
            message
              .reply({ content: '**Error:**\n```API offline```' })
              .catch(() => null); // Catch errors that happen while fetching
          }
        } else {
          await bot.senderror(message, err);
        }
      }
    } else return;
  } else if (!guild.chatbot && message.channel?.id === guild.chat_channel) {
    return (
      message.delete(),
      message.author.send({ embeds: [disabled] }).catch(() => null)
    );
  }
});
