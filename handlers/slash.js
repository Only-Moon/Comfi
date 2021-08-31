const { glob } = require("glob");
const { promisify } = require("util");
const ascii = require("ascii-table");

const globPromise = promisify(glob); 

// Create a new Ascii table
let table = new ascii("Slash");
table.setHeading("Slash", "Load status");

module.exports = async (bot) => {
try {
const slashCommands = await globPromise(`${process.cwd()}/scommands/*/*.js`); 
  const arrayOfSlashCommands = []; 
  slashCommands.map((value) => {
    const file = require(value);  
    if (!file?.name) return; 
    bot.slashCommands.set(file.name, file); 
    
    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
           arrayOfSlashCommands.push(file);
 
   table.addRow(file.name, '✅')
  })
/**
const register = await globPromise(`${process.cwd()}/register.js`)

  const regi = [];
register.map((values) => {
    const files = require(values);  
  
    if (["MESSAGE", "USER"].includes(files.type)) delete files.description;

regi.push(files)
}) 
*/
 bot.on("ready", async () => { 
  
   await bot.guilds.cache
     .get("879608181058318347")
     .commands.set(arrayOfSlashCommands)
   
//await bot.application.commands.set(regi)
   
 })

} catch(err) { 
        console.log(err) 
        
        table.addRow(`❌ -> Error while loading event`);
  }
  
  console.log(table.toString()); 
}