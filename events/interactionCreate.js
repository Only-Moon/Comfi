const bot = require("../index");
const { Permissions, MessageEmbed, MessageButton, MessageActionRow, Discord } = require('discord.js')
const config = require('../config.json');
const { owners } = require('../config.json')
const simplydjs = require('simply-djs');
const { db } = require('../Database.js');
const Levels = require("discord-xp");
const clientID = config.clientID; 
const clientSecret = config.clientSecret;

bot.on("interactionCreate", async (interaction, args) => { 

/**
  let cat = await db.get(`tik_cat${interaction.guild.id}`)

   if (!cat) return console.log('no val in cat');
  
    
let support = await db.get(`supportrole_${interaction.guild.id}`); if (!support) return console.log('no val in db');
*
  simplydjs.clickBtn(interaction, {
    embedDesc: '', 
    embedColor: '#F8B6D4', // default: #075FFF 
    closeColor: 'red', //default: blurple 
    credit: false,
    closeEmoji: '775083085124468736', // default: 🔒 
    delColor: '', // default: grey 
    delEmoji: '796196175627419678', // default: ❌
    openColor: 'grey' , // default: green 
    openEmoji: '855791964975530004', // default: 🔓 
    timeout: true, // default: true | Needs to be boolean (true/false)
    cooldownMsg: 'Close Old Ticket First Then Open New One Again',
    categoryID: '${cat}',
    role: `${support}` // Role which sees the ticket channel (like Support Role)
                                
  }) 
*/
simplydjs.suggestBtn(interaction, db, {   
  yesEmoji: '778611379560120320', // default: ☑️ 
  yesColor: '', // default: green 
  noEmoji: '778611410539905044', // default: X 
  noColor: '', // default: red 
  denyEmbColor: '#ED7A7A', // default: RED 
  agreeEmbColor: '#6EE57F', // default: GREEN 
  })
  
if (interaction.isButton()) {  
  if (interaction.customId == 'inviteyes') { 
    await interaction.deferUpdate()
  
  const inviteyb = new MessageEmbed() 
  .setTitle("Thanks for using Comfi - the Multipurpose bot!") 
  .setDescription(`Here Is My Invite Links: \nServer Moderator: **[Click Me](https://discord.com/api/oauth2/authorize?client_id=${clientID}&permissions=261455474551&scope=bot%20applications.commands)** \nServer Helper: **[Click Me](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot%20applications.commands&permissions=4294967287)** \n\nRecommended: **[Click Me](https://discord.com/api/oauth2/authorize?client_id=${clientID}&permissions=8&scope=bot%20applications.commands)**`)
  .setColor("GREEN"); 
  
  const joindsc = new MessageButton() .setStyle('LINK') 
  .setLabel(
    'Join Our Support Server!') 
    .setURL('https://discord.gg/remYPHCVgW'); 

const row = new MessageActionRow()
			.addComponents(joindsc);
    
   		await interaction.editReply({ embeds: [inviteyb], components: [row] }); 	 
  }
  
  if(interaction.customId === 'inviteno')   { 
    await interaction.deferUpdate() 
  const noooyb = new MessageEmbed() 
  .setTitle('Okay Then') 
  .setDescription('But Please Join Our Support Server!') 
  .setColor("RED"); 
  
  const joindscc = new MessageButton() 
  .setStyle('LINK') 
  .setLabel('Join Our Support Server!')
  .setURL('https://discord.gg/remYPHCVgW'); 

const row1 = new MessageActionRow()
			.addComponents(joindscc)
    
 		await interaction.editReply({ embeds: [noooyb], components: [row1] });
}

}
 
    // Slash Command Handling

if (interaction.isCommand()) {
  try {
  await interaction.deferReply({ ephemeral: false }).catch(() => {}); 
  
  const cmd = bot.slashCommands.get(interaction.commandName); 
  if (!cmd) 
    return interaction.followUp({ content: "An error has occured " }); 
  
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
    
const userperm = interaction.member.permissions.has(cmd.userperm);

        if (!userperm) return interaction.followUp({content: `<a:Attention:883349868062576701> You need \`${cmd.userperm || []}\` Permissions` });

const botperm = interaction.guild.me.permissions.has(cmd.botperm);
        if (!botperm) return interaction.followUp({content: `<a:Attention:883349868062576701> I need \`${cmd.botperm || []}\` Permissions` });
  

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
 
if (!interaction.guild) return;
if (interaction.member.user.bot) return; 

const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
  const hasLeveledUp = await Levels.appendXp(interaction.user.id, interaction.guild.id, randomAmountOfXp);
  if (hasLeveledUp) {
    const user = await Levels.fetch(interaction.user.id, interaction.guild.id);
    interaction.channel.send(`${interaction.member}, congratulations! You have leveled up to **${user.level}**. <a:Tada_Yellow:883017870068568085>`);
  }
if(bot.timeout.has(interaction.user.id)) return interaction.editReply(`<a:Attention:883349868062576701> You need to wait!`);
    
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