const guilds = require('../models/guild')
const { permissions, MessageEmbed }
 = require ("discord.js")
  
module.exports = async (bot) => {

 const DarkDashboard = require('dbd-dark-dashboard');
  const prefix = "/"
  const web = process.env["web"]
  const webp = process.env["webp"]
  
  let DBD = require('discord-dashboard');
  await DBD.useLicense('6968082f-cc27-4659-9c92-6ec40f28908c');
  DBD.Dashboard = DBD.UpdatedClass();
  
let fun = []
  
bot.slashCommands.filter((cmd) => cmd.directory == 'fun')
.map(command =>
  fun.push({
    commandName: `/${command.name}`,
    commandUsage: command.usage							? `${prefix}${command.name} ${command.usage}`							
    : `${prefix}${command.name}`,
    commandDescription: command.description							
      ? command.description							
      : 'No description for this command.',
    commandAlias: command.aliases ?
          `${command.aliases.join(", ")}` :
          "No aliases.",
  })
)
  
let info = []
  
bot.slashCommands.filter((cmd) => cmd.directory == 'info')
.map(command =>
  info.push({
    commandName: `/${command.name}`,
    commandUsage: command.usage							? `${prefix}${command.name} ${command.usage}`							
    : `${prefix}${command.name}`,
    commandDescription: command.description							
      ? command.description							
      : 'No description for this command.',
    commandAlias: command.aliases ?
          `${command.aliases.join(", ")}` :
          "No aliases.",
  })
)

let level = []
  
bot.slashCommands.filter((cmd) => cmd.directory == 'level')
.map(command =>
  level.push({
    commandName: `/${command.name}`,
    commandUsage: command.usage							? `${prefix}${command.name} ${command.usage}`							
    : `${prefix}${command.name}`,
    commandDescription: command.description							
      ? command.description							
      : 'No description for this command.',
    commandAlias: command.aliases ?
          `${command.aliases.join(", ")}` :
          "No aliases.",
  })
)

let mod = []
  
bot.slashCommands.filter((cmd) => cmd.directory == 'mod')
.map(command =>
  mod.push({
    commandName: `/${command.name}`,
    commandUsage: command.usage							? `${prefix}${command.name} ${command.usage}`						
    : `${prefix}${command.name}`,
    commandDescription: command.description							
      ? command.description							
      : 'No description for this command.',
    commandAlias: command.aliases ?
          `${command.aliases.join(", ")}` :
          "No aliases.",
  })
)

let role = []
  
bot.slashCommands.filter((cmd) => cmd.directory == 'role')
.map(command =>
  role.push({
    commandName: `/${command.name}`,
    commandUsage: command.usage							? `${prefix}${command.name} ${command.usage}`							
    : `${prefix}${command.name}`,
    commandDescription: command.description							
      ? command.description							
      : 'No description for this command.',
    commandAlias: command.aliases ?
          `${command.aliases.join(", ")}` :
          "No aliases.",
  })
)

let setup = []
  
bot.slashCommands.filter((cmd) => cmd.directory == 'setting')
.map(command =>
  setup.push({
    commandName: `/${command.name}`,
    commandUsage: command.usage							? `${prefix}${command.name} ${command.usage}`							
    : `${prefix}${command.name}`,
    commandDescription: command.description							
      ? command.description							
      : 'No description for this command.',
    commandAlias: command.aliases ?
          `${command.aliases.join(", ")}` :
          "No aliases.",
  })
)

let utility = []
  
bot.slashCommands.filter((cmd) => cmd.directory == 'utility')
.map(command =>
  utility.push({
    commandName: `/${command.name}`,
    commandUsage: command.usage							? `${prefix}${command.name} ${command.usage}`							
    : `${prefix}${command.name}`,
    commandDescription: command.description							
      ? command.description							
      : 'No description for this command.',
    commandAlias: command.aliases ?
          `${command.aliases.join(", ")}` :
          "No aliases.",
  })
)

  const Dashboard = new DBD.Dashboard({
    port: 80,
    client: {
      id: process.env["clientID"],
      secret: process.env["Secret"]
    },
    redirectUri: `${webp}discord/callback`,
    domain: `${web}`,
    bot: bot,
    invite: {
        clientId: bot.user.id,
        scopes: ["bot", "applications.commands"],
        permissions: "1241204124887",
        redirectUri: `${webp}discord/callback`
      },
      guildAfterAuthorization: { 
        use: true, 
        guildId: "778547302151356417" 
      },
      supportServer: {
        slash: '/support',
        inviteUrl: "https://discord.io/moon_rabbit"
      },
    theme: DarkDashboard({
      information: {
        createdBy: "Xx-Mohit-xX",
        websiteTitle: "Miyu-chan Dashboard",
        websiteName: "miyu-chan™",
        websiteUrl: `${web}`,
        supportServer: "https://discord.io/moon_rabbit",
        imageFavicon: bot.user.displayAvatarURL({dynamic:  true}),
        iconURL: bot.user.avatarURL({dynamic:  true}),
        pageBackGround: "linear-gradient(#F21262, #FAB3CA)",
        mainColor: "#F21262",
        subColor: "#FAB3CA",
      },
      index: {
        card: {
          category: "Miyu-chan - The Aesthetic Multipurpose Bot",
          image: "https://cdn.discordapp.com/attachments/804978370050916362/936146613242576916/IMG_0359.jpg",
          footer: '↠ Made with love by ꒰⚘݄꒱₊_❝ moonbow ᵕ̈ 🌸#5817',
        },
        feeds: {
          description: "↠ Thanks for Checking My Dashboard",
          footer: "<a href='https://ko-fi.com/E1E057WWV' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>"
        },
        information: { 
          category: "Note", 
          title: "Information", 
          description: `This bot and panel is currently a work in progress so contact support if you find any issues on discord.`, 
          footer: `<a href="https://discord.gg/HNfhvCeR6d"> ↠ Click here to join my Support Server</a>`
        },
      },
      guilds: {
        cardTitle: "Guilds", cardDescription: "Here are all the guilds you currenly have permissions for:",
      }, 
      guildSettings: {
        cardTitle: "Guild Settings",
        cardDescription: "Here you can manage all the settings for your guild:",
      },
      sidebar: {
        //If set to false all default items in sidebar will be removed
        keepDefault: true,
        list: [{
            icon: `<svg fill="#F21262" style="position: absolute; margin-left: 8px; margin-top: 2px;" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
        d="M11 23.59v-3.6c-5.01-.26-9-4.42-9-9.49C2 5.26 6.26 1 11.5 1S21 5.26 21 10.5c0 4.95-3.44 9.93-8.57 12.4l-1.43.69zM11.5 3C7.36 3 4 6.36 4 10.5S7.36 18 11.5 18H13v2.3c3.64-2.3 6-6.08 6-9.8C19 6.36 15.64 3 11.5 3zm-1 11.5h2v2h-2zm2-1.5h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z" />
</svg>
`,
            title: "Support",
            link: "https://discord.io/moon_rabbit",
            id: "support",
        },              
{
            icon: `<svg style="position: absolute; margin-left: 8px; margin-top: 2px;" fill="#F21262" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><g><g><g><path d="M16,13c3.09-2.81,6-5.44,6-7.7C22,3.45,20.55,2,18.7,2c-1.04,0-2.05,0.49-2.7,1.25C15.34,2.49,14.34,2,13.3,2 C11.45,2,10,3.45,10,5.3C10,7.56,12.91,10.19,16,13z M13.3,4c0.44,0,0.89,0.21,1.18,0.55L16,6.34l1.52-1.79 C17.81,4.21,18.26,4,18.7,4C19.44,4,20,4.56,20,5.3c0,1.12-2.04,3.17-4,4.99c-1.96-1.82-4-3.88-4-4.99C12,4.56,12.56,4,13.3,4z"/><path d="M19,16h-2c0-1.2-0.75-2.28-1.87-2.7L8.97,11H1v11h6v-1.44l7,1.94l8-2.5v-1C22,17.34,20.66,16,19,16z M3,20v-7h2v7H3z M13.97,20.41L7,18.48V13h1.61l5.82,2.17C14.77,15.3,15,15.63,15,16c0,0-1.99-0.05-2.3-0.15l-2.38-0.79l-0.63,1.9l2.38,0.79 c0.51,0.17,1.04,0.26,1.58,0.26H19c0.39,0,0.74,0.23,0.9,0.56L13.97,20.41z"/></g></g></g></g></svg>
`,
            title: "Donate Us",
            link: "https://ko-fi.com/E1E057WWV",
            id: "donate",
              }    
              ]
    }, 
      commands: [
      {
        category: `Fun`,
        subTitle: `Fun Commands`,
        aliasesDisabled: true,
        list: fun,
      },
      {
        category: `Info`,
        subTitle: `Info Commands`,
        aliasesDisabled: true,
        list: info,
      },
      {
        category: `Levels`,
        subTitle: `Levelings Commands`,
        aliasesDisabled: true,
        list: level,
      },
     {
        category: `Mod`,
        subTitle: `Moderation Commands`,
        aliasesDisabled: true,
        list: mod,
      },
    {
        category: `Roles`,
        subTitle:  `Role Commands`,
        aliasesDisabled: true,
        list: role,
      },
    {
        category: `Setup`,
        subTitle: `Setup Commands`,
        aliasesDisabled: true,
        list: setup,
      },
    {
        category: `Utility`,
        subTitle: `Utility Commands`,
        aliasesDisabled: true,
        list: utility,
      },
],
          
    }),
                               
    settings: [
      {
        categoryId: 'gen',
        categoryName: "General",
        categoryDescription: "Setup your bot with default settings!",
        categoryOptionsList: [
          {
            optionId: 'nick',
            optionName: "Nickname",
            optionDescription: "Change Comfi's nickname for your guild",
            optionType: DBD.formTypes.input(bot.user.username, 1, 20, false, false),
            getActualSet: async ({ guild }) => {
              return bot.guilds.cache.get(guild.id).me.displayName;
            },
            setNew: async ({ guild, newData }) => {
          await bot.guilds.cache.get(guild.id).me.setNickname(newData)
              return;
            },
          },
          {
            optionId: 'bug',
            optionName: "BugReport",
            optionDescription: "Report Comfi's Bugs (make sure to include screenshots as well)",
            optionType: DBD.formTypes.textarea("", 1, 3999, false, false),
            getActualSet: async ({ guild, user }) => {  
        return "";
            },
            setNew: async ({ guild, user, newData }) => {
const usr = bot.users.cache.get(user?.id)
const guld = bot.guilds.cache.get(guild?.id)
  const reportCh = bot.channels.cache.get(
			'889149873893539900') || bot.channels.cache.get('863684464176922664')

		const reportEmbed = new MessageEmbed()
			.setTitle('Bug Report')
			.setDescription(
				`**Author :**\n> ${usr.username} \n**Report :**\n> ${newData}`)
			.setFooter({text: `Sent from ${guld.name} - ${guld.id}`})
			.setTimestamp()
			.setColor(bot.color)
		if (reportCh) {
			reportCh.send({ embeds: [reportEmbed] }).catch(() => null)
		} else return;
              return;
            },
          },
          {
            optionId: 'feed',
            optionName: "Feedback",
            optionDescription: "Give Feedback About Comfi",
            optionType: DBD.formTypes.textarea("", 1, 3999, false, false),
            getActualSet: async ({ guild, user}) => {  
        return "";
            },
            setNew: async ({ guild, user, newData }) => {

const usr = bot.users.cache.get(user?.id)
const guld = bot.guilds.cache.get(guild?.id)              
  const repoCh = bot.channels.cache.get('881789379809513500')

		const repoEmbed = new MessageEmbed()
			.setTitle('Bug Report')
			.setDescription(
				`**Author :**\n> ${usr.username} \n**Report :**\n> ${newData}`)
			.setFooter({text: `Sent from ${guld.name} - ${guld.id}`})
			.setTimestamp()
			.setColor(bot.color)
		if (repoCh) {
			repoCh.send({ embeds: [repoEmbed] }).catch(() => null)
		} else return;
              return;
            },
          },          
        ]
      },
      {
        categoryId: "auto",
        categoryName: "AutoMod",
        categoryDescription: "Setup Comfi's Auto Mod system",
        categoryOptionsList: [
{
            optionId: 'logtoggle',
            optionName: "General Logs Toggle",
            optionDescription: "Toggle Comfi's General Logging System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.logging;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  logging: newData
                } 
              )
              return;
            }
          },          
          {
            optionId: 'logchannel',
            optionName: "General Logs Channel",
            optionDescription: "Setup Comfi's General Logs",
            optionType: DBD.formTypes.channelsSelect(false, channelTypes = ["GUILD_TEXT"]),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.logging_channel;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                logging_channel: newData
                } 
              )
              return;
            }
          },          
          {
            optionId: 'modtoggle',
            optionName: "Mod Toggle",
            optionDescription: "Toggle Comfi's Modlogs System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.welcome;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  modlog: newData
                } 
              )
              return;
            }
          },          
          {           
            optionId: 'modchannel',
            optionName: "ModLogs Channel",
            optionDescription: "Setup Channel for Mod Logs",
            optionType: DBD.formTypes.channelsSelect(false, channelTypes = ["GUILD_TEXT"]),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.mod_channel;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  mod_channel: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'antitoggle',
            optionName: "AntiScam Toggle",
            optionDescription: "Toggle Comfi's AntiScam System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.anti_scam;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  anti_scam: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'antiduration',
            optionName: "AntiScam Timeout Duration",
            optionDescription: "Setup AntiScam System's Timeout Duration",
            optionType: DBD.formTypes.input("12h", 1, 10, false, false),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return bot.ms(wel.anti_scam_time);
            },
            setNew: async ({ guild, newData }) => {

const Time = bot.ms(newData) 
if (!Time) return await {error: `Provide a valid time in d, h, m, s, ms format`} 
if (Time <= 10000) return {error: `Time cant be lesser than 10 seconds`} 
if (Time > 2332800000) return {error: `Time can't be greater than 27 days !!`}
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
              anti_scam_time: newData
                } 
              )
              return;
            }
          },
        ],
      },
      {
        categoryId: 'wel',
        categoryName: "Welcome",
        categoryDescription: "Setup Comfi's Welcome System!",
        categoryOptionsList: [
          {
            optionId: 'weltoggle',
            optionName: "Toggle",
            optionDescription: "Toggle Comfi's Welcome System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.welcome;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  welcome: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'welemtoggle',
            optionName: "Embed-Toggle",
            optionDescription: "Embed Toggle Comfi's Welcome System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.welcome_embedtgl;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  welcome_embedtgl: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'weldmtoggle',
            optionName: "Dm-Toggle",
            optionDescription: "Dm Toggle Comfi's Welcome System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.welcome_dmuser;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  welcome_dmuser: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'welchannel',
            optionName: "Channel",
            optionDescription: "Channel for Comfi's Welcome System",
            optionType: DBD.formTypes.channelsSelect(false, channelTypes = ["GUILD_TEXT"]),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.welcome_channel;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  welcome_channel: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'welmessage',
            optionName: "Message",
            optionDescription: "Message for Comfi's Welcome System",
            optionType: DBD.formTypes.input("", 1, 3999, false, false),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.welcome_message;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  welcome_message: newData
                } 
              )
              return;
            },
            allowedCheck: async ({guild, user}) => {
    const wel = await guilds.findOne({guildId: guild.id})

if (wel.welcome_embedtgl) return {allowed: false, errorMessage: "Welcome Embed Toggle is enabled,  turn it off to send non - embed message"}
              
return {allowed: true, errorMessage:  null}
              
            }
          },
                    {
            optionId: 'welembed',
            optionName: "Embed",
            optionDescription: `Embed for Comfi's Welcome System`, 
            optionType: DBD.formTypes.embedBuilder({username: bot.user.username, avatarURL: bot.user.displayAvatarURL({dynamic:true}), defaultJson: {content:  "", embed: {title: "", color: bot.color} }}),
            getActualSet: async ({ guild, user }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})

              
        return wel.welcome_embed[0];
            },
            setNew: async ({ guild, newData }) => {
          
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  welcome_embed: newData
                } 
              )
              
              return;
            },
            allowedCheck: async ({guild, user}) => {
    const wel = await guilds.findOne({guildId: guild.id})

if (!wel.welcome_embedtgl) return {allowed: false, errorMessage: "Welcome Embed Toggle is disabled,  turn it on to send an embed"}
              
return {allowed: true, errorMessage:  null}
          }
          },
                    {
            optionId: 'welimage',
            optionName: "Image",
            optionDescription: "Image for Comfi's Welcome System",
            optionType: DBD.formTypes.input("", 1, 100, false, false),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.welcome_image;
            },
            setNew: async ({ guild, newData }) => {

const reg = ("^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)($|\?.*$)")     

if (!reg.match(newData)) return {error: "Submit a Valid Image Url"}
              
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  welcome_image: newData
                } 
              )
              return;
            }
          },
          { 
            optionType: 'spacer', 
            title: "Variables", 
            description: `<span style="color: #F21262; background: #101112;">{{user#mention}}</span> - mentions the user<br><span style="color: #F21262; background: #101112;">{{user#tag}}</span> - the users tag<br><span style="color: #F21262; background: #101112;">{{user#avatar}}</span> - the users avatar url<br><span style="color: #F21262; background: #101112;">{{user#id}}</span> - the users id<br><span style="color: #F21262; background: #101112;">{{server#membercount}}</span> - the servers membercount<br><span style="color: #F21262; background: #101112;">{{server#humancount}}</span> - humans/non-bot members count of the server<br><span style="color: #F21262; background: #101112;">{{server#name}}</span> - the servers name<br><span style="color: #F21262; background: #101112;">{server#id}}</span> - the servers id<br><span style="color: #F21262; background: #101112;">{{server#icon}}</span> - the server icon url<br><span style="color: #F21262; background: #101112;">{{join#position}}</span> - the users join position` 
          },          
          {
            optionId: 'weljoin',
            optionName: "JoinRole",
            optionDescription: "JoinRole for Comfi's Welcome System",
            optionType: DBD.formTypes.rolesMultiSelect( false, false ),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.welcome_joinrole || [];
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  welcome_joinrole: newData                 } 
              )
              return;
            }
          },   
          {
            optionId: 'welnick',
            optionName: "AutoNick",
            optionDescription: "AutoNick for Comfi's Welcome System",
            optionType: DBD.formTypes.input("", 1, 32, false, false),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.welcome_auto_nick;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  welcome_auto_nick: newData                 } 
              )
              return;
            },
}           
        ]
      },
       {
        categoryId: 'leave',
        categoryName: "Leave",
        categoryDescription: "Setup Comfi's Leave System!",
        categoryOptionsList: [
          {
            optionId: 'levtoggle',
            optionName: "Toggle",
            optionDescription: "Toggle Comfi's Leave System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const leave
= await guilds.findOne({guildId: guild.id})
        return leave.leave;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  leave: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'levemtoggle',
            optionName: "Embed-Toggle",
            optionDescription: "Embed Toggle Comfi's Leave System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const leave
= await guilds.findOne({guildId: guild.id})
        return leave.leave_embedtgl;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  leave_embedtgl: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'levdmtoggle',
            optionName: "Dm-Toggle",
            optionDescription: "Dm Toggle Comfi's Leave System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const leave
= await guilds.findOne({guildId: guild.id})
        return leave.leave_dmuser;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  welcome_dmuser: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'levchannel',
            optionName: "Channel",
            optionDescription: "Channel for Comfi's Leave System",
            optionType: DBD.formTypes.channelsSelect(false, channelTypes = ["GUILD_TEXT"]),
            getActualSet: async ({ guild }) => {       
      const leave
= await guilds.findOne({guildId: guild.id})
        return leave.leave_channel;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  leave_channel: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'levmessage',
            optionName: "Message",
            optionDescription: "Message for Comfi's Leave System",
            optionType: DBD.formTypes.input("", 1, 3999, false, false),
            getActualSet: async ({ guild }) => {       
      const leave
= await guilds.findOne({guildId: guild.id})
        return leave.leave_message;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  leave_message: newData
                } 
              )
              return;
            },
            allowedCheck: async ({guild, user}) => {
    const leave = await guilds.findOne({guildId: guild.id})

if (leave.leave_embedtgl) return {allowed: false, errorMessage: "Leave Embed Toggle is enabled,  turn it off to send non - embed message"}
              
return {allowed: true, errorMessage:  null}
              
            }
          },
                    {
            optionId: 'levembed',
            optionName: "Embed",
            optionDescription: `Embed for Comfi's Leave System`, 
            optionType: DBD.formTypes.embedBuilder({username: bot.user.username, avatarURL: bot.user.displayAvatarURL({dynamic:true}), defaultJson: {content:  "", embed: {title: "", color: bot.color} }}),
            getActualSet: async ({ guild, user }) => {       
      const leave
= await guilds.findOne({guildId: guild.id})

        return leave.leave_embed[0];
            },
            setNew: async ({ guild, newData }) => {
          
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  leave_embed: newData
                } 
              )
              
              return;
            },
            allowedCheck: async ({guild, user}) => {
    const leave = await guilds.findOne({guildId: guild.id})

if (!leave.leave_embedtgl) return {allowed: false, errorMessage: "Leave Embed Toggle is disabled,  turn it on to send an embed"}
              
return {allowed: true, errorMessage:  null}
          }
          },
                    {
            optionId: 'levimage',
            optionName: "Image",
            optionDescription: "Image for Comfi's Leave System",
            optionType: DBD.formTypes.input("", 1, 100, false, false),
            getActualSet: async ({ guild }) => {       
      const leave
= await guilds.findOne({guildId: guild.id})
        return leave.leave_image;
            },
            setNew: async ({ guild, newData }) => {

const reg = ("^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)($|\?.*$)")     

if (!reg.match(newData)) return {error: "Submit a Valid Image Url"}
              
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  leave_image: newData
                } 
              )
              return;
            }
          },
          { 
            optionType: 'spacer', 
            title: "Variables", 
            description: `<span style="color: #F21262; background: #101112;">{{user#mention}}</span> - mentions the user<br><span style="color: #F21262; background: #101112;">{{user#tag}}</span> - the users tag<br><span style="color: #F21262; background: #101112;">{{user#avatar}}</span> - the users avatar url<br><span style="color: #F21262; background: #101112;">{{user#id}}</span> - the users id<br><span style="color: #F21262; background: #101112;">{{server#membercount}}</span> - the servers membercount<br><span style="color: #F21262; background: #101112;">{{server#humancount}}</span> - humans/non-bot members count of the server<br><span style="color: #F21262; background: #101112;">{{server#name}}</span> - the servers name<br><span style="color: #F21262; background: #101112;">{server#id}}</span> - the servers id<br><span style="color: #F21262; background: #101112;">{{server#icon}}</span> - the server icon url` 
          },       
        ]
      },     
       {
        categoryId: 'bst',
        categoryName: "Boost",
        categoryDescription: "Setup Comfi's Boost System!",
        categoryOptionsList: [
          {
            optionId: 'bsttoggle',
            optionName: "Toggle",
            optionDescription: "Toggle Comfi's Boost System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const bst
= await guilds.findOne({guildId: guild.id})
        return bst.bst;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  boost: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'bstemtoggle',
            optionName: "Embed-Toggle",
            optionDescription: "Embed Toggle Comfi's Boost System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const bst
= await guilds.findOne({guildId: guild.id})
        return bst.boost_embedtgl;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  boost_embedtgl: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'bstchannel',
            optionName: "Channel",
            optionDescription: "Channel for Comfi's Boost System",
            optionType: DBD.formTypes.channelsSelect(false, channelTypes = ["GUILD_TEXT"]),
            getActualSet: async ({ guild }) => {       
      const bst
= await guilds.findOne({guildId: guild.id})
        return bst.boost_channel;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  boost_channel: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'bstmessage',
            optionName: "Message",
            optionDescription: "Message for Comfi's Boost System",
            optionType: DBD.formTypes.input("", 1, 3999, false, false),
            getActualSet: async ({ guild }) => {       
      const bst
= await guilds.findOne({guildId: guild.id})
        return bst.boost_message;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  boost_message: newData
                } 
              )
              return;
            },
            allowedCheck: async ({guild, user}) => {
    const bst = await guilds.findOne({guildId: guild.id})

if (bst.boost_embedtgl) return {allowed: false, errorMessage: "Boost Embed Toggle is enabled,  turn it off to send non - embed message"}
              
return {allowed: true, errorMessage: null}
              
            }
          },
                    {
            optionId: 'bstembed',
            optionName: "Embed",
            optionDescription: `Embed for Comfi's Boost System`, 
            optionType: DBD.formTypes.embedBuilder({username: bot.user.username, avatarURL: bot.user.displayAvatarURL({dynamic:true}), defaultJson: {content:  "", embed: {title: "", color: bot.color} }}),
            getActualSet: async ({ guild, user }) => {       
      const bst
= await guilds.findOne({guildId: guild.id})

        return bst.boost_embed[0];
            },
            setNew: async ({ guild, newData }) => {
          
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  boost_embed: newData
                } 
              )
              
              return;
            },
            allowedCheck: async ({guild, user}) => {
    const bst = await guilds.findOne({guildId: guild.id})

if (!bst.boost_embedtgl) return {allowed: false, errorMessage: "Boost Embed Toggle is disabled,  turn it on to send an embed"}
              
return {allowed: true, errorMessage:  null}
          }
          },
                    {
            optionId: 'bstimage',
            optionName: "Image",
            optionDescription: "Image for Comfi's Boost System",
            optionType: DBD.formTypes.input("", 1, 100, false, false),
            getActualSet: async ({ guild }) => {       
      const bst
= await guilds.findOne({guildId: guild.id})
        return bst.boost_image;
            },
            setNew: async ({ guild, newData }) => {

const reg = ("^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)($|\?.*$)")     

if (!reg.match(newData)) return {error: "Submit a Valid Image Url"}
              
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  boost_image: newData
                } 
              )
              return;
            }
          },
          { 
            optionType: 'spacer', 
            title: "Variables", 
            description: `<span style="color: #F21262; background: #101112;">{{user#mention}}</span> - mentions the user<br><span style="color: #F21262; background: #101112;">{{user#tag}}</span> - the users tag<br><span style="color: #F21262; background: #101112;">{{user#avatar}}</span> - the users avatar url<br><span style="color: #F21262; background: #101112;">{{server#icon}}</span> - the server icon url<br><span style="color: #F21262; background: #101112;">{{server#name}}</span> - the servers name<br><span style="color: #F21262; background: #101112;">{boost#count}}</span> - the servers boost count` 
          },       
        ]
      },     
      {
        categoryId: 'lvl',
        categoryName: "Leveling",
        categoryDescription: "Setup Comfi's Leveling System!",
        categoryOptionsList: [
          {
            optionId: 'lvltoggle',
            optionName: "Toggle",
            optionDescription: "Toggle Comfi's Leveling System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const lvl
= await guilds.findOne({guildId: guild.id})
        return lvl.leveling;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  leveling: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'lvlemtoggle',
            optionName: "Embed-Toggle",
            optionDescription: "Embed Toggle Comfi's Leveling System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const lvl
= await guilds.findOne({guildId: guild.id})
        return lvl.leveling_embedtgl;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  leveling_embedtgl: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'lvlcoleave',
            optionName: "Co-Leave",
            optionDescription: "Co-Leave Toggle for Comfi's Leveling System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const lvl
= await guilds.findOne({guildId: guild.id})
        return lvl.leveling_coleave;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  leveling_coleave: newData
                } 
              )
              return;
            }
          },          
          {
            optionId: 'lvlchannel',
            optionName: "Channel",
            optionDescription: "Channel for Comfi's Leveling System",
            optionType: DBD.formTypes.channelsSelect(false, channelTypes = ["GUILD_TEXT"]),
            getActualSet: async ({ guild }) => {       
      const lvl
= await guilds.findOne({guildId: guild.id})
        return lvl.leveling_channel;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  leveling_channel: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'lvlmessage',
            optionName: "Message",
            optionDescription: "Message for Comfi's Leveling System",
            optionType: DBD.formTypes.input("", 1, 3999, false, false),
            getActualSet: async ({ guild }) => {       
      const lvl
= await guilds.findOne({guildId: guild.id})
        return lvl.leveling_message;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  leveling_message: newData
                } 
              )
              return;
            },
            allowedCheck: async ({guild, user}) => {
    const lvl = await guilds.findOne({guildId: guild.id})

if (lvl.leveling_embedtgl) return {allowed: false, errorMessage: "Leveling Embed Toggle is enabled,  turn it off to send non - embed message"}
              
return {allowed: true, errorMessage: null}
              
            }
          },
                    {
            optionId: 'lvlembed',
            optionName: "Embed",
            optionDescription: `Embed for Comfi's Leveling System`, 
            optionType: DBD.formTypes.embedBuilder({username: bot.user.username, avatarURL: bot.user.displayAvatarURL({dynamic:true})}),
            getActualSet: async ({ guild, user }) => {       
      const lvl
= await guilds.findOne({guildId: guild.id})

        return lvl.leveling_embed[0];
            },
            setNew: async ({ guild, newData }) => {
          
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  leveling_embed: newData
                } 
              )
              
              return;
            },
            allowedCheck: async ({guild, user}) => {
    const lvl = await guilds.findOne({guildId: guild.id})

if (!lvl.leveling_embedtgl) return {allowed: false, errorMessage: "Leveling Embed Toggle is disabled,  turn it on to send an embed"}
              
return {allowed: true, errorMessage:  null}
            }
          },
          { 
            optionType: 'spacer', 
            title: "Variables", 
            description: `<span style="color: #F21262; background: #101112;">{{user#mention}}</span> - mentions the user<br><span style="color: #F21262; background: #101112;">{{user#tag}}</span> - the users tag<br><span style="color: #F21262; background: #101112;">{{user#avatar}}</span> - the users avatar url<br><span style="color: #F21262; background: #101112;">{{level}}</span> - the users new level<br><span style="color: #F21262; background: #101112;">{{xp}}</span> - the usersxp<br><span style="color: #F21262; background: #101112;">{requiredxp}}</span> - the new required xp count` 
          }, 
                    {
            optionId: 'lvlimage',
            optionName: "Image",
            optionDescription: "Image for Comfi's Leveling System",
            optionType: DBD.formTypes.input("", 1, 100, false, false),
            getActualSet: async ({ guild }) => {       
      const lvl
= await guilds.findOne({guildId: guild.id})
        return lvl.leveling_image;
            },
            setNew: async ({ guild, newData }) => {

const reg = ("^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)($|\?.*$)")     

if (!reg.match(newData)) return {error: "Submit a Valid Image Url"}
              
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  leveling_image: newData
                } 
              )
              return;
            }
          },          
        ]
      },   
      {
        categoryId: 'tkt',
        categoryName: "Ticket",
        categoryDescription: "Setup Comfi's Ticket System!",
        categoryOptionsList: [
          {
            optionId: 'tkttoggle',
            optionName: "Toggle",
            optionDescription: "Toggle Comfi's Ticket System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const tkt
= await guilds.findOne({guildId: guild.id})
        return tkt.ticket;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  ticket: newData
                } 
              )
              return;
            }
          },      
          {
            optionId: 'tktchannel',
            optionName: "Channel",
            optionDescription: "Channel for Comfi's Ticket System",
            optionType: DBD.formTypes.channelsSelect(false, channelTypes = ["GUILD_CATEGORY"]),
            getActualSet: async ({ guild }) => {       
      const tkt
= await guilds.findOne({guildId: guild.id})
        return tkt.ticket_category;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  ticket_category: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'tktrole',
            optionName: "Support",
            optionDescription: "Support for Comfi's Ticket System",
            optionType: DBD.formTypes.rolesSelect(false),
            getActualSet: async ({ guild }) => {       
      const tkt
= await guilds.findOne({guildId: guild.id})
        return tkt.ticket_role;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  ticket_role: newData
                } 
              )
              return;
            }
          },
        ]
      },          
      {
        categoryId: "misc",
        categoryName: "Misc",
        categoryDescription: "Setup Comfi's Misc System",
        categoryOptionsList: [
{
            optionId: 'chattoggle',
            optionName: "Chatbot Toggle",
            optionDescription: "Toggle Comfi's Chatbot System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.chatbot;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  chatbot: newData
                } 
              )
              return;
            }
          },          
          {
            optionId: 'chatchannel',
            optionName: "Chatbot Channel",
            optionDescription: "Setup Comfi's Chatbot Channel",
            optionType: DBD.formTypes.channelsSelect(false, channelTypes = ["GUILD_TEXT"]),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.chat_channel;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                chat_channel: newData
                } 
              )
              return;
            }
          },          
          {
            optionId: 'conftoggle',
            optionName: "Confession Toggle",
            optionDescription: "Toggle Comfi's Anonymous Confession",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.confession;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  confession: newData
                } 
              )
              return;
            }
          },          
          {           
            optionId: 'confchannel',
            optionName: "Confession Channel",
            optionDescription: "Setup Channel for Anonymous Confession",
            optionType: DBD.formTypes.channelsSelect(false, channelTypes = ["GUILD_TEXT"]),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.confess_channel;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  confess_channel: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'nqntoggle',
            optionName: "NQN Toggle",
            optionDescription: "Toggle Comfi's NQN",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.nqn;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  nqn: newData
                } 
              )
              return;
            }
          },
          {
            optionId: 'sugtoggle',
            optionName: "Suggestion Toggle",
            optionDescription: "Toggle Comfi's Suggestion System",
            optionType: DBD.formTypes.select({"True": true, "False": false}, false),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.suggestions;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  suggestions: newData
                } 
              )
              return;
            }
          },          
          {           
            optionId: 'sugchannel',
            optionName: "Suggestion Channel",
            optionDescription: "Setup Channel for Suggestion System",
            optionType: DBD.formTypes.channelsSelect(false, channelTypes = ["GUILD_TEXT"]),
            getActualSet: async ({ guild }) => {       
      const wel
= await guilds.findOne({guildId: guild.id})
        return wel.suggestions_channel;
            },
            setNew: async ({ guild, newData }) => {
              await guilds.findOneAndUpdate( 
                { guildId: guild.id 
                }, 
                { 
                  suggestions_channel: newData
                } 
              )
              return;
            }
          },          
        ],
      },
                                          ],
    minimizedConsoleLogs: true,
    assistantsSecureStrorageKey: "Comfi",
    acceptPrivacyPolicy: true,
    reportError: (where, what) => {
      bot.logger.log(`Discord Dashboard Error - ${where}: ${what} `)
}
  });

  Dashboard.init();
};

 