const bot = require("../index");
const { Permissions, MessageEmbed, MessageButton, MessageActionRow, Discord } = require('discord.js')
const cooldown = require('../models/cooldown')
const { owners } = require('../config.json')
const Levels = require("discord-xp");

bot.on("interactionCreate", async (interaction, args) => {
    // Slash Command Handling

if (interaction.isCommand()) {
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
if (!owners.includes(interaction.user.id)) return interaction.editReply({content: `${bot.error} You are not Authorized to use this Command`})
}

const userp = new MessageEmbed().setDescription(`${bot.error} You need \`${cmd.userperm || []}\` Permissions`).setColor("#FC7C7C");
  
const userperm = interaction.member.permissions.has(cmd.userperm);

        if (!userperm) return interaction.followUp({embeds: [ userp ]});
    
const botp = new MessageEmbed().setDescription(`${bot.error} I need \`${cmd.botperm || []}\` Permissions`).setColor("#FC7C7C")

    const botperm = interaction.guild.me.permissions.has(cmd.botperm);
        if (!botperm) return interaction.followUp({embeds: [ botp ]});
  

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
 
if (!interaction.guild) return;
if (interaction.member.user.bot) return; 

const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
  const hasLeveledUp = await Levels.appendXp(interaction.user.id, interaction.guild.id, randomAmountOfXp);
  if (hasLeveledUp) {
    const user = await Levels.fetch(interaction.user.id, interaction.guild.id);
    let up = new MessageEmbed()
.setTitle(`**Level Up**`)
      .setDescription(`${interaction.member}, congratulations! You have leveled up to **${user.level}**. <a:Tada_Yellow:883017870068568085>`)
      .setColor(bot.color)
    .setTimestamp();
interaction.channel.send({embeds: [ up ]})
  }
  
    async function commandExecute(){
    if(cmd) cmd.run(bot, interaction, args)
}
if(cmd.cooldown) {
    const current_time = Date.now();
    const cooldown_amount = (cmd.cooldown) * 1000

    cooldown.findOne({ 
userId: interaction.member.id,
 cmd: cmd.name 
}, async(err, data) => {
        if(data) {
            const expiration_time = data.time + cooldown_amount;
        
            if(current_time < expiration_time) {
                const time_left = (expiration_time -  current_time) / 1000
    
                if(time_left.toFixed(1) >= 3600){
                    let hour = (time_left.toFixed(1) / 3600);
                    let hrs = new MessageEmbed()
       .setDescription(`${bot.error} Please wait ${parseInt(hour)} more hours before using \`${cmd.name}\`!`)
       .setColor('#FF8080');                
                      return interaction.followUp({embeds: [ hrs ]})
              }
                if(time_left.toFixed(1) >= 60) {
                    let minute = (time_left.toFixed(1) / 60);
                    let min = new MessageEmbed()
         .setDescription(`${bot.error} Please wait ${parseInt(minute)} more minutes before using \`${cmd.name}\`!`)
       .setColor('#FF8080');
                  return interaction.followUp({embeds: [ min ]})
                }
                let seconds = (time_left.toFixed(1));
                let sec = new MessageEmbed()
        .setDescription(`${bot.error} Please wait ${parseInt(seconds)} more seconds before using \`${cmd.name}\`!`)
       .setColor('#FF8080');
              return interaction.followUp({embeds: [ sec ]})
            } else {
                await cooldown.findOneAndUpdate({ 
userId: interaction.member.id, 
cmd: cmd.name
 },
 { 
time: current_time
 });
                commandExecute();
            }
        } else {
            commandExecute();
            new cooldown({
                userId: interaction.member.id,
                cmd: cmd.name,
                time: current_time,
                cooldown: cmd.cooldown,
            }).save();
        }
    })
} else {
    commandExecute();
};
      }
  
  // Context Menu Handling 

  if (interaction.isContextMenu()) { 
  await interaction.deferReply({ ephemeral: false }); 
  
  const command = bot.slashCommands.get(interaction.commandName); 
  if (command) command.run(bot, interaction); 
  } 
});