/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const guilds = require('../../models/guild');
const simplydjs = require("simply-djs")
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ticket",
  description: "Setup the ticket system",
  directory: "setting",
  ownerOnly: false,
  options: [
    {
      type: 'SUB_COMMAND',
      description: 'Sets the category for ticket system',
      name: 'category',
      options: [
        {
          type: 'CHANNEL',
          description: 'Category id to open tickets',
          channelTypes: ["GUILD_CATEGORY"],
          name: 'id',
          required: true,
        },
      ],
    },
    {
      type: 'SUB_COMMAND',
      description: 'Sets the support role for ticket system',
      name: 'role',
      options: [
        {
          type: 'ROLE',
          description: 'Support role for tickets',
          name: 'role',
          required: true,
        },
      ],
    },
    {
      type: 'SUB_COMMAND',
      description: 'Sends the ticket panel',
      name: 'display',
      options: [
        {
          type: 'STRING',
          description: 'Subject of the ticket',
          name: 'subject',
          required: false,
        },
      ],
    },
    {
      type: 'SUB_COMMAND',
      description: 'Disables ticket system',
      name: 'disable',
    },
  ],
  userperm: ["MANAGE_GUILD"],
  botperm: ["MANAGE_GUILD"],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args, message) => {

    let [option] = args

    const guild = await guilds.findOne({ guildId: interaction.guild.id })
    try {
      if (option === 'category') {
        let Channel = interaction.options.getChannel('id') || interaction.guild.channels.cache.get(args[0]);

        if (guild.ticket_category === Channel.id) {

          return await bot.successEmbed(bot, interaction, `**Ticket Category is already set as ${Channel.id} !**`)

        } else {
          await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
            ticket: true,
            ticket_category: Channel.id,
          })

          return await bot.successEmbed(bot, interaction, `**The Ticket Category has been set to**` + Channel.toString()
          );
        }
      }

      if (option === 'role') {
        let role =
          interaction.options.getRole('role') ||
          bot.guilds.cache.get(interaction.guild.id).roles.cache.get(args[0]) ||
          interaction.guild.roles.cache.find(
            c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
          );

        if (!role)
          return interaction.editReply(`${bot.error} **Please Enter A Valid Role Name or ID!**`);

        if (guild.ticket_role === role.id) {

          return await bot.errorEmbed(bot, interaction, `**Ticket Support Role is already set as ${role} !**`)

        } else {

          await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
            ticket_role: role.id,
          })

          return await bot.successEmbed(bot, interaction, `**\`${role.name}\` Has Been Set Successfully As Supportrole!**`
          );
        }
      };

      if (option === 'display') {

        let desc = interaction.options.getString("subject") || "Create a new Ticket By Clicking Below"

        simplydjs.ticketSystem(interaction, {
          channelId: interaction.channel.id,
          embed: {
            description: desc,
            color: bot.color,
            credit: false,
            footer: {text: interaction.guild.name.toLocaleUpperCase() + "'s Ticket System"}
          },
          button: { style: "SECONDARY", emoji: "855791964975530004" }
        })
      }

      if (option === 'disable') {

        await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
          ticket: false,
        })
        return await bot.successEmbed(bot, interaction, `Disabled Ticket System for this guild`)
      }
    } catch {
      await bot.senderror(interaction, e)
    }
  }
}