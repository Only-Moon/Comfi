const { CommandInteraction, MessageEmbed } = require("discord.js");
const guilds = require("../../models/guild")

module.exports = {
    name: "own",
    description: "Onwer Only",
    ownerOnly: true,
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

await guilds.findOneAndUpdate({guildId: "778547302151356417" }, {
msgId: "916946661647994890",
chanId: "916928167044857866",
roles: [
  {
    
  },
  {},
],
id: "",
})
      
    }}