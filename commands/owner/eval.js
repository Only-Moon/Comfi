/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed, Util, MessageActionRow, TextInputComponent, Modal } = require('discord.js')
const { inspect } = require("util")
const evalFunction = require("../../functions/evalFunction")

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
    const row = new MessageActionRow().addComponents(
      new TextInputComponent().setCustomId('code').setLabel('Comment:').setStyle('PARAGRAPH').setPlaceholder('bot.user.username').setRequired(true).setMinLength(1)
    )
    const row2 = new MessageActionRow().addComponents(
      new TextInputComponent().setCustomId('ephemeral').setStyle('PARAGRAPH').setLabel('Ephemeral Response (true/false)').setPlaceholder('true/false').setRequired(false).setValue('false').setMinLength(4).setMaxLength(5))

    const modal = new Modal()
      .setCustomId('codeModal')
      .setTitle('Code to evaluate')
      .addComponents(row, row2)

    await interaction.showModal(modal)

    const filter = (interaction) => interaction.customId === 'codeModal';
    const data = await interaction.awaitModalSubmit({ filter, time: 5 * 60 * 1000 })
    let code = data.fields.getTextInputValue('code')
    let ephemeral = data.fields.getTextInputValue('ephemeral').toLowerCase() === true ? true : false

    try {
      /**
        const result = await eval(code);

        let output = result;
        if (typeof result !== "string") {
            output = Util.splitMessage(inspect(result, {
                depth: 0
            }))[0]
        }
      */
      let evaled;
      if (code.includes('await')) evaled = inspect(eval(`(async () => { ${code} })()`));
      if (!code.includes('await')) evaled = inspect(eval(code));
      let secretValues = [process.env["TOKEN"], ];
      await Promise.all(secretValues.map((value) => evaled = evaled.replaceAll(value, `❓`)));
      const embed = new MessageEmbed()
      .setColor(bot.color)
      .setAuthor({name: "Eval"})

      await evalFunction(interaction, {
        users: [interaction.user],
        ephemeral,
        result: clean(evaled),
        embed: embed
      })

      /**
                  interaction.followUp({
                      embeds: [
                          new MessageEmbed()
                          .setTitle("Evaluation successful!")
                          .addField("__**Input**__", `**${code}**`)
                          .addField("__**Output**__", `\`\`\`js\n${output}\`\`\` `)
                          .setColor(bot.color)
                          .setTimestamp()
                      ]
                  });
      */

    } catch (e) {
      await bot.senderror(interaction, e)

    }
  }
}
function clean(value) {
  if (typeof (value === 'string')) return value.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, `@` + String.fromCharCode(8203));
  return value;
}