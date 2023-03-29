/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const {
  CommandInteraction, EmbedBuilder, ActionRowBuilder, TextInputBuilder, ModalBuilder, TextInputStyle, Util,
} = require('discord.js');
const { inspect } = require('util');
const evalFunction = require('../../functions/evalFunction');

module.exports = {
  name: 'eval',
  description:
    "Evaluates the code you put in but it's only available for the my Developer and no one else!!!!!",
  ownerOnly: true,
  modal: true,
  userperm: [''],
  botperm: [''],
  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    try {
      const row = new ActionRowBuilder().addComponents(
        new TextInputBuilder().setCustomId('code').setLabel('Comment:').setStyle(TextInputStyle.Paragraph)
          .setPlaceholder('bot.user.username')
          .setRequired(true)
          .setMinLength(1),
      );
      const row2 = new ActionRowBuilder().addComponents(
        new TextInputBuilder().setCustomId('ephemeral').setStyle(TextInputStyle.Paragraph).setLabel('Ephemeral Response (true/false)')
          .setPlaceholder('true/false')
          .setRequired(false)
          .setValue('false')
          .setMinLength(4)
          .setMaxLength(5),
      );

      const modal = new ModalBuilder()
        .setCustomId('codeModal')
        .setTitle('Code to evaluate')
        .addComponents(row, row2);

      await interaction.showModal(modal);

      const filter = (interaction) => interaction.customId === 'codeModal';
      const data = await interaction.awaitModalSubmit({ filter, time: 5 * 60 * 1000 });
      const code = data.fields.getTextInputValue('code');
      const ephemeral = data.fields.getTextInputValue('ephemeral').toLowerCase() === true;
      //  const result = await eval(code)

      // let output = result

      let evaled;
      if (code.includes('await')) evaled = inspect(eval(`(async () => { ${code} })()`));
      if (!code.includes('await')) evaled = inspect(eval(code));
      const secretValues = [process.env.TOKEN];
      await Promise.all(secretValues.map((value) => evaled = evaled.replaceAll(value, '❓')));
      const embed = new EmbedBuilder()
        .setColor(bot.color)
        .setAuthor({ name: 'Eval' });

      await evalFunction(interaction, {
        users: [interaction.user],
        ephemeral,
        result: clean(evaled),
        embed,
      });

      await data.update({
        embeds: [
          new EmbedBuilder()
            .setTitle('Evaluation successful!')
            .addFields(
              { name: '__**Input**__', value: `**${code}**`, inline: true },
              { name: '__**Output**__', value: '```\"output"``` ', inline: true },
            )
            .setColor(bot.color)
            .setTimestamp(),
        ],
      }).catch(() => null);
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
function clean(value) {
  if (typeof (value === 'string')) return value.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
  return value;
}
