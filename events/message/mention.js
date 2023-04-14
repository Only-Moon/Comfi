const {
  EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder,
} = require('discord.js');
const bot = require('../../index');

/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

bot.on('messageCreate', async (message) => {
  if (message.author.bot) return;
try {
  const mentionRegex = message.content.match(
    new RegExp(`^<@!?(${bot.user.id})>`, 'gi'),
  );
  if (mentionRegex) {
    let totalCommands = 0;
    bot.slashCommands.each((c) => totalCommands++);
    const ping = new EmbedBuilder()
      .setDescription(
        ` > ɛiɜ • **Hello I'm ${
          bot.user.username
        }**!\n\n > ↛ • You can see all my commands by running \`/helpp\`!\n > ↛ • I have a total of **${
          bot.guilds.cache.size
        }** servers, **${
          bot.users.cache.size
        }** users, ${bot.emojis.cache.size} emojis and ${totalCommands} commands !!`,
      )
      .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
      .setColor(bot.color)
      .setFooter({ text: 'Made by Moonbow#5817' })
      .setTimestamp();

    const sup = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel('Join Support!')
      .setURL(bot.support)
      .setEmoji('883032991293653062');

    const inv = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel('Invite Me!')
      .setURL(`${bot.dash}invite`)
      .setEmoji('883017868944502804');

    const dash = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel('Check Dashboard!')
      .setURL(bot.dash)
      .setEmoji('883017884014637066');

    const row = new ActionRowBuilder().addComponents(sup, inv, dash);

      await message
        .reply({
          embeds: [ping],
          components: [row],
          allowedMentions: { repliedUser: false },
        }).catch(() => null);
  }
    } catch (e) {
      await bot.senderror(message, e);
    }
});
