/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { SelectMenuBuilder, ActionRowBuilder } = require('discord.js');

/* MENU CREATOR */

/**
 * @param {Array} array - The array of options (rows to select) for the select menu
 * @returns MessageSelectMenu
 */

const create_mh = (array) => {
  if (!array) {
    throw new Error(
      'The options were not provided! Make sure you provide all the options!',
    );
  }

  if (array.length === 0) throw new Error('The array has to have atleast one thing to select!');

  let select_menu;
  const id = 'help-menus';
  const menus = [];

  const emo = {
    anime: '<a:snowman_cs:883017868944502804>',
    economy: '<:currencyy_Blossomii:883032993101406278>',
    emoji: '<a:apple_cs:883033005172605020>',
    fun: '<a:shootingstaw_cs:883017879065354290>',
    info: '<a:stars_cs:883033007836000308>',
    levels: '<a:bunny_cs:883033003574579260>',
    mod: '<a:pinkheart_cs:883033001599074364>',
    // music: "<a:music_cs:883032989901156422>",
    roles: '<a:cake2_cs:883017860488765460>',
    setup: '<a:starburst_cs:883017855187157003>',
    utility: '<a:ghost_cs:883017884014637066>',
  };

  array.forEach((cca) => {
    const name = cca;
    const sName = `${name.toUpperCase()}`;
    const emoji = `${emo[name.toLowerCase()]}`;
    const tName = name.charAt(0).toUpperCase() + name.slice(1);
    const fName = name.toUpperCase();

    return menus.push({
      label: sName,
      description: `${tName} commands!`,
      value: fName,
      emoji,
    });
  });

  const chicken = new SelectMenuBuilder()
    .setCustomId(id)
    .setPlaceholder('Choose the command category')
    .addOptions(menus);

  select_menu = new ActionRowBuilder().addComponents(chicken); // console.log(select_menu.components[0].options)

  return {
    smenu: [select_menu],
    sid: id,
  };
};

module.exports = create_mh;
