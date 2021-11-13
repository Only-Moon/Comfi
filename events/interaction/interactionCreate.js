const bot = require("../../index");
const { Permissions, MessageEmbed, MessageButton, MessageActionRow, Discord } = require('discord.js')
const guilds = require("../../models/guild")
const users = require('../../models/users')
const { owners } = require('../../config.json')

bot.on("interactionCreate", async (interaction, args) => {
    // Slash Command Handling

if (interaction.isCommand()) {
  await interaction.deferReply({ ephemeral: false }).catch(() => {}); 

if (!interaction.guild) return;
  
const guild = await guilds.findOne({guildId: interaction.guild.id})
    if(!guild) { await guilds.create({guildId: interaction.guild.id})}

  const cmd = bot.slashCommands.get(interaction.commandName) || bot.register.get(interaction.commandName);
  if (!cmd) 
    return interaction.followUp({ content: "An error has occured ",}).catch(() => null); 
  
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

        if (!userperm) return interaction.followUp({embeds: [ userp ]}).catch(() => null);
    
const botp = new MessageEmbed().setDescription(`${bot.error} I need \`${cmd.botperm || []}\` Permissions`).setColor("#FC7C7C")

    const botperm = interaction.guild.me.permissions.has(cmd.botperm);
        if (!botperm) return interaction.followUp({embeds: [ botp ]}).catch(() => null);
  

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
 
if (interaction.user.bot) return;
  
    async function commandExecute(){
    if(cmd) cmd.run(bot, interaction, args)
}

const user = await users.findOne({userId: interaction.user.id})
    if(!user) { await guilds.create({userId: interaction.user.id})}
  
if(cmd.cooldown) {
    const current_time = Date.now();
    const cooldown_amount = (cmd.cooldown) * 1000

    users.findOne({ 
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
                      return interaction.followUp({embeds: [ hrs ]}).catch(() => null)
              }
                if(time_left.toFixed(1) >= 60) {
                    let minute = (time_left.toFixed(1) / 60);
                    let min = new MessageEmbed()
         .setDescription(`${bot.error} Please wait ${parseInt(minute)} more minutes before using \`${cmd.name}\`!`)
       .setColor('#FF8080');
                  return interaction.followUp({embeds: [ min ]}).catch(() => null)
                }
                let seconds = (time_left.toFixed(1));
                let sec = new MessageEmbed()
        .setDescription(`${bot.error} Please wait ${parseInt(seconds)} more seconds before using \`${cmd.name}\`!`)
       .setColor('#FF8080');
              return interaction.followUp({embeds: [ sec ]}).catch(() => null)
            } else {
                await users.findOneAndUpdate({ 
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
            users.create({
                userId: interaction.member.id,
                cmd: cmd.name,
                time: current_time,
                cooldown: cmd.cooldown,
            })
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