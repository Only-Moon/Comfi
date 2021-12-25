const { CommandInteraction, MessageEmbed } = require("discord.js");
const embedCreate = require("../../functions/embed")

module.exports = {
    name: "bug",
    description: "Report a bugs",
    ownerOnly: false,
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

embedCreate(interaction, {
name: "boost's",
credit: false,
embedColor: bot.color
}).then(async(em) => {
console.log(em.content)
})     
    }
}