const chalk = require("chalk");
const { MessageSelectMenu, MessageActionRow } = require("discord.js");

/* MENU CREATOR */
/**
 * @param {Array} array - The array of options (rows to select) for the select menu
 * @returns MessageSelectMenu
 */

const create_mh = (array) => {
  if (!array)
    throw new Error(
      chalk.red.bold(
        "The options were not provided! Make sure you provide all the options!"
      )
    );
  if (array.length < 0)
    throw new Error(
      chalk.red.bold(`The array has to have atleast one thing to select!`)
    );
  let select_menu;

  let id = "help-menus";

  let menus = [];

  const emo = {
    admin: "798617643775033394",
    emoji: "855602231986487326",
    economy: "812034164891189289",
    fun: "798458300219785216",
    images: "796373339651571744",
    info: "783028553897869332",
    mod: "783028559580495923",
    music: "779274421574959127",
    utility: "797027740007661578"
  };

  array.forEach((cca) => {
    let name = cca;
    let sName = `${emo[name.toLowerCase()]} ${name.toUpperCase()}`;
    let tName = name.charAt(0).toUpperCase() + name.slice(1);
    let fName = name.toUpperCase();

    return menus.push({
      label: sName,
      description: `${tName} commands!`,
      value: fName,
    });
  });

  let chicken = new MessageSelectMenu()
    .setCustomId(id)
    .setPlaceholder("Choose the command category")
    .addOptions(menus);

  select_menu = new MessageActionRow().addComponents(chicken);

  //console.log(select_menu.components[0].options)

  return {
    smenu: [select_menu],
    sid: id,
  };
};

module.exports = create_mh;
