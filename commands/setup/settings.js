const { CommandInteraction, MessageEmbed } = require("discord.js");
const simplydjs = require("simply-djs")
const guilds = require("../../models/guild");

module.exports = {
    name: "settings",
    description: "Shows server setup",
    ownerOnly: false,
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
         
    const guildID = interaction.guild.id; 
        const messageChannel = interaction.channel; 
    const guild = await guilds.findOne({ 
            guildId: interaction.guild.id,
            });    
         
         const boost = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Boost Detector`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/boost message or /boost channel`" ) 
                        .addFields( { 
                            name: "» Boost Toogle", 
                            value: `\`\`\`\n${guild.boost}\n\`\`\``,
                            },
                            { 
                            name: "» Boost Message", 
                            value: `\`\`\`\n${guild.boost_message}\n\`\`\``,
                            }, 
                            { 
                                name: "» Boost Channel", 
                                value: `<#${guild.boost_channel}>`, 
                                
                            } ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor(bot.color); 

        const bump = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Bump Reminder`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/bump toggle or /bump channel`" ) 
                        .addFields( { 
                            name: "» Bump Toogle", 
                            value: `\`\`\`\n${guild.bump}\n\`\`\``,
                            },
                            { 
                                name: "» Bump Channel", 
                                value: `<#${guild.bump_channel}>`, 
                                
                            } ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor(bot.color);
      
        const chatbot = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Chatbot`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/chatbot toggle or /chatbot channel`" ) 
                        .addFields( { 
                            name: "» Chatbot Toogle", 
                            value: `\`\`\`\n${guild.chatbot}\n\`\`\``,
                            },
                            { 
                                name: "» Chatbot Channel", 
                                value: `<#${guild.chat_channel}>`, 
                                
                            } ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor(bot.color); 
   
            const confess = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Confession`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/confession enable or /confession disable`" ) 
                        .addFields( { 
                            name: "» Confession Toogle", 
                            value: `\`\`\`\n${guild.confession}\n\`\`\``,
                            }, 
                            { 
                                name: "» Confession Channel", 
                                value: `<#${guild.confess_channel}>`, 
                                
                            } ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor(bot.color); 
   
            const leave = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Leave Messages`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/leave`" ) 
                        .addFields( { 
                            name: "» Leave Toogle", 
                            value: `\`\`\`\n${guild.leave}\n\`\`\``,
                            },
                            { 
                                name: "» Leave Channel", 
                                value: `<#${guild.leave_channel}>`, 
                                
                            },
                            { 
                            name: "» Leave Dm Toogle", 
                            value: `\`\`\`\n${guild.leave_dmuser}\n\`\`\``,
                            },
                            { 
                            name: "» Leave Embed Toogle", 
                            value: `\`\`\`\n${guild.leave_embed}\n\`\`\``,
                            },
                            { 
                            name: "» Leave Message", 
                            value: `\`\`\`\n${guild.leave_message}\n\`\`\``,
                            },
                            ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor(bot.color); 
   
            const leveling = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Leveling`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/leveling`" ) 
                        .addFields( { 
                            name: "» Leveling Toogle", 
                            value: `\`\`\`\n${guild.leveling}\n\`\`\``,
                            },
                            { 
                            name: "» Leveling Message", 
                            value: `\`\`\`\n${guild.leveling_message}\n\`\`\``,
                            }, 
                            { 
                                name: "» Leveling Channel", 
                                value: `<#${guild.leveling_channel}>`, 
                                
                            } ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor(bot.color); 
   
            const logging = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Comfi™ logging`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/logging`" ) 
                        .addFields( { 
                            name: "» Logging Toogle", 
                            value: `\`\`\`\n${guild.logging}\n\`\`\``,
                            }, 
                            { 
                                name: "» Logging Channel", 
                                value: `<#${guild.logging_channel}>`, 
                                
                            } ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor(bot.color); 
   
            const membercount = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Member Counter`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/membercount`" ) 
                        .addFields( { 
                            name: "» Counter Toogle", 
                            value: `\`\`\`\n${guild.member_counter || "NONE"}\n\`\`\``,
                            },
                            { 
                            name: "» Counter Channel Type", 
                            value: `\`\`\`\n${guild.member_counter_channel_type || "NONE"}\n\`\`\``,
                            }, 
                            { 
                                name: "» Counter Channel Name", 
                                value: `${guild.member_counter_channel_name || "NONE"}`, 
                                
                            },
                            { 
                            name: "» Counter Channel", 
                            value: `<#${guild.member_counter_channel || "NONE"}>`,
                            },) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor(bot.color); 
   
            const modlog = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Modlogs`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/modlog enable or /modlog disable`" ) 
                        .addFields( { 
                            name: "» Modlogs Toogle", 
                            value: `\`\`\`\n${guild.modlog}\n\`\`\``,
                            }, 
                            { 
                                name: "» Modlogs Channel", 
                                value: `<#${guild.mod_channel}>`, 
                                
                            } ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor(bot.color); 
   
            const mute = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Mute Role`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/muterole enable or /muterole disable`" ) 
                        .addFields( { 
                            name: "» Muterole Toggle", 
                            value: `\`\`\`\n${guild.mute}\n\`\`\``,
                            }, 
                            { 
                                name: "» Mute Role", 
                                value: `<@&${guild.mute_role}>`, 
                                
                            } ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor(bot.color); 
   
            const suggest = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Suggestions `, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/suggestion enable or /suggestion disable`" ) 
                        .addFields( { 
                            name: "» Suggestion Toogle", 
                            value: `\`\`\`\n${guild.suggestions}\n\`\`\``,
                            },
                            { 
                                name: "» Suggestions Channel", 
                                value: `<#${guild.suggestions_channel}>`, 
                                
                            } ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor(bot.color); 
   
            const ticket = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Ticket System`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/ticket category, /ticket role, /ticket disable`" ) 
                        .addFields( { 
                            name: "» Ticket Toogle", 
                            value: `\`\`\`\n${guild.ticket}\n\`\`\``,
                            },
                            { 
                            name: "» Ticket Category", 
                            value: `\`\`\`\n${guild.ticket_category}\n\`\`\``,
                            }, 
                            { 
                                name: "» Ticket Support Role", 
                                value: `<@&${guild.ticket_role}>`, 
                                
                            } ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor(bot.color); 
   
            const verification = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Captcha Verification`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/verification`" ) 
                        .addFields( { 
                            name: "» Verification Toogle", 
                            value: `\`\`\`\n${guild.verification}\n\`\`\``,
                            },
                            { 
                            name: "» Verification Message", 
                            value: `\`\`\`\n${guild.verification_message}\n\`\`\``,
                            }, 
                            { 
                                name: "» verification Channel", 
                                value: `<#${guild.verification_channel}>`, 
                                
                            },
                            { 
                            name: "» Verification Role", 
                            value: `<@&${guild.verification_role}>`,
                            },
                            ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor(bot.color); 
   
            const welcome = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Welcome`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/welcome`" ) 
                        .addFields( { 
                            name: "» Welcome Toogle", 
                            value: `\`\`\`\n${guild.welcome}\n\`\`\``,
                            },
                            { 
                                name: "» Welcome Channel", 
                                value: `<#${guild.welcome_channel}>`, 
                                
                            },
                            { 
                            name: "» Welcome Dm Toogle", 
                            value: `\`\`\`\n${guild.welcome_dmuser}\n\`\`\``,
                            },
                            { 
                            name: "» Welcome Embed Toogle", 
                            value: `\`\`\`\n${guild.welcome_embed}\n\`\`\``,
                            },
                            { 
                            name: "» Welcome Message", 
                            value: `\`\`\`\n${guild.welcome_message}\n\`\`\``,
                            },
                            ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor(bot.color); 
                            
const pages = [boost, bump, chatbot, confess, leave, leveling, logging, membercount, modlog, mute, suggest, ticket, verification, welcome]; 
                            
simplydjs.embedPages(bot, interaction, pages, {
slash: true,
firstEmoji: '884420649580363796', 
backEmoji: '884421503205134356',
delEmoji: '891534962917007410', 
forwardEmoji: '884421235965059113', 
lastEmoji: '884420650549272586', 
btncolor: 'SECONDARY',
delcolor: 'SECONDARY', 
skipcolor: 'SECONDARY', 
skipBtn: true,
})
    }}