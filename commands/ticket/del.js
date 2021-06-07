module.exports = {
    config: {
        name: 'delete',
        description: 'Deletes a specific ticket',
        aliases: ["deltick", "del"],
        usage: 'delete',
        category: 'ticket',
        userperms: ['ADMINISTRATOR']
    },
	run: async (client, message, args) => {
		if(message.channel.name.includes('ticket-')) {
			message.channel.delete();
		}
		else {
			return message.reply('you cannot use this command here. Please use this command when you want to delete a ticket.');
		}
	},
};