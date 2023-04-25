module.exports = {
  pagination,
};

const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require('discord.js');
/**
  *
  * @param {ChatInputCommandInteraction} interaction
  * @param {EmbedBuilder[]} embeds
  * @returns
  */
async function pagination(interaction, embeds) {
  if (interaction.deferred == false) {
    await interaction.deferReply().catch(() => {});
  }

  const but1 = new ButtonBuilder()
    .setStyle(ButtonStyle.Secondary)
    .setCustomId('first')
    .setEmoji('884420649580363796')
    .setDisabled(false);

  const but2 = new ButtonBuilder()
    .setStyle(ButtonStyle.Secondary)
    .setCustomId('previous')
    .setEmoji('884421503205134356')
    .setDisabled(false);

  const but3 = new ButtonBuilder()
    .setStyle(ButtonStyle.Secondary)
    .setCustomId('delete')
    .setEmoji('891534962917007410')
    .setDisabled(false);

  const but4 = new ButtonBuilder()
    .setStyle(ButtonStyle.Secondary)
    .setCustomId('next')
    .setEmoji('884421235965059113')
    .setDisabled(false);

  const but5 = new ButtonBuilder()
    .setStyle(ButtonStyle.Secondary)
    .setCustomId('last')
    .setEmoji('884420650549272586')
    .setDisabled(false);

  const row = new ActionRowBuilder().addComponents(
    but1.setDisabled(false),
    but2.setDisabled(false),
    but3.setDisabled(false),
    but4.setDisabled(false),
    but5.setDisabled(false),
  );

  if (embeds.length == 1) {
    return interaction.editReply({
      embeds: [embeds[0]],
      components: [
        new ActionRowBuilder().addComponents(
          [
            but1.setDisabled(true),
            but2.setDisabled(true),
            but3.setDisabled(true),
            but4.setDisabled(true),
            but5.setDisabled(true),
          ],
        ),
      ],
    });
  }

  embeds = embeds.map((embed, index) => embed.setFooter({
    text: `Page: ${index + 1}/${embeds.length}`,
    iconURL: interaction.guild.iconURL(),
  }));

  const sendMsg = await interaction.editReply({
    embeds: [embeds[0]],
    components: [
      new ActionRowBuilder().addComponents(
        but1.setDisabled(true),
        but2.setDisabled(true),
        but3.setDisabled(false),
        but4.setDisabled(false),
        but5.setDisabled(false),
      ),
    ],
  });

  const filter = (m) => m.member.id === interaction.member.id;

  const collector = sendMsg.createMessageComponentCollector({
    filter,
    time: 60000,
    componentType: ComponentType.Button,
  });

  let curPage = 0;

  collector.on('collect', async (b) => {
    await b.deferUpdate().catch((e) => null);

    switch (b.customId) {
      case 'next': {
        curPage++;
        if (curPage !== embeds.length - 1) {
          await sendMsg.edit({
            embeds: [embeds[curPage]],
            components: [
              new ActionRowBuilder().addComponents(
                but1.setDisabled(false),
                but2.setDisabled(false),
                but3.setDisabled(false),
                but4.setDisabled(false),
                but5.setDisabled(false),
              ),
            ],
          });
        } else {
          await sendMsg.edit({
            embeds: [embeds[curPage]],
            components: [
              new ActionRowBuilder().addComponents(
                but1.setDisabled(false),
                but2.setDisabled(false),
                but3.setDisabled(false),
                but4.setDisabled(true),
                but5.setDisabled(true),
              ),
            ],
          });
        }
      }
        break;

      case 'previous': {
        curPage--;
        if (curPage !== 0) {
          return sendMsg.edit({
            embeds: [embeds[curPage]],
            components: [
              new ActionRowBuilder().addComponents(
                but1.setDisabled(false),
                but2.setDisabled(false),
                but3.setDisabled(false),
                but4.setDisabled(false),
                but5.setDisabled(false),
              ),
            ],
          });
        }
        sendMsg.edit({
          embeds: [embeds[curPage]],
          components: [
            new ActionRowBuilder().addComponents(
              but1.setDisabled(true),
              but2.setDisabled(true),
              but3.setDisabled(false),
              but4.setDisabled(false),
              but5.setDisabled(false),
            ),
          ],
        });
      }

        break;

      case 'first': {
        curPage = 0;
        await sendMsg.edit({
          embeds: [embeds[curPage]],
          components: [
            new ActionRowBuilder().addComponents(
              but1.setDisabled(true),
              but2.setDisabled(true),
              but3.setDisabled(false),
              but4.setDisabled(false),
              but5.setDisabled(false),
            ),
          ],
        });
      }

        break;

      case 'last': {
        curPage = embeds.length - 1;
        await sendMsg.edit({
          embeds: [embeds[curPage]],
          components: [
            new ActionRowBuilder().addComponents(
              but1.setDisabled(false),
              but2.setDisabled(false),
              but3.setDisabled(false),
              but4.setDisabled(true),
              but5.setDisabled(true),
            ),
          ],
        });
      }

        break;

      case 'delete': {
        row.components.forEach((btn) => btn.setDisabled(true));

        await sendMsg.edit({
          embeds: [embeds[curPage]],
          components: [row],
        });
      }
    }

    collector.on('end', async () => {
      row.components.forEach((btn) => btn.setDisabled(true));

      if (sendMsg.editable) {
        await sendMsg.edit({
          embeds: [embeds[curPage]],
          components: [row],
        });
      }
    });
  });
}
