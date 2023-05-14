const {
  EmbedBuilder,
  ButtonBuilder, ButtonStyle,
  ActionRowBuilder,
  Permissions,
  ChannelType
} = require('discord.js');
const moment = require("moment")
const bot = require('../../index');
const guilds = require('../../models/guild');

/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

bot.on('guildCreate', async (guild) => {
  await guilds.create({ guildId: guild.id });

  {
    const ch = guild.channels.cache.find(
      (channel) => channel.type === ChannelType.GuildText
				&& channel.permissionsFor(guild.members.me).has("SendMessages"),
    );

    const button = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel('Support')
      .setURL('https://discord.gg/remYPHCVgW');

    const row = new ActionRowBuilder().addComponents(button);

    const msg = new EmbedBuilder()
      .setTitle(
        '<a:pinkheart_cs:883033001599074364> Thanks for adding me! <a:pinkheart_cs:883033001599074364>',
      )
      .setColor(bot.color)
      .setDescription(
        `Hey, thanks for adding me to ${
          guild.name
        } :-<a:wing_cs:883032991293653062> \n My Prefix Is **/** \n\n To get started type **/help** Or **/settings**`,
      )
      .setFooter({ text: 'Comfi™ v3.0.0' });

    if (ch) {
      ch.send({
        embeds: [msg],
        components: [row],
      });
    }
  }
  {
    const channelId = '881789380073783301';

        const channel = bot.channels.cache.get(channelId);
        if (!channel) return;

        let theowner = 'Owner Not Found !!';
        await guild.fetchOwner().then(({ user }) => { theowner = user; }).catch(() => {});

        const embed = new EmbedBuilder()
          .setThumbnail(guild.iconURL({ size: 1024 }))
          .setTitle(`Someone Invited Me to Join ${guild.name}`)
          .addFields([
            { name: 'Name', value: `\`${guild.name}\`` },
            { name: 'ID', value: `\`${guild.id}\`` },
            { name: 'Owner', value: `\`${guild.members.cache.get(theowner.id) ? guild.members.cache.get(theowner.id).user.tag : 'Unknown user'}\` ${theowner.id}` },
            { name: 'Member Count', value: `\`${guild.members.memberCount}\` Members` },
            { name: 'Creation Date', value: `\`${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\`` },
            { name: `${bot.user.username}'s Server Count`, value: `\`${bot.guilds.cache.size}\` Servers` },
          ])
          .setTimestamp()
          .setColor(bot.color);

        if (channel) {
          channel.send({
            embeds: [embed],
          });
        }
  }
});
