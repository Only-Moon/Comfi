const discord = require('discord.js');
const bot = require('../../index');
const guilds = require('../../models/guild');

/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

bot.on('guildDelete', async (guild) => {
  await guilds.findOneAndReplace({ guildId: guild.id });

  const channelId = '881789380073783302';
  const channel = bot.channels.cache.get(channelId);
  if (!channel) return;

  let theowner = 'NO OWNER DATA! ID: ';
  await guild
    .fetchOwner()
    .then(({ user }) => {
      theowner = user;
    })
    .catch(() => {});

  const embed = new discord.EmbedBuilder()
    .setTitle('I got kicked!')
    .setDescription(
      `**Guild Name:** ${guild.name} (${guild.id})\n **Owner Info** \`\`\`${
        theowner
          ? `${theowner.tag} (${theowner.id})`
          : `${theowner} (${guild.ownerId})`
      }\`\`\` \n**Members:** ${guild.memberCount}`,
    )
    .setTimestamp()
    .setColor(bot.color)
    .setFooter({ text: `I'm in ${bot.guilds.cache.size} Guilds Now!` });

  channel.send({ embeds: [embed] });
});
