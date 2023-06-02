/*
 * Comfi Bot for Discord
 * Copyright (C) 2023 Xx-Mohit-xX
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

const Discord = require('discord.js');
const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require('discord.js');
const bot = require('../index');

/**
 * @param {Discord.CommandInteraction} message
 */

/**
  --- options ---

embedTitle => String
embedColor => String

embed => Embed

embedFoot => String
credit => Boolean
 */

async function embed(message, options = []) {
  return new Promise(async (resolve) => {
    let interaction;

    if (message.commandId) {
      interaction = message;
    }
    try {
      const done = new ButtonBuilder()
        .setLabel('Done')
        .setStyle(ButtonStyle.Danger)
        .setCustomId('setDone');

      const reject = new ButtonBuilder()
        .setLabel('Cancel/Delete')
        .setStyle(ButtonStyle.Danger)
        .setCustomId('setDelete');

      const name = [
        'Message',
        'Author',
        'Title',
        'Description',
        'Color',
        'URL',
        'Image',
        'Thumbnail',
        'Footer',
        'Timestamp',
      ];
      const desc = [
        'Message Outside the Embed',
        'Set a author name in the embed',
        'Title of the embed',
        'Description of the embed',
        'Color of the embed',
        'URL in the title in the embed (hyperlink for title)',
        'Image in the embed',
        'Thumbnail in the embed',
        'Footer of the embed',
        'Have a timestamp. Its cool.',
      ];
      const value = [
        'setContent',
        'setAuthor',
        'setTitle',
        'setDescription',
        'setColor',
        'setURL',
        'setImage',
        'setThumbnail',
        'setFooter',
        'setTimestamp',
      ];

      const menuOptions = [];

      const foot = options.footer || 'Comfi™ Embed Creator';

      for (let i = 0; i < name.length; i++) {
        const dataopt = {
          label: name[i],
          description: desc[i],
          value: value[i],
        };

        menuOptions.push(dataopt);
      }
      const slct = new StringSelectMenuBuilder()
        .setMaxValues(1)
        .setCustomId('embed-creator')
        .setPlaceholder('Embed Creation Options')
        .addOptions(menuOptions);

      const row = new ActionRowBuilder().addComponents([done, reject]);

      const row2 = new ActionRowBuilder().addComponents([slct]);

      const embed = new EmbedBuilder()
        .setTitle(options.embedTitle || 'Embed Creator')
        .setDescription(
          'Select any ***option*** from the Select Menu in this message and i will **collect all informations and create a embed** for you using that data.\n\nThis is a completed embed.',
        )
        .setImage(
          'https://user-images.githubusercontent.com/71836991/145395922-311bb29a-a45b-476a-b55e-73cd4717f401.png',
        )
        .setColor(bot.color)
        .setFooter({ text: `${foot}` });

      let e;
      if (message.commandId) {
        interaction.followUp({
          embeds: [options.embed || embed],
          components: [row2, row],
        });
      } else if (!message.commandId) {
        e = await message.reply({
          embeds: [options.embed || embed],
          components: [row2, row],
        });
      }

      const emb = new EmbedBuilder()
        .setFooter({ text: `${foot}` })
        .setColor('#2F3136');

      message.channel
        .send({ content: '** **', embeds: [emb] })
        .then(async (a) => {
          let lel;
          let membed;

          if (message.commandId) {
            lel = await message.fetchReply();
            e = await message.fetchReply();
            membed = await message.channel.messages.fetch(a.id);
          } else if (!message.commandId) {
            membed = await message.channel.messages.fetch(a.id);
            lel = await message.channel.messages.fetch(e.id);
          }

          const filter = (m) => m.user.id === (interaction ? interaction.user : message.author).id;
          const collector = e.createMessageComponentCollector({
            filter,
            type: ComponentType.SelectMenu,
            idle: 600000,
          });
          const name = `${options.name || ''}`;

          collector.on('collect', async (button) => {
            if (button.customId && button.customId === 'setDelete') {
              button.reply({ content: 'Deleting...', ephemeral: true });

              membed.delete().catch(() => {});
              e.delete().catch(() => {});
            } else if (button.customId && button.customId === 'setDone') {
              button.reply({
                content: `${bot.tick} • Added the embed to ${name} database`,
              });
              membed.delete().catch(() => {});
              e.delete().catch(() => {});

              resolve({
                embed: membed?.embeds[0]?.toJSON(),
                content: membed.content,
              });
            } else if (button.values[0] === 'setTimestamp') {
              const btn = new Discord.ButtonBuilder()
                .setLabel('Yes')
                .setCustomId('timestamp-yes')
                .setStyle(ButtonStyle.Danger);

              const btn2 = new Discord.ButtonBuilder()
                .setLabel('No')
                .setCustomId('timestamp-no')
                .setStyle(ButtonStyle.Danger);

              button.reply({
                content: 'Do you want a Timestamp in the embed ?',
                ephemeral: true,
                components: [new ActionRowBuilder().addComponents([btn, btn2])],
              });

              const filter = (m) => (interaction ? interaction.user : message.author).id
                === (m.user ? m.user : m.author).id;
              const titleclr = button.channel.createMessageComponentCollector({
                filter,
                idle: 60000,
              });

              titleclr.on('collect', async (btn) => {
                if (btn.customId === 'timestamp-yes') {
                  const url = membed.embeds[0].image
                    ? membed.embeds[0].image.url
                    : '';

                  const msg = new EmbedBuilder()
                    .setTitle(membed.embeds[0].title || '')
                    .setDescription(membed.embeds[0].description || '')
                    .setColor(membed.embeds[0].color || '#36393F')
                    .setFooter(membed.embeds[0].footer.text || '')
                    .setImage(url)
                    .setURL(membed.embeds[0].url || '')
                    .setThumbnail(
                      membed.embeds[0].thumbnail
                        ? membed.embeds[0].thumbnail.url
                        : '',
                    )
                    .setAuthor({
                      name: membed.embeds[0].author?.name
                        ? membed.embeds[0].author?.name
                        : '',
                      iconURL: membed.embeds[0].author?.icon_url
                        ? membed.embeds[0].author?.icon_url
                        : '',
                      url: membed.embeds[0].author?.url
                        ? membed.embeds[0].author?.url
                        : '',
                    })
                    .setTimestamp(new Date());

                  button.editReply({
                    components: [],
                    content: 'Enabled Timestamp on the embed',
                  });

                  membed
                    .edit({ content: membed.content, embeds: [msg] })
                    .catch(() => {});
                }

                if (btn.customId === 'timestamp-no') {
                  const url = membed.embeds[0].image
                    ? membed.embeds[0].image.url
                    : '';

                  const msg = new EmbedBuilder()
                    .setTitle(membed.embeds[0].title || '')
                    .setDescription(membed.embeds[0].description || '')
                    .setColor(membed.embeds[0].color || '#36393F')
                    .setFooter(membed.embeds[0].footer.text || '')
                    .setImage(url)
                    .setURL(membed.embeds[0].url || '')
                    .setThumbnail(
                      membed.embeds[0].thumbnail
                        ? membed.embeds[0].thumbnail.url
                        : '',
                    )
                    .setAuthor({
                      name: membed.embeds[0].author?.name
                        ? membed.embeds[0].author?.name
                        : '',
                      iconURL: membed.embeds[0].author?.icon_url
                        ? membed.embeds[0].author?.icon_url
                        : '',
                      url: membed.embeds[0].author?.url
                        ? membed.embeds[0].author?.url
                        : '',
                    })
                    .setTimestamp(false);

                  button.editReply({
                    components: [],
                    content: 'Disabled Timestamp on the embed',
                  });

                  membed
                    .edit({ content: membed.content, embeds: [msg] })
                    .catch(() => {});
                }
              });
            } else if (button.values[0] === 'setAuthor') {
              const autsel = new StringSelectMenuBuilder()
                .setMaxValues(1)
                .setCustomId('author-selct')
                .setPlaceholder('Author Options')
                .addOptions([
                  {
                    label: 'Author name',
                    description: 'Set the author name',
                    value: 'author-name',
                  },
                  {
                    label: 'Author icon',
                    description: 'Set the author icon',
                    value: 'author-icon',
                  },
                  {
                    label: 'Author URL',
                    description: 'Set the author url',
                    value: 'author-url',
                  },
                ]);

              button.reply({
                content: 'Select one from these "Author" options',
                ephemeral: true,
                components: [new ActionRowBuilder().addComponents([autsel])],
              });

              const filter = (m) => (interaction ? interaction.user : message.author).id
                === (m.user ? m.user : m.author).id;
              const titleclr = button.channel.createMessageComponentCollector({
                filter,
                idle: 60000,
              });

              titleclr.on('collect', async (menu) => {
                menu.deferUpdate();
                if (menu.customId !== 'author-selct') return;

                if (menu.values[0] === 'author-name') {
                  button.editReply({
                    content: 'Send me the Author name',
                    ephemeral: true,
                    components: [],
                  });

                  const authclr = button.channel.createMessageCollector({
                    filter,
                    time: 30000,
                    max: 1,
                  });

                  authclr.on('collect', async (m) => {
                    const url = membed.embeds[0].image
                      ? membed.embeds[0].image.url
                      : '';

                    const msg = new EmbedBuilder()
                      .setTitle(membed.embeds[0].title || '')
                      .setDescription(membed.embeds[0].description || '')
                      .setColor(membed.embeds[0].color || '#36393F')
                      .setFooter({ text: membed.embeds[0].footer.text || '' })
                      .setImage(url)
                      .setURL(membed.embeds[0].url || '')
                      .setThumbnail(
                        membed.embeds[0].thumbnail
                          ? membed.embeds[0].thumbnail.url
                          : '',
                      )
                      .setAuthor({
                        name: m.content,
                        iconURL: membed.embeds[0].author?.icon_url
                          ? membed.embeds[0].author?.icon_url
                          : '',
                        url: membed.embeds[0].author?.url
                          ? membed.embeds[0].author?.url
                          : '',
                      })
                      .setTimestamp(
                        membed.embeds[0].timestamp ? new Date() : false,
                      );

                    titleclr.stop();
                    m.delete().catch(() => {});

                    membed
                      .edit({ content: membed.content, embeds: [msg] })
                      .catch(() => {});
                  });
                }

                if (menu.values[0] === 'author-icon') {
                  button.editReply({
                    content: 'Send me the Author icon (Attachment/Image URL)',
                    ephemeral: true,
                    components: [],
                  });

                  const authclr = button.channel.createMessageCollector({
                    filter,
                    time: 30000,
                    max: 1,
                  });

                  authclr.on('collect', async (m) => {
                    const url = membed.embeds[0].image
                      ? membed.embeds[0].image.url
                      : '';

                    const isthumb = m.content.match(
                      /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim,
                    ) !== null
                      || m.attachments.first()?.url
                      || '';
                    if (!isthumb) {
                      return button.editReply({
                        content:
                          'This is not a image url. Please provide a image url or attachment.',
                        ephemeral: true,
                      });
                    }

                    const msg = new EmbedBuilder()
                      .setTitle(membed.embeds[0].title || '')
                      .setDescription(membed.embeds[0].description || '')
                      .setColor(membed.embeds[0].color || '#36393F')
                      .setFooter({ text: membed.embeds[0].footer.text || '' })
                      .setImage(url)
                      .setURL(membed.embeds[0].url || '')
                      .setThumbnail(
                        membed.embeds[0].thumbnail
                          ? membed.embeds[0].thumbnail.url
                          : '',
                      )
                      .setTimestamp(
                        membed.embeds[0].timestamp ? new Date() : false,
                      )
                      .setAuthor({
                        name: membed.embeds[0].author?.name
                          ? membed.embeds[0].author?.name
                          : '',
                        iconURL: m.content || m.attachments.first().url || '',
                        url: membed.embeds[0].author?.url
                          ? membed.embeds[0].author?.url
                          : '',
                      });

                    titleclr.stop();
                    m.delete().catch(() => {});

                    membed
                      .edit({ content: membed.content, embeds: [msg] })
                      .catch(() => {});
                  });
                }

                if (menu.values[0] === 'author-url') {
                  button.editReply({
                    content: 'Send me the Author Hyperlink',
                    ephemeral: true,
                    components: [],
                  });

                  const authclr = button.channel.createMessageCollector({
                    filter,
                    time: 30000,
                    max: 1,
                  });

                  authclr.on('collect', async (m) => {
                    const url = membed.embeds[0].image
                      ? membed.embeds[0].image.url
                      : '';

                    if (!m.content.startsWith('http')) {
                      m.delete().catch(() => {});
                      return button.editReply(
                        'A URL should start with http protocol. Please give a valid URL.',
                      );
                    }
                    const msg = new EmbedBuilder()
                      .setTitle(membed.embeds[0].title || '')
                      .setDescription(membed.embeds[0].description || '')
                      .setColor(membed.embeds[0].color || '#36393F')
                      .setFooter({ text: membed.embeds[0].footer.text || '' })
                      .setImage(url)
                      .setURL(membed.embeds[0].url || '')
                      .setThumbnail(
                        membed.embeds[0].thumbnail
                          ? membed.embeds[0].thumbnail.url
                          : '',
                      )
                      .setAuthor({
                        name: membed.embeds[0].author?.name
                          ? membed.embeds[0].author?.name
                          : '',
                        iconURL: membed.embeds[0].author?.icon_url
                          ? membed.embeds[0].author?.icon_url
                          : '',
                        url: m.content || '',
                      })
                      .setTimestamp(
                        membed.embeds[0].timestamp ? new Date() : false,
                      );

                    titleclr.stop();
                    m.delete().catch(() => {});

                    membed
                      .edit({ content: membed.content, embeds: [msg] })
                      .catch(() => {});
                  });
                }
              });
            } else if (button.values[0] === 'setContent') {
              button.reply({
                content:
                  'Tell me what text you want for message outside of embed',
                ephemeral: true,
              });
              const filter = (m) => (interaction ? interaction.user : message.author).id
                === m.author.id;
              const titleclr = button.channel.createMessageCollector({
                filter,
                time: 30000,
                max: 1,
              });

              titleclr.on('collect', async (m) => {
                const url = membed.embeds[0].image
                  ? membed.embeds[0].image.url
                  : '';

                const msg = new EmbedBuilder()
                  .setTitle(membed.embeds[0]?.title || '')
                  .setDescription(membed.embeds[0].description || '')
                  .setColor(membed.embeds[0].color || '#36393F')
                  .setFooter({ text: membed.embeds[0].footer.text || '' })
                  .setImage(url)
                  .setURL(membed.embeds[0].url || '')
                  .setThumbnail(
                    membed.embeds[0].thumbnail
                      ? membed.embeds[0].thumbnail.url
                      : '',
                  )
                  .setTimestamp(membed.embeds[0].timestamp ? new Date() : false)
                  .setAuthor({
                    name: membed.embeds[0].author?.name
                      ? membed.embeds[0].author?.name
                      : '',
                    iconURL: membed.embeds[0].author?.icon_url
                      ? membed.embeds[0].author?.icon_url
                      : '',
                    url: membed.embeds[0].author?.url
                      ? membed.embeds[0].author?.url
                      : '',
                  });

                titleclr.stop();
                m.delete().catch(() => {});

                membed
                  .edit({ content: m.content, embeds: [msg] })
                  .catch(() => {});
              });
            } else if (button.values[0] === 'setThumbnail') {
              button.reply({
                content:
                  'Tell me what image you want for embed thumbnail (small image at top right)',
                ephemeral: true,
              });
              const filter = (m) => (interaction ? interaction.user : message.author).id
                === m.author.id;
              const titleclr = button.channel.createMessageCollector({
                filter,
                time: 30000,
                max: 1,
              });

              titleclr.on('collect', async (m) => {
                const url = membed.embeds[0].image
                  ? membed.embeds[0].image.url
                  : '';

                const isthumb = m.content.match(
                  /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim,
                ) !== null
                  || m.attachments.first().url
                  || '';
                if (!isthumb) {
                  return message.followUp({
                    content:
                      'This is not a image url. Please provide a image url or attachment.',
                    ephemeral: true,
                  });
                }

                const msg = new EmbedBuilder()
                  .setTitle(membed.embeds[0].title || '')
                  .setDescription(membed.embeds[0].description || '')
                  .setColor(membed.embeds[0].color || '#2F3136')
                  .setURL(membed.embeds[0].url || '')
                  .setFooter({ text: membed.embeds[0].footer.text || '' })
                  .setImage(url)
                  .setThumbnail(m.content || m.attachments.first().url || '')
                  .setAuthor({
                    name: membed.embeds[0].author?.name
                      ? membed.embeds[0].author?.name
                      : '',
                    iconURL: membed.embeds[0].author?.icon_url
                      ? membed.embeds[0].author?.icon_url
                      : '',
                    url: membed.embeds[0].author?.url
                      ? membed.embeds[0].author?.url
                      : '',
                  })
                  .setTimestamp(
                    membed.embeds[0].timestamp ? new Date() : false,
                  );

                titleclr.stop();
                m.delete().catch(() => {});

                membed
                  .edit({ content: membed.content, embeds: [msg] })
                  .catch(() => {});
              });
            } else if (button.values[0] === 'setColor') {
              button.reply({
                content: 'Tell me what color you want for embed',
                ephemeral: true,
              });
              const filter = (m) => (interaction ? interaction.user : message.author).id
                === m.author.id;
              const titleclr = button.channel.createMessageCollector({
                filter,
                time: 30000,
              });

              titleclr.on('collect', async (m) => {
                if (/^#[0-9A-F]{6}$/i.test(m.content)) {
                  const url = membed.embeds[0].image
                    ? membed.embeds[0].image.url
                    : '';

                  const msg = new EmbedBuilder()
                    .setTitle(membed.embeds[0].title || '')
                    .setDescription(membed.embeds[0].description || '')
                    .setColor(`${m.content}`)
                    .setURL(membed.embeds[0].url || '')
                    .setFooter({ text: membed.embeds[0].footer.text || '' })
                    .setImage(url)
                    .setAuthor({
                      name: membed.embeds[0].author?.name
                        ? membed.embeds[0].author?.name
                        : '',
                      iconURL: membed.embeds[0].author?.icon_url
                        ? membed.embeds[0].author?.icon_url
                        : '',
                      url: membed.embeds[0].author?.url
                        ? membed.embeds[0].author?.url
                        : '',
                    })
                    .setTimestamp(
                      membed.embeds[0].timestamp ? new Date() : false,
                    )
                    .setThumbnail(
                      membed.embeds[0].thumbnail
                        ? membed.embeds[0].thumbnail.url
                        : '',
                    );

                  m.delete().catch(() => {});
                  titleclr.stop();
                  membed
                    .edit({ content: membed.content, embeds: [msg] })
                    .catch(() => {});
                } else {
                  message.followUp('Please give me a valid hex code');
                }
              });
            } else if (button.values[0] === 'setURL') {
              button.reply({
                content:
                  'Tell me what URL you want for embed title (hyperlink for embed title)',
                ephemeral: true,
              });
              const filter = (m) => (interaction ? interaction.user : message.author).id
                === m.author.id;
              const titleclr = button.channel.createMessageCollector({
                filter,
                time: 30000,
                max: 1,
              });

              titleclr.on('collect', async (m) => {
                if (!m.content.startsWith('http')) {
                  m.delete().catch(() => {});
                  return button.editReply(
                    'A URL should start with http protocol. Please give a valid URL.',
                  );
                }
                const url = membed.embeds[0].image
                  ? membed.embeds[0].image.url
                  : '';
                const msg = new EmbedBuilder()
                  .setTitle(membed.embeds[0].title || '')
                  .setAuthor({
                    name: membed.embeds[0].author?.name
                      ? membed.embeds[0].author?.name
                      : '',
                    iconURL: membed.embeds[0].author?.icon_url
                      ? membed.embeds[0].author?.icon_url
                      : '',
                    url: membed.embeds[0].author?.url
                      ? membed.embeds[0].author?.url
                      : '',
                  })
                  .setTimestamp(
                    membed.embeds[0].timestamp ? new Date() : false,
                  )
                  .setURL(m.content)
                  .setDescription(membed.embeds[0].description || '')
                  .setColor(membed.embeds[0].color || '#2F3136')
                  .setImage(url || '')
                  .setFooter({ text: membed.embeds[0].footer.text || '' })
                  .setThumbnail(
                    membed.embeds[0].thumbnail
                      ? membed.embeds[0].thumbnail.url
                      : '',
                  );

                m.delete().catch(() => {});
                titleclr.stop();
                membed
                  .edit({ content: membed.content, embeds: [msg] })
                  .catch(() => {});
              });
            } else if (button.values[0] === 'setImage') {
              button.reply({
                content: 'Tell me what image you want for embed',
                ephemeral: true,
              });
              const filter = (m) => (interaction ? interaction.user : message.author).id
                === m.author.id;
              const titleclr = button.channel.createMessageCollector({
                filter,
                time: 30000,
                max: 1,
              });

              titleclr.on('collect', async (m) => {
                const isthumb = m.content.match(
                  /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim,
                ) !== null
                  || m.attachments.first().url
                  || '';
                if (!isthumb) {
                  return message.followUp(
                    'This is not a image url. Please provide a image url or attachment.',
                  );
                }

                const msg = new EmbedBuilder()
                  .setTitle(membed.embeds[0].title || '')
                  .setDescription(membed.embeds[0].description || '')
                  .setColor(membed.embeds[0].color || '#2F3136')
                  .setFooter({ text: membed.embeds[0].footer.text || '' })
                  .setAuthor({
                    name: membed.embeds[0].author?.name
                      ? membed.embeds[0].author?.name
                      : '',
                    iconURL: membed.embeds[0].author?.icon_url
                      ? membed.embeds[0].author?.icon_url
                      : '',
                    url: membed.embeds[0].author?.url
                      ? membed.embeds[0].author?.url
                      : '',
                  })
                  .setImage(m.content || m.attachments.first().url)
                  .setURL(membed.embeds[0].url)
                  .setThumbnail(
                    membed.embeds[0].thumbnail
                      ? membed.embeds[0].thumbnail.url
                      : '',
                  )
                  .setTimestamp(
                    membed.embeds[0].timestamp ? new Date() : false,
                  );

                m.delete().catch(() => {});
                titleclr.stop();
                membed
                  .edit({ content: membed.content, embeds: [msg] })
                  .catch(() => {});
              });
            } else if (button.values[0] === 'setTitle') {
              button.reply({
                content: 'Tell me what text you want for embed title',
                ephemeral: true,
              });
              const filter = (m) => (interaction ? interaction.user : message.author).id
                === m.author.id;
              const titleclr = button.channel.createMessageCollector({
                filter,
                time: 30000,
                max: 1,
              });

              titleclr.on('collect', async (m) => {
                const url = membed.embeds[0].image
                  ? membed.embeds[0].image.url
                  : '';
                const msg = new EmbedBuilder()
                  .setTitle(m?.content)
                  .setURL(membed.embeds[0].url || '')
                  .setDescription(membed.embeds[0].description || '')
                  .setAuthor({
                    name: membed.embeds[0].author?.name
                      ? membed.embeds[0].author?.name
                      : '',
                    iconURL: membed.embeds[0].author?.icon_url
                      ? membed.embeds[0].author?.icon_url
                      : '',
                    url: membed.embeds[0].author?.url
                      ? membed.embeds[0].author?.url
                      : '',
                  })
                  .setColor(membed.embeds[0].color || '#2F3136')
                  .setThumbnail(
                    membed.embeds[0].thumbnail
                      ? membed.embeds[0].thumbnail.url
                      : '',
                  )
                  .setTimestamp(membed.embeds[0].timestamp ? new Date() : false)
                  .setImage(url || '')
                  .setFooter({ text: membed.embeds[0].footer.text || '' });
                m.delete().catch(() => {});
                titleclr.stop();

                membed
                  .edit({ content: membed.content, embeds: [msg] })
                  .catch(() => {});
              });
            } else if (button.values[0] === 'setDescription') {
              button.reply({
                content: 'Tell me what text you want for embed description',
                ephemeral: true,
              });
              const filter = (m) => (interaction ? interaction.user : message.author).id
                === m.author.id;
              const titleclr = button.channel.createMessageCollector({
                filter,
                time: 30000,
                max: 1,
              });

              titleclr.on('collect', async (m) => {
                const url = membed.embeds[0].image
                  ? membed.embeds[0].image.url
                  : '';

                const msg = new EmbedBuilder()
                  .setTitle(membed.embeds[0].title || '')
                  .setURL(membed.embeds[0].url || '')
                  .setDescription(m.content)
                  .setTimestamp(membed.embeds[0].timestamp ? new Date() : false)
                  .setAuthor({
                    name: membed.embeds[0].author?.name
                      ? membed.embeds[0].author?.name
                      : '',
                    iconURL: membed.embeds[0].author?.icon_url
                      ? membed.embeds[0].author?.icon_url
                      : '',
                    url: membed.embeds[0].author?.url
                      ? membed.embeds[0].author?.url
                      : '',
                  })
                  .setThumbnail(
                    membed.embeds[0].thumbnail
                      ? membed.embeds[0].thumbnail.url
                      : '',
                  )
                  .setColor(membed.embeds[0].color || '#2F3136')
                  .setImage(url || '')
                  .setFooter({ text: membed.embeds[0].footer.text || '' });
                m.delete().catch(() => {});
                titleclr.stop();
                membed
                  .edit({ content: membed.content, embeds: [msg] })
                  .catch(() => {});
              });
            } else if (button.values[0] === 'setFooter') {
              button.reply({
                content: 'Tell me what text you want for embed footer',
                ephemeral: true,
              });
              const filter = (m) => (interaction ? interaction.user : message.author).id
                === m.author.id;
              const titleclr = button.channel.createMessageCollector({
                filter,
                time: 30000,
                max: 1,
              });

              titleclr.on('collect', async (m) => {
                const url = membed.embeds[0].image
                  ? membed.embeds[0].image.url
                  : '';

                const msg = new EmbedBuilder()
                  .setTitle(membed.embeds[0].title || '')
                  .setURL(membed.embeds[0].url || '')
                  .setTimestamp(membed.embeds[0].timestamp ? new Date() : false)
                  .setThumbnail(
                    membed.embeds[0].thumbnail
                      ? membed.embeds[0].thumbnail.url
                      : '',
                  )
                  .setDescription(membed.embeds[0].description || '')
                  .setColor(membed.embeds[0].color || '#2F3136')
                  .setFooter({ text: m.content || '' })
                  .setImage(url || '')
                  .setAuthor({
                    name: membed.embeds[0].author?.name
                      ? membed.embeds[0].author?.name
                      : '',
                    iconURL: membed.embeds[0].author?.icon_url
                      ? membed.embeds[0].author?.icon_url
                      : '',
                    url: membed.embeds[0].author?.url
                      ? membed.embeds[0].author?.url
                      : '',
                  });

                m.delete().catch(() => {});

                titleclr.stop();

                membed
                  .edit({ content: membed.content, embeds: [msg] })
                  .catch(() => {});
              });
            }
          });
          collector.on('end', async (collected, reason) => {
            if (reason === 'time') {
              const content = new ButtonBuilder()
                .setLabel('Timeout')
                .setStyle(ButtonStyle.Danger)
                .setCustomId('timeout|91817623842')
                .setDisabled();

              const row = new ActionRowBuilder().addComponents([content]);

              e.edit({ embeds: [lel.embeds[0]], components: [row] });
            }
          });
        });
    } catch (e) {
      await bot.senderror(message, e);
    }
  });
}

module.exports = embed;
