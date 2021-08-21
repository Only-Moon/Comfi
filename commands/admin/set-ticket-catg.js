const { checkPermission } = require('../../Permissions');
const { db } = require('../../Database.js');


module.exports = {
	config: {
		name: 'set-ticket-catg',
		aliases: ['set-category'],
		category: "admin",
		description: 'Sets category for ticket-system',
		usage: 'set-category'
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

                const b = await db.fetch(`category_${message.guild.id}`)
                const channelName =  message.guild.channels.cache.get(b);
                
                if(message.guild.channels.cache.has(b)) {
                        return
message.channel.send(`**✅ Ticket Category Has Been Setted In This Server As \`${channelName.name}\`!**`);
                } else {
                    return message.channel.send({embeds: {
                        color: '#F8B6D4',
                        title: `❌ Please Enter a Category ID to set`
                    }});
                };
            };

            let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

            if(!channel || channel.type !== 'GUILD_CATEGORY') return message.channel.send({embeds: {
                color: '#F8B6D4',
                title: `❌ Please enter a Valid Category!`
            }});

            try {
                let a = await db.fetch(`category_${message.guild.id}`);
        
                if (channel.id === a) {
                    return message.channel.send({embed: {
                    color: `#F8B6D4`,
                    title: `❌ This Category is already setted!`
                }});
                } else {
                    
                    await db.set(`category_${message.guild.id}`, channel.id).then(console.log);

                  message.channel.send({embeds: {
                    color: '#F8B6D4',
                    title: `✅ Ticket Category has been Set Successfully \`${channel.id}\``
                }});
                };

            } catch(error) {
                console.log(error);
            }
    },
};