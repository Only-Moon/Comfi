const { Permissions } = require('discord.js')
const { MessageEmbed } = require("discord.js");
const db = require("old-wio.db");
const Discord = require("discord.js");

module.exports = {
  config: {
    name: "set-greet",
    aliases: ["set-greet"],
    description: "Setup greet",
    usage: "set-greet <Type> <embed>",
  }, 
  run: async(bot, message, args) => {
  
     if (!message.member.permissions.has("PERMISSIONS.FLAGS_MANAGE_MESSAGES")) return message.channel.send("You Don't Have Enough Permission To Execute This Command - Manage Messages");
    
    let Type = args[0];
    let Welcome = ["welcome", "wel", "join"];
    let leave = ["leave", "left"];
    let Types = [];
    Welcome.forEach(wel => Types.push(wel));
    leave.forEach(leav => Types.push(leav));
    
    if (!Type || !Types.find(T => T === Type.toLowerCase())) return message.channel.send(`Please Give A Valid Type - Welcome, Wel, Join, Leave, Left`);
    
    Type = Type.toLowerCase();
    
    let Msg = args.slice(1).join(" ");
    
    if (!Msg) return message.channel.send(`Please Give Message\n\nParameters you can use in message of Welcome/leave -"\n\n\`\`\`{user}\`\`\` - Mentions the joining or leaving member\n\`\`\`{user_name}\`\`\` - Just gives the username of the join/leave member\n\`\`\`{user_tag}\`\`\` - Shows the user tag. Ex - User#1234\n\`\`\`{user_id}\`\`\` - Shows the user id\n\`\`\`{server_name}\`\`\` - Shows the server name\n\`\`\`{server_id}\`\`\` - Shows the server id\n\`\`\`{membercount}\`\`\` - Shows the member count of the server\n\`\`\`{user_createdAt}\`\`\` - Shows member account creation date\n\`\`\`{user_createdAgo}\`\`\` - Shows the member creation time ago`);
    if (Msg.length > 50) return message.channel.send(`Too Long Message - Limit 50`);
    
    async function GetType(Type) {
      if (Welcome.find(W => W === Type)) {
        return "Welcome";
      } else {
        return "Leave";
      };
    };
    
    let Current = await GetType(Type);
    
    const Embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Sucess`)
    .setDescription(`${Current === "Welcome" ? "Welcome" : "Leave"} Embed Has Been Setted -\n${Msg}`)
    .setFooter(`Setted By ${message.author.username}`)
    .setTimestamp();

    await db.set(`${Current === "Welcome" ? "Welcome" : "Leave"}_${message.guild.id}_Embed`, Msg);

    try {
        return message.channel.send({embeds: [ Embed ]});
    } catch (error) {
        return message.channel.send(`${Current === "Welcome" ? "Welcome" : "Leave"} Embed Has Been Setted -\n${Msg}`);
    };

  }
}