const { db } = require('../../Database.js'),
      ms = require("ms"),
      pms = require("pretty-ms"),
      moment = require('moment'),
     { CommandInteraction, MessageEmbed } = require("discord.js"),
     { Color, isColor } = require("coloras"),
     simplydjs = require("simply-djs");

module.exports = {
    name: "welcome",
    description: "Sets the welcome system",
    ownerOnly: false,
    options: [
         {
            type: 'SUB_COMMAND',
            description: 'Sets the channel for welcome',
            name: 'channel',            
            options : [
          {
            type: 'CHANNEL',
            description: 'Channel name',
            name: 'name',
            required: true,
        },
              ],
        },
        {
            type: 'SUB_COMMAND',
            description: 'Deletes all values From Welcome System',
            name: 'disable',
        },
        {
            type: 'SUB_COMMAND',
            description: 'Sets the greet embed',
            name: 'embed',
            options: [
       {
            name: 'title',
            type: 'STRING',
            description: "Choose a title.",
            required: true,
        }, 
        {
            name: 'description',
            type: 'STRING',
            description: "Choose a description.",
            required: true,
        },
        {
            name: 'color',
            type: 'STRING',
            description: "Choose a color in (RGB, HEX, HSL, HSV, CMYK).",
            required: true,
        },
        {
            name: 'image',
            type: 'STRING',
            description: "Choose a image.",
            required: false,
        },
        {
            name: 'thumbnail',
            type: 'STRING',
            description: "Choose a thumbnail.",
            required: false,
        },
        {
            name: 'footer',
            type: 'STRING',
            description: "Choose a footer.",
            required: false,
        },
            ],
        },
        {
          type: 'SUB_COMMAND',
          description: 'Helps you with welcome settings',
          name: 'help',
        },
        {
          type: 'SUB_COMMAND',
          description: 'Shows settings for welcome system',
          name: 'settings',
        },
        {
            type: 'SUB_COMMAND',
            description: 'Test the Welcome System',
            name: 'test',
        },
        {
           type: 'SUB_COMMAND',
           description: 'Sets the greet toggle true/false',
           name: 'toggle',
           options: [
            {
            type: 'STRING',
            description: 'Toggle greet',
            name: 'option',
            required: true,
            choices: [
            {
            name: 'true/on',
            value: 'true'  
            },
            {
            name: 'false/off',
            value: 'false'
            }
            ],
            },
             ],
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

let [ option ] = args

if (option === 'toggle') {

const toggle = interaction.options.getString('option')
				await db.set(`welcome_toggle_${interaction.guild.id}`, toggle)
				return interaction.editReply(
					`The Welcome Toggle for **${
						interaction.guild.name
					}** has been set to: **${toggle}**`
				);
  
}

if (option === 'help') {
  
const helpEmbed1 = new MessageEmbed()
                    .setAuthor( `Help - Welcome System`, bot.user.displayAvatarURL({ dynamic: true }) 
                    ) 
                    .setDescription("Here you can get help on how to use the welcome system.")
                    .addFields( { 
                            name: "Settings", 
                            value: "The Welcome setting menu is very simple! There are 3 things\n `#1)` **Welcome Channel**\n> The channel which the welcome message will be sent to! Command: `/welcome channel <channel>`\n`#2)` **Welcome Embed**\n> Welcome embed is the message that is sent when someone joims the server. Head over to the next page to see variables that you can use. Command: `/welcome embed <message>`\n`#3)` **Welcome Toggle**\n> Toggle to turn Welcome System on/off! Command: `/welcome toggle <on/off>`",
                            } ) 
                            .setColor(bot.color); 
                            
                            const helpEmbed2 = new MessageEmbed() 
                            .setAuthor( `Help - Welcome System`, bot.user.displayAvatarURL({ dynamic: true }) )
                            .setDescription( "Here are some variables that you can use for `Welcome Title, Description and Footer` Make sure to use curly brackets!\n\n```{user}``` - Mentions the joining or leaving member (doesn't works for title or footer)\n```{user_name}``` - Just gives the username of the join/leave member\n```{user_tag}``` - Shows the user tag. Ex - User#1234\n```{user_id}``` - Shows the user id\n```{server_name}``` - Shows the server name\n```{server_id}``` - Shows the server id\n```{membercount}``` - Shows the member count of the server\n```{user_createdAt}``` - Shows member account creation date\n```{user_createdAgo}``` - Shows the member creation time ago" ) 
                            .setColor(bot.color); 
                            
                            const helpEmbed3 = new MessageEmbed() 
                            .setAuthor( `Help - Welcome System`, bot.user.displayAvatarURL({ dynamic: true }) ) 
                            .setDescription("Here you can see how to set up settings")
.setImage("https://i.imgur.com/kQ8khNE.jpg") 
                            .setColor(bot.color); 
                            
                            const helpEmbed4 = new MessageEmbed() .setAuthor( `Help - Welcome System`, bot.user.displayAvatarURL({ dynamic: true }) ) 
                            .setDescription("Here is how it will look in Welcome Channel.") 
                         //   .setImage( "https://media.discordapp.net/attachments/869823340947316737/869827463105101844/unknown.png" )
                            .setColor(bot.color);

const pages = [helpEmbed1, helpEmbed2, helpEmbed3, helpEmbed4]; 
                            
simplydjs.embedPages(bot, interaction, pages, {
slash: true,
firstEmoji: '884420649580363796', 
backEmoji: '884421503205134356',
delEmoji: '884422849505415228', 
forwardEmoji: '884421235965059113', 
lastEmoji: '884420650549272586', 
btncolor: 'SECONDARY',
delcolor: 'SECONDARY', 
skipcolor: 'SECONDARY', 
skipBtn: true,
}) 
}

if (option === 'channel') {

  const channel = interaction.options.getChannel('name');
				if (!channel)
					return interaction.editReply(`${bot.error} **Specify the channel**`);
				await db.set(`welcome_channel_${interaction.guild.id}`, channel)
				return interaction.editReply(
					'**The Welcome channel has been set to** ' + channel.toString()
				);
  
}

if (option === 'embed') {

        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const couleurr = interaction.options.getString('color');
        const image = interaction.options.getString('image');
        const thumbnail = interaction.options.getString('thumbnail');
        const footer = interaction.options.getString('footer');
  
        if(title) {
 await db.set(`welcome_title_${interaction.guild.id}`, title)
 
       }

        if(description) {

await db.set(`welcome_desc_${interaction.guild.id}`, description) 

        }
        if(couleurr) {
            if (!isColor(couleurr).color) return interaction.editReply({ content: `<a:Attention:883349868062576701> You must enter a valid colour. The colour can be in RGB, HEX, HSL, HSV, CMYK.` });
            const color = new Color(couleurr);
          
 await db.set(`welcome_color_${interaction.guild.id}`, color.toHex())
        }

        if(image){
            if(image.includes('https://') || image.includes('http://')){ 
        await db.set(`welcome_img_${interaction.guild.id}`, image)
            }
            else{
                return interaction.editReply({ content: `${bot.error} The link for the image is not valid.`})
            }
        }

        if(thumbnail){
            if(thumbnail.includes('https://') || thumbnail.includes('http://')){ 
     await db.set(`welcome_thumb_${interaction.guild.id}`, thumbnail)
            }
            else {
                return interaction.editReply({ content: `${bot.error} The link for the thumbnail is not valid.`}) 
            }
        }
        
        if(footer){
 await db.set(`welcome_foot_${interaction.guild.id}`, footer)
        }

    return interaction.editReply({content: "**Setted Embed For Welcome System. Do `/welcome settings` to check it**"})  
}

if (option === 'test') {
let ch = await db.get(`welcome_channel_${interaction.guild.id}`)

      if(ch) { 
 
bot.emit("guildMemberAdd", interaction.member)      

return interaction.editReply("Tested Welcome. If the message didn't send to the channel, something might be wrong with the permissions.") 
          } else {
       return interaction.editReply(`${bot.error} Welcome System Not Enabled`)
          }

}

if (option === 'settings') { 

const tit = await db.get(`welcome_title_${interaction.guild.id}`)
const desc = await db.get(`welcome_desc_${interaction.guild.id}`)
const color = await db.get(`welcome_color_${interaction.guild.id}`)
  
  if(tit || desc || color){

const img = await db.get(`welcome_img_${interaction.guild.id}`) || "";
const thumb = await db.get(`welcome_thumb_${interaction.guild.id}`) || "";
const foot = await db.get(`welcome_foot_${interaction.guild.id}`) || "";
const toggle = await db.get(`welcome_toggle_${interaction.guild.id}`) || "None";
const ch = await db.get(`welcome_channel_${interaction.guild.id}`) || "None";
  
const settingEmbed = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Boost Messages`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/boost message or /boost channel`" ) 
                        .addFields( { 
                            name: "» Welcome Toggle", 
                            value: `\`\`\`\n${toggle}\n\`\`\``,
                            }, 
                            { 
                                name: "» Welcome Channel", 
                                value: `<#${ch}>`, 
                                
                            } ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor("#F4B3CA");
    
let embed = new MessageEmbed()
.setTitle(tit)
.setDescription(desc)
.setColor(color)
.setImage(img)
.setThumbnail(thumb)
.setFooter(foot); 

const pages = [settingEmbed, embed]; 
                            
simplydjs.embedPages(bot, interaction, pages, {
slash: true,
firstEmoji: '884420649580363796', 
backEmoji: '884421503205134356',
delEmoji: '884422849505415228', 
forwardEmoji: '884421235965059113', 
lastEmoji: '884420650549272586', 
btncolor: 'SECONDARY',
delcolor: 'SECONDARY', 
skipcolor: 'SECONDARY', 
skipBtn: true,
}) 
    
  } else if (!tit || !desc || !color) {

const toggle = await db.get(`welcome_toggle_${interaction.guild.id}`) || "None";
const ch = await db.get(`welcome_channel_${interaction.guild.id}`) || "None";
  
const settingEmbed = new MessageEmbed() 
                        .setAuthor( `${interaction.guild.name} - Settings - Welcome System`, interaction.guild.iconURL({ dynamic: true }) ) 
                        .setDescription( "You can change the settings by `/welcome embed or /welcome channel`" ) 
                        .addFields( { 
                            name: "» Welcome Toggle", 
                            value: `\`\`\`\n${toggle}\n\`\`\``,
                            }, 
                            { 
                                name: "» Welcome Channel", 
                                value: `<#${ch}>`, 
                                
                            } ) 
                            .setFooter( `Requested by: ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }) ) 
                            .setColor("#F4B3CA");
    
let embed = new MessageEmbed()
.setTitle(`Welcome Embed`) 
.setDescription(`${bot.error} Welcome system is Disabled`)
.setColor(bot.color);   

 const pages = [settingEmbed, embed]; 
                            
simplydjs.embedPages(bot, interaction, pages, {
slash: true,
firstEmoji: '884420649580363796', 
backEmoji: '884421503205134356',
delEmoji: '884422849505415228', 
forwardEmoji: '884421235965059113', 
lastEmoji: '884420650549272586', 
btncolor: 'SECONDARY',
delcolor: 'SECONDARY', 
skipcolor: 'SECONDARY', 
skipBtn: true,
})    
  } 
  
}
if (option === 'disable') {

await db.delete(`welcome_title_${interaction.guild.id}`) && db.delete(`welcome_desc_${interaction.guild.id}`) && db.delete(`welcome_color_${interaction.guild.id}`) && db.delete(`welcome_img_${interaction.guild.id}`) && db.delete(`welcome_thumb_${interaction.guild.id}`) && db.delete(`welcome_foot_${interaction.guild.id}`) && db.delete(`welcome_toggle_${interaction.guild.id}`) && db.delete(`welcome_channel_${interaction.guild.id}`)

return interaction.editReply({content: "Removed all values from welcome system"})
  
}
  
    }}
  