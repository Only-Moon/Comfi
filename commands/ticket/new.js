module.exports = {
    config: {
        name: 'apply',
        description: 'Creates a new ticket',
        aliases: ["open-ticket", "apply",  "new"],
        usage: 'new',
        category: 'ticket',
        botperms: ['MANAGE_CHANNELS']
    },
	run: async (client, message, args, prefix) => {
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I need the `MANAGE_CHANNELS` permission to use this comamnd");
		if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
			return message.reply('you already have a ticket, please close your exsisting ticket first before opening a new one!');
		}

		message.guild.channels.create(`ticket-${message.author.id}`, {
			permissionOverwrites: [
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
                    id: "851039683621158942",
                    allow: ['VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
			],
			type: 'text', parent: '852533828877680690'
		}).then(async channel => {
			message.reply(`you have successfully created a ticket! Please click on ${channel} to apply.`);
			channel.send(`Hi ${message.author}, welcome to your ticket! Please be patient, we will be with you shortly, till then send all the details we asked you. If you would like to close this ticket please run \`L!close\``);
			let logchannel = message.guild.channels.cache.find(channel => channel.name === `📝｜logs`)
			if(logchannel) {
				logchannel.send(`Ticket ${message.author.id} created. Click the following to veiw <#${channel.id}>`);
			}
		});
	},
};