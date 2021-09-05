const { glob } = require("glob");
const { promisify } = require("util");
const ascii = require("ascii-table");

const globPromise = promisify(glob); 

// Create a new Ascii table
let table = new ascii("Slash");
table.setHeading("Slash", "Load status");

module.exports = async (bot) => {
try {
const slashCommands = await globPromise(`${process.cwd()}/commands/*/*.js`); 
  const arrayOfSlashCommands = []; 
  slashCommands.map((value) => {
    const file = require(value);  
    if (!file?.name) return; 
    bot.slashCommands.set(file.name, file); 
    
    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
           arrayOfSlashCommands.push(file);
 
   table.addRow(file.name, '✅')
  })
 bot.on("ready", async () => {
   bot.guilds.cache.forEach((g) => {
     g.commands.set(arrayOfSlashCommands);
   })
 });

} catch(err) { 
        console.log(err) 
        
        table.addRow(`❌ -> Error while loading event`);
  }
  
  console.log(table.toString()); 
}