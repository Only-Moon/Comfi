const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob); 

module.exports = async (bot) => {

const slashCommands = await globPromise( 
 `${process.cwd()}/scommands/*/*.js` 
); 
  
const arrayOfSlashCommands = []; 
    slashCommands.map((value) => { const 
      file = require(value);
    if (!file?.name) return;                        bot.slashCommands.set(file.name, file); 
                                  
    if (["MESSAGE", "USER"].includes(file.type)) delete file.description; 
                                      arrayOfSlashCommands.push(file); 
                                 });
bot.on("ready", async () => { 

  await bot.commands.set(arrayOfSlashCommands);
  
  // Register for all the guilds the bot is in // 
    await bot.application.commands.set(arrayOfSlashCommands); 
  })
}