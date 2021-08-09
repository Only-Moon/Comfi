const { checkPermission } = require('../../Permissions');
const { db } = require('../../Database.js');
const { Permissions, MessageEmbed } = require('discord.js')

module.exports = {
	config: {
		name: 'set-chatbot-channel',
		aliases: ['set-chatbot'],
		category: "admin",
		description: 'Sets chatbot channel',
		usage: 'set-chatbot'
	},
	run: async (bot, message, args) => {
       
            /****   Checking Permissions    ****/
            let botPermission = await checkPermission('bot', message, [
                'MANAGE_GUILD',
            ]);
            if(botPermission) return 

            let memberPermission = await checkPermission('member', message, [
                'MANAGE_GUILD',
            ])
            if(memberPermission) return;

            /****  Regular Code   ****/
            if(!args[0]) {

                const b = await db.fetch(`chatbot_${message.guild.id}`)
                const channelName =  message.guild.channels.cache.get(b);
                
                if(message.guild.channels.cache.has(b)) {
                        return message.channel.send(`**✅ ChatBot Channel Set In This Server Is \`${channelName.name}\`!**`);
                } else {
                    return 
          let embed = new MessageEmbed()
              .setColor('#F4B3CA')
              .setTitle(`❌ Please Enter a Channel or Channel ID to set`);
  
                  message.channel.send({embeds: [ embed ]} )            
 };
            };

            let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

            if(!channel || channel.type !== 'text') return 
          let embed1 = new MessageEmbed()
            .setColor('#F8B6D4')
            .setTitle(`❌ Please enter a Valid Channel!`);

message.channel.send({embeds: [ embed1 ]})
  

            try {
                let a = await db.fetch(`chatbot_${message.guild.id}`);
        
                if (channel.id === a) {
                    return 
let embed2 = new MessageEmbed()
              .setColor(`#F8B6D4`)
            .setTitle(`❌ This Channel is already set as ChatBot Channel!`)
  message.channel.send({embeds: [ embed2 ]})             
 
                } else {
                    bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send(`**✅ ChatBot Channel Set!**`);
                    db.set(`chatbot_${message.guild.id}`, channel.id);

       let embed = new MessageEmbed()
                .setColor('#F8B6D4')
                 .setTitle(`✅ ChatBot Channel has been Set Successfully \`${channel.id}\``);
 message.channel.send({embeds: [ embed ]})              
 };

            } catch(error) {
                console.log(error);
            }
    },
};