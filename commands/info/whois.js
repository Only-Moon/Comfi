const Discord = require("discord.js")
const { Permissions } = require('discord.js')
const moment = require('moment');

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

module.exports = {
    config: {
        name: "whois",
        description: "userinfo",
        category: 'info',
        usage: "m/whois <mention a member/member id>",
        aliases: ['ui', 'userinfo']
    },
    run: async (bot, message, args) => {
        var permissions = [];
        var acknowledgements = 'None';
        let whoisPermErr = new Discord.MessageEmbed()
        .setTitle("**User Permission Error!**")
        .setDescription("**Sorry, you don't have permissions to use this! ❌**")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        

        if(member.permissions.has("PERMISSIONS.FLAGS_KICK_MEMBERS")){
            permissions.push("Kick Members");
        }
        
        if(member.permissions.has("PERMISSIONS.FLAGS_BAN_MEMBERS")){
            permissions.push("Ban Members");
        }
        
        if(member.permissions.has("PERMISSIONS.FLAGS_ADMINISTRATOR")){
            permissions.push("Administrator");
        }
    
        if(member.permissions.has("PERMISSIONS.FLAGS_MANAGE_MESSAGES")){
            permissions.push("Manage Messages");
        }
        
        if(member.permissions.has("PERMISSIONS.FLAGS_MANAGE_CHANNELS")){
            permissions.push("Manage Channels");
        }
        
        if(member.permissions.has("PERMISSIONS.FLAGS_MENTION_EVERYONE")){
            permissions.push("Mention Everyone");
        }
    
        if(member.permissions.has("PERMISSIONS.FLAGS_MANAGE_NICKNAMES")){
            permissions.push("Manage Nicknames");
        }
    
        if(member.permissions.has("PERMISSIONS.FLAGS_MANAGE_ROLES")){
            permissions.push("Manage Roles");
        }
    
        if(member.permissions.has("PERMISSIONS.FLAGS_MANAGE_WEBHOOKS")){
            permissions.push("Manage Webhooks");
        }
    
        if(member.permissions.has("PERMISSIONS.FLAGS_MANAGE_EMOJIS")){
            permissions.push("Manage Emojis");
        }
    
        if(permissions.length == 0){
            permissions.push("No Key Permissions Found");
        }
    
        if(member.user.id == message.guild.ownerID){
            acknowledgements = 'Server Owner';
        }
    
        const embed = new Discord.MessageEmbed()
            .setDescription(`<@${member.user.id}>`)
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor('RANDOM')
            .setFooter(`ID: ${message.author.id}`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .addField("__Status__",`${status[member.user.presence.status]}`, true)
            .addField('__Joined at:__ ',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
            .addField('__Created On__', member.user.createdAt.toLocaleString(), true)
            .addField("__Playing__", member.presence.activities[0] ? member.presence.activities[0].state : `User isn't have a custom status!`, true)
            .addField(`\n__Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]__`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`, true)
            .addField("\n__Acknowledgements:__ ", `${acknowledgements}`, true)
            .addField("\n__Permissions:__ ", `${permissions.join(` | `)}`);
            
        message.channel.send({embeds: [ embed ]});
    
    }
    }
