const bot = require("../index"); 

module.exports.run = async (bot, interaction) => { 
// Slash Command Handling
if (interaction.isCommand()) { 
  await interaction.deferReply({ ephemeral: false }).catch(() => {}); 
  const cmd = bot.slashCommands.get(interaction.commandName); 
  if (!cmd) return interaction.followUp({ content: "An error has occured " }); 
  
  const args = [];
  
  for (let option of interaction.options.data) { 
    if (option.type === "SUB_COMMAND") { 
      if (option.name) args.push(option.name); 
      option.options?.forEach((x) => { 
        if (x.value) args.push(x.value); 
      }); 
    } else if (option.value) args.push(option.value); 
  } 
  cmd.run(bot, interaction, args); 
}
};