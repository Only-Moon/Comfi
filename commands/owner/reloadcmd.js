const Discord = require("discord.js")
const { readdirSync } = require("fs");
const { OWNER_ID } = require("../../config");
const { MessageEmbed } = require("discord.js");
const glob = require("glob")

module.exports = {
    config: {
        name: "reloadcmd",
        category: "owner",
        description: "Reload command- Dev Only",
        aliases: ['rmod']
    },

    run: async (bot, message, args) => {
        if (message.author.id != OWNER_ID) return;
	bot.commands.sweep(() => true)
		glob(`${__dirname}/../**/*.js` , async(err, filePaths) => {
			if(err) return console.log(err) 
			filePaths.forEach((file) => {
				delete require.cache[require.resolve(file)];

				const pull = require(file);

				if(pull.name) {
					console.log (`Reloaded ${pull.name}(cmd)`)
					bot.commands.set(pull.name, pull);
				}

				if (pull.aliases && Array.isArray(pull.aliases)) {
					pull.aliases.forEach((alias) => {
						bot.aliases.set(alias, pull.name)
					})
				}


 			}) 
		
		})
	 message.channel.send("Reloaded Commands")
    }
}