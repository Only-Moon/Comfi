const chalk = require("chalk");
const { MessageSelectMenu, MessageActionRow } = require("discord.js"); 

/* MENU CREATOR */ 

/**
* @param {Array} array - The array of options (rows to select) for the select menu 
* @returns MessageSelectMenu 
*/ 

const create_mh = (array) => { 
  if (!array) throw new Error( 
    chalk.red.bold( "The options were not provided! Make sure you provide all the options!"
                  )
  );
  
  if (array.length < 0) throw new Error( chalk.red.bold(`The array has to have atleast one thing to select!`) 
                                       );
  
  let select_menu; 
  let id = "help-menus";
  let menus = []; 
  
  const emo = {
      anime: "883017896245211166", 
      emoji: "883033005172605020",
      fun: "883017879065354290",
      info: "883033007836000308", 
      levels: "883017898984103986", 
      mod: "883033001599074364",
      music: "883032989901156422",
      setup: "883017855187157003",
      utility: "883017884014637066" 
    }; 
  
  array.forEach((cca) => { 
    let name = cca; 
    let sName = `${name.toUpperCase()}`;
    let emoji = `${emo[name.toLowerCase()]}`;
    let tName = name.charAt(0).toUpperCase() + name.slice(1);
    let fName = name.toUpperCase(); 
    
  return menus.push({ 
      label: sName, 
      description: `${tName} commands!`, 
      value: fName,
      emoji: emoji
    }); 
  });
 
  
  let chicken = new MessageSelectMenu() 
    .setCustomId(id) 
    .setPlaceholder("Choose the command category") 
   .addOptions(menus); 
  
  select_menu = new MessageActionRow()
    .addComponents(chicken); //console.log(select_menu.components[0].options) 

  return {
    smenu: [select_menu], 
    sid: id,
  }; 
};

module.exports = create_mh;