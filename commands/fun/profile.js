const { CommandInteraction, MessageEmbed } = require("discord.js");
const users = require('../../models/users')

module.exports = {
            name: "profile",
            description: "create a profile or search up one",
           options: [
                  {
                name: 'option',
                description: "Choose something to edit",
                type: "STRING",
                choices: [
                    {
                        name: "name",
                        value: "user_name"
                    },

                    {
                        name: "age",
                        value: "user_age"
                    },

                    {
                        name: "avatar",
                        value: "user_pfp"
                    },

                    {
                        name: "banner",
                        value: "user_banner"
                    },
                  
                 
                    {
                        name: "hobby",
                        value: 'user_hobby'
                    },

                    {
                        name: "id",
                        value: "user_id"
                    },

                    {
                        name: 'lookup',
                        value: "look_up"
                    },
                ],
                required: true,
                  },
                ],
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

    // getting the person's option
    const choice = interaction.options.getString("option")

    const user = await users.findOne({ userId: interaction.user.id })

    // if the choice == user_name
    if(choice == 'user_name') {
        await interaction.editReply(`${bot.error} • Please send your name`).catch(() => null)
        const filter = msg => msg.author.id === interaction.user.id
        await interaction.channel.awaitMessages({ filter: filter, max: 1 }).then(async col => {
            if(!user.CustomId) await interaction.followUp(`${bot.tick} • Successfully set your name to ${col.first().content}\n\nYou didn't set a profile ID, so no one can search you up`).catch(() => null)
            else await interaction.followUp(`${bot.tick} • Successfully set your name to ${col.first().content}`).catch(() => null)
            user.UserName = col.first().content
            await user.save()
        })
    }

    // if the choice == user_name
    if(choice == 'user_pfp') {    
      await interaction.editReply(`${bot.error} • Please send image or image url for your avatar`).catch(() => null)
        const filter = msg => msg.author.id === interaction.user.id
        await interaction.channel.awaitMessages({ filter: filter, max: 1 }).then(async col => {
          
        const pfp = `${col.first().content}`;
          if(!user.CustomId) await interaction.followUp(`${bot.tick} • Successfully set your pfp to \`${pfp}\`\n\nYou didn't set a profile ID, so no one can search you up`).catch(() => null)
            else await interaction.followUp(`${bot.tick} • Successfully set your avatar to \`${pfp}\``).catch(() => null)
            user.UserPfp = pfp
            await user.save()
            await col.delete().catch(() => {})
        })
    }      

    // if the choice == user_banner
    if(choice == 'user_banner') {
        await interaction.editReply(`${bot.error} • Please send image or image url for your profile`).catch(() => null)
        const filter = msg => msg.author.id === interaction.user.id
        await interaction.channel.awaitMessages({ filter: filter, max: 1 }).then(async col => {
      const banner = `${col.first().content}`;
            if(!user.CustomId) await interaction.followUp(`${bot.tick} • Successfully set your banner to \`${banner}\`\n\nYou didn't set a profile ID, so no one can search you up`).catch(() => null)
            else await interaction.followUp(`${bot.tick} • Successfully set your banner to \`${banner}\``).catch(() => null)
            user.UserBanner = `${banner}`;
            await user.save()
            await col.delete().catch(() => {})
        })
    }
      
    if(choice == 'user_age') {
        await interaction.editReply(`${bot.error} • Please send your age in numbers only.`).catch(() => null)
        const filter = msg => msg.author.id === interaction.user.id
        await interaction.channel.awaitMessages({ filter: filter, max: 1 }).then(async col => {
            if(isNaN(col.first().content)) return await interaction.followUp(`${bot.error} • Please reuse /profile and submit a valid age!`).catch(() => null)
            if(!user.CustomId) await interaction.followUp(`${bot.tick} • Successfully set your age to ${col.first().content}\n\nYou didn't set a profile ID, so no one can search you up`).catch(() => null)
            else await interaction.followUp(`${bot.tick} • Successfully set your age to ${col.first().content}`).catch(() => null)
            user.UserAge = col.first().content
            await user.save()
        })
    }


    if(choice == 'user_hobby') {
        await interaction.editReply(`${bot.error} • Please send your hobby`).catch(() => null)
        const filter = msg => msg.author.id === interaction.user.id
        await interaction.channel.awaitMessages({ filter: filter, max: 1 }).then(async col => {
            if(!user.CustomId) await interaction.followUp(`${bot.tick} • Successfully set your hobby to:\n\`\`\`${col.first().content}\`\`\`\n\nYou didn't set a profile ID, so no one can search you up`).catch(() => null)
            else await interaction.followUp(`${bot.tick} • Successfully set your hobby to:\n\`\`\`${col.first().content}\`\`\``).catch(() => null)
            user.UserHobby = col.first().content
            await user.save()
        })
    }


    if(choice == 'user_id') {
        await interaction.editReply(`${bot.error} • Please send your unique id that people gonna search u with`).catch(() => null)
        const filter = msg => msg.author.id === interaction.user.id
        await interaction.channel.awaitMessages({ filter: filter, max: 1 }).then(async col => {
            await interaction.followUp(`${bot.tick} • Successfully set your id to \`${col.first().content}\``).catch(() => null)
            user.CustomId = col.first().content
            await user.save()
        })
    }


    if(choice == 'look_up') {
        await interaction.editReply(`${bot.error} • Please send the id of the user to search them up`).catch(() => null)
        const filter = msg => msg.author.id === interaction.user.id
        await interaction.channel.awaitMessages({ filter: filter, max: 1 }).then(async col => {
            let searchedUser = await users.findOne({ CustomId: col.first().content }).catch(() => null)
            if(!searchedUser) return await interaction.followUp(`${bot.crosss} • This user cannot be found`).catch(() => null)

            const Embed = new MessageEmbed()
            .setTitle(searchedUser.CustomId)
            .setThumbnail(`${searchedUser.UserPfp}`, { dynamic: true})
.setImage(`${searchedUser.UserBanner}`)
            .addField("<a:bf_HE:796373377878589490> Name :", `${searchedUser.UserName}`, true)
            .addField("<a:bf_HE:796373377878589490> Age :", `${searchedUser.UserAge}`, true)
            .addField("<a:bf_HE:796373377878589490> Hobby :", `${searchedUser.UserHobby}`)
            .setColor(bot.color)

            await interaction.followUp({ embeds: [ Embed ]}).catch(() => null)
        })
    }

      
    }}