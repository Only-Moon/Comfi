const { CommandInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputComponent, ComponentType } = require('discord.js');


let ButtonNames = 'previous' | 'next' | 'search' | 'delete';



module.exports = async function evalFunction(interaction, options) {


  const {

    users,

    ephemeral = false,

    result,

    embed,

  } = options;


  let defaultStyles = {

    previous: ButtonStyle.Secondary,

    next: ButtonStyle.Secondary,

    search: ButtonStyle.Primary,

    delete: ButtonStyle.Danger,

  };


  let defaultEmojis = {

    previous: '884421503205134356',

    next: '884421235965059113',

    search: '883233237760086037',

    delete: '891534962917007410',

  };


  let p = 1;


  let firstIndex = 0;

  let lastIndex = 1000

  let pages = Math.ceil(result.length / 1000);


  let generateButtons = (status) => {


    let checkPage = (button) => {


      if ((['previous']).includes(button) && p === 1) return true;

      if ((['next']).includes(button) && p === pages) return true;


      return false;

    };


    let buttons = ['previous', 'next'];

    if (pages > 2) buttons = [...buttons, 'search'];

    if (!ephemeral) buttons = [...buttons, 'delete'];
    return buttons.reduce((buttons, button) => {
      
      buttons.push(new ButtonBuilder().setStyle(defaultStyles[button]).setEmoji(defaultEmojis[button]).setCustomId(button).setDisabled(status || checkPage(button)))

      return buttons;

    }, []);

  };


  let components = (status) => [


    new ActionRowBuilder().addComponents(...generateButtons(status)),

  ];


  let page = () => {


    let oldEmbed = embed.setDescription("Evaluated code").setFields(

      { name: `Type`, value: `${typeof result}`, inline: true },

      { name: `Length`, value: `${result.length}`, inline: true },

      { name: `Result (${p}/${pages})`, value: `\`\`\`ts\n${result.slice(firstIndex, lastIndex)}\`\`\``, inline: false },

    );

    let newEmbed = new EmbedBuilder(oldEmbed.data);


   // if (oldEmbed?.data.footer?.text) return [newEmbed.setFooter({ text: oldEmbed.data.footer.text, iconURL: oldEmbed.data.footer.icon_url })];

    return [newEmbed];

  };

  await interaction.followUp({ ephemeral, embeds: page(), components: components(), fetchReply: true }).then((fetch) => {


    let collector = (fetch).createMessageComponentCollector({ componentType: ComponentType.Button , time: 5 * 60 * 1000 });


    collector.on('end', async () => await interaction.editReply({ components: components(true) }).catch(() => null));

    collector.on('collect', async (button) => {


      if (users.some((user) => user.id !== button.user.id)) {


        await button.deferUpdate();

        await button.followUp({ ephemeral: true, content: `You cannot use this button.` }); return;

      };


      let id = button.customId;


      if (id === 'previous') p-- , firstIndex = firstIndex - 1000, lastIndex = lastIndex - 1000;

      if (id === 'next') p++ , firstIndex = firstIndex + 1000, lastIndex = lastIndex + 1000;

      if (id === 'delete') return await button.delete();


      if (id === 'search') {


        await button.showModal(

          new ModalBuilder({ title: `Page Selection`, custom_id: 'page-selection' }).addComponents(

            new ActionRowBuilder().addComponents(

              new TextInputComponent({

                type: 4,

                style: 1,

                custom_id: `page`,

                label: `Select Page (1-${pages})`,

                placeholder: `1-${pages}`,

                value: String(p),

                min_length: 1,

                max_length: String(pages).length,

                required: true,

              }),

            ),

          ),

        );


        return await button.awaitModalSubmit({ filter: (modal) => modal.customId === 'page-selection', time: 5 * 60 * 1000 }).then(async (modal) => {


          let pageValue = Number(modal.fields.getTextInputValue('page'));


          if (isNaN(pageValue) || pageValue > pages) return await modal.reply({ content: `The value does not fit the format.` });

          if (pageValue === p) return await modal.reply({ content: `Enter page number other than the selected page.` });


          p = pageValue;


          firstIndex = p * 1000 - 1000;

          lastIndex = p * 1000;


          await button.editReply({ embeds: page(), components: components() });


          if (modal.isFromMessage()) await modal.deferUpdate();

        });

      };

      
      await button.deferUpdate();

      await button.editReply({ embeds: page(), components: components() });


    });

  });

};


