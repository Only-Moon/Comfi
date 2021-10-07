const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob); 

module.exports = async (bot) => {
  
  // Commands 
const commandFiles = await globPromise(`${process.cwd()}/prefix-commands/**/*.js`); 
  commandFiles.map((value) => { 
    const file = require(value); 
    const splitted = value.split("/"); 
    const directory = splitted[splitted.length - 2]; 
    
    if (file.name) { 
      const properties = { directory, ...file}; 
  bot.commands.set(file.name, properties); 
    }
    
    if (file.aliases && Array.isArray(file.aliases)) { 
      file.aliases.forEach((alias) => bot.aliases.set(alias, file.name));
    } 
   // console.log(file.name, "Loaded"); 
});

  // Events 
  const eventFiles = await globPromise(`${process.cwd()}/events/*/*.js`); 
  eventFiles.map((value) => require(value))

  // Slash

const slashCommands = await globPromise(`${process.cwd()}/commands/*/*.js`); 
  let arrayOfSlashCommands = [];
  
  slashCommands.map((value) => {
    const file = require(value);  
    if (!file?.name) return; 
    bot.slashCommands.set(file.name, file); 
    
    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
 
  })

bot.on("ready", async () => {
/**
bot.guilds.cache.forEach((g) => {

g.commands.set(arrayOfSlashCommands)
})
  */
await bot.application.commands.set(arrayOfSlashCommands)
})

 }