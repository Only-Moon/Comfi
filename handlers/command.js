const { readdirSync } = require("fs");
const ascii = require("ascii-table");

// Create a new Ascii table
let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = (bot) => {
    // Read every commands subfolder
    readdirSync("./prefix-commands/").forEach(dir => {
        // Filter so we only have .js command files
        const commands = readdirSync(`./prefix-commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        // Loop over the commands, and add all of them to a collection
        // If there's no name found, prevent it from returning an error,
        // By using a cross in the table we made.
        for (let file of commands) {
            let pull = require(`../prefix-commands/${dir}/${file}`);
    
            if (pull.config.name) {
                bot.commands.set(pull.config.name, pull);
               // table.addRow(file, '✅');
            } else {
              //  table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
    
            // If there's an aliases key, read the aliases.
            if (pull.config.aliases && Array.isArray(pull.config.aliases)) pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        }
    });
    // Log the table
  //  console.log(table.toString())
}
