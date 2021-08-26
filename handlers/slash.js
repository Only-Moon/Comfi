const { glob } = require("glob");
const { promisify } = require("util");
const ascii = require("ascii-table");

const globPromise = promisify(glob); 

// Create a new Ascii table
let table = new ascii("Slash");
table.setHeading("Slash", "Load status");

module.exports = async (bot) => {

const slashCommands = await globPromise( `${process.cwd()}/scommands/*/*.js`
                                       ); 
  
  const arrayOfSlashCommands = []; 
  slashCommands.map((value) => {
    const file = require(value);  
    if (!file?.name) return; 
    bot.slashCommands.set(file.name, file); 
    
    if (["MESSAGE", "USER"].includes(file.type)) delete file.description; arrayOfSlashCommands.push(file); 
 

 }); 
  
 bot.on("ready", async () => { 
   // Register for a single guild 
   await bot.guilds.cache 
   .get("879608181058318347") 
   .commands.set(arrayOfSlashCommands); 
   // Register for all the guilds the bot is in 
   // await bot.application.commands.set(arrayOfSlashCommands); 
   })
}