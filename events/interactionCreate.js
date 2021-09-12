const bot = require("../index");
const { Permissions, MessageEmbed, MessageButton, MessageActionRow, Discord } = require('discord.js')
const config = require('../config.json');
const { owners } = require('../config.json')
const Levels = require("discord-xp");

bot.on("interactionCreate", async (interaction, args) => {
    // Slash Command Handling

if (interaction.isCommand()) {
  try {
  await interaction.deferReply({ ephemeral: false }).catch(() => {}); 
  
  const cmd = bot.slashCommands.get(interaction.commandName); 
  if (!cmd) 
    return interaction.followUp({ content: "An error has occured ",}); 
  
  const args = []; 
    
  for (let option of interaction.options.data) { 
    
    if (option.type === "SUB_COMMAND") { 
      
      if (option.name) args.push(option.name); option.options?.forEach((x) => { 
        
        if (x.value) args.push(x.value); });
    } else if (option.value) 
    
      args.push(option.value); } 
    
interaction.member = interaction.guild.members.cache.get(interaction.user.id);
    
if (cmd.ownerOnly) {
if (!owners.includes(interaction.user.id)) return interaction.editReply({content: `<a:Attention:883349868062576701> You are not Authorized to use this Command`})
}

const userp = new MessageEmbed().setDescription(`<a:Attention:883349868062576701> You need \`${cmd.userperm || []}\` Permissions`).setColor("#FC7C7C");
  
const userperm = interaction.member.permissions.has(cmd.userperm);

        if (!userperm) return interaction.followUp({embeds: [ userp ]});
    
const botp = new MessageEmbed().setDescription(`<a:Attention:883349868062576701> I need \`${cmd.botperm || []}\` Permissions`).setColor("#FC7C7C")

    const botperm = interaction.guild.me.permissions.has(cmd.botperm);
        if (!botperm) return interaction.followUp({embeds: [ botp ]});
  

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
 
if (!interaction.guild) return;
if (interaction.member.user.bot) return; 

const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
  const hasLeveledUp = await Levels.appendXp(interaction.user.id, interaction.guild.id, randomAmountOfXp);
  if (hasLeveledUp) {
    const user = await Levels.fetch(interaction.user.id, interaction.guild.id);
    interaction.channel.send(`${interaction.member}, congratulations! You have leveled up to **${user.level}**. <a:Tada_Yellow:883017870068568085>`);
  }


let time = new MessageEmbed().setDescription(`<a:Attention:883349868062576701> You need to wait for **${cmd.cooldown}** Second(s) before reusing this __**${cmd.name}**__ command!`).setColor("FC7C7C")
  
    if(bot.timeout.has(interaction.user.id)) return interaction.editReply({embeds: [ time ]});
    
  cmd.run(bot, interaction, args); 

bot.timeout.set(interaction.user.id, undefined)

setTimeout(() => {
  bot.timeout.delete(interaction.user.id)
}, cmd.cooldown * 1000)
    
}  catch (err) {
    console.log("Something Went Wrong => ",err);
  }
}
  
  // Context Menu Handling 

  if (interaction.isContextMenu()) { 
  await interaction.deferReply({ ephemeral: false }); 
  
  const command = bot.slashCommands.get(interaction.commandName); 
  if (command) command.run(bot, interaction); 
  } 
});