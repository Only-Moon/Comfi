const { Permissions, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const config = require('../config.json');
const simplydjs = require('simply-djs');
const { db } = require('../Database.js');
const clientID = config.clientID; 
const clientSecret = config.clientSecret;

module.exports.run = async (bot, interaction) => { 

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
  .setTitle("Thanks for using the bot!") 
  .setDescription(`Here Is My Invite Links: \nServer Moderator: **[Click Me](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=2147483647)** \nServer Helper: **[Click Me](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=4294967287)** \n\nRecommended: **[Click Me](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=8589934591)**`)
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
  
    const transEmbed = new MessageEmbed()
        .setColor(config.color).setTitle(`Hey` + ` ` + interaction.user.username)
        .setDescription(`Are you sure you want to delete **this** ticket ?`)
    

    if (interaction.customId === 'del') {
        const ok = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('sure')
                    .setLabel(`Delete`)
                    .setStyle('DANGER'),
            )

        await interaction.followUp({ embeds: [transEmbed], components: [ok] })
    }
    if (interaction.customId === 'sure') {
        interaction.channel.delete()
    }

}

  // Select Menus
if (interaction.isSelectMenu()) {
    if (interaction.values?.[0] === 'reload01') {
     await interaction.deferReply()
        const chanz = bot.channels.cache.get('867650282933583882');
        chanz.send('ingore reload')
    }
    if (interaction.values?.[0] === 'support01') {
      await interaction.deferReply()
        const chan = await interaction.guild.channels.create(`support-${interaction.user.tag}`, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                    id: interaction.message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                },
            ]
        })
        const embed = new MessageEmbed()
            .setTitle('Support Ticket')
            .setDescription('> Thank you for openning a ticket, One of fo the staff members will be here sortly!')
            .setColor(config.color).setTimestamp()
            .setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }));
        const del = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('del')
                    .setLabel('Delete Ticket')
                    .setStyle('PRIMARY'),
            );
        chan.send({
            content: `<@${interaction.user.id}>`,
            embeds: [embed],
            components: [del]
        })
        interaction.reply({
            content: `Support ticket created!` + `<#${chan.id}>`, ephemeral: true
        })
    }
    if (interaction.values?.[0] === 'staff01') {
      await interaction.deferReply()
        const chan = await interaction.guild.channels.create(`contact-${interaction.user.tag}`, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                    id: interaction.message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                },
            ]
        })
        const embed = new MessageEmbed()
            .setTitle('Contact Staff channel')
            .setDescription('> Thank you for openning a ticket, One of fo the staff members will be here sortly!')
            .setColor(config.color).setTimestamp()
            .setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }));
        const del = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('del')
                    .setLabel('Delete Ticket')
                    .setStyle('PRIMARY'),
            );
        chan.send({
            content: `<@${interaction.user.id}>`,
            embeds: [embed],
            components: [del]
        })
        interaction.reply({
            content: `Contact staff channel created!` + `<#${chan.id}>`, ephemeral: true
        })
    }
    if (interaction.values?.[0] === 'question01') {
      await interaction.deferReply()
        const chan = await interaction.guild.channels.create(`question-${interaction.user.tag}`, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                    id: interaction.message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                },
            ]
        })

        const embed = new MessageEmbed()
            .setTitle('Question Ticket')
            .setDescription('> Thank you for openning a ticket, One of fo the staff members will be here sortly!')
            .setColor(config.color).setTimestamp()
            .setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }));
        const del = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('del')
                    .setLabel('Delete Ticket')
                    .setStyle('PRIMARY'),
            );
        chan.send({
            content: `<@${interaction.user.id}>`,
            embeds: [embed],
            components: [del]
        })
        interaction.reply({
            content: `Question ticket created!` + `<#${chan.id}>`, ephemeral: true
        })
    }

}
  // Slash Command Handling

if (interaction.isCommand()) { 
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
      
      args.push(option.value); } interaction.member = interaction.guild.members.cache.get(interaction.user.id); 

 const userperm = interaction.member.permissions.has(cmd.userperm);

        if (!userperm) return interaction.followUp({content: `You need \`${cmd.userperm || []}\` Permissions` });

        const botperm = interaction.guild.me.permissions.has(cmd.botperm);
        if (!botperm) return interaction.followUp({content: `I need \`${cmd.botperm || []}\` Permissions` });


        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
  
  cmd.run(bot, interaction, args); 
} 
  // Context Menu Handling 

  if (interaction.isContextMenu()) { 
  await interaction.deferReply({ ephemeral: false }); 
  
  const command = bot.slashCommands.get(interaction.commandName); 
  if (command) command.run(bot, interaction); 
  } 
}