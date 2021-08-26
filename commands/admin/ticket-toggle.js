const { MessageEmbed, Permissions } = require("discord.js");
const ms = require("ms");
const pms = require("pretty-ms");
const { db } = require('../../Database.js');
const simplydjs = require("simply-djs")

module.exports = {
	config: {
		name: 'set-ticket-toggle',
		aliases: ['ticket-toggle', 'tt'],
		category: "admin",
		description: 'Sets chatbot channel',
		usage: 'ticket-toggle'
	},
	run: async (bot, message, args) => {
    if (!message.member.permissions.has("PERMISSIONS.FLAGS_MANAGE_CHANNELS")) return message.channel.send("You Don't Have Enough Permission To Execute This Command - Manage Channels");

let option = args[0];
		let options = ['category', 'role', 'display'];
		if (!option)
			return message.channel.send(
				`:x: | The option argument must be one of:\n **${options.join(', ')}**`
			);
		function check(opt) {
			return options.includes(opt);
		}
		if (!check(option.toLowerCase())) {
			return message.channel.send(':x: | **The provided option is invalid**');
		}
		switch (option.toLowerCase()) {
			case 'category':
				let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    
    if (Channel.type === "GUILD_CATEGORY") await db.set(`tik_cat${message.guild.id}`, channel.id) 
         message.channel.send(
					'**The Ticket Category has been set to**' + channel.toString()
				);
				break;
			case 'role':
				let role =
      message.mentions.roles.first() ||
      bot.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return message.channel.send("**Please Enter A Valid Role Name or ID!**");
      let a = await db.fetch(`supportrole_${message.guild.id}`);

      if (role.id === a) {
        return message.channel.send(
          "**This Role is Already Set As Supportrole!**"
        );
      } else {
      db.set(`supportrole_${message.guild.id}`, role.id).then
				return message.channel.send(
          `**\`${role.name}\` Has Been Set Successfully As Supportrole!**`
        );
      };
				break;
			case 'display':
				simplydjs.ticketSystem(message, message.channel, { 
    embedDesc: 'Create a new Ticket By Clicking Below',
    embedColor: '#F8B6D4', // default: #075FFFF 
    embedFoot: '', // default: message.guild.name 
    credit: false,
    emoji: '855791964975530004', // default:, 🎫
    color: '', // default: blurple 
    })
}
  }}