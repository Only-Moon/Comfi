const ms = require("ms");
const pms = require("pretty-ms");
const moment = require('moment')
const { db } = require('../../Database.js');
const { CommandInteraction, MessageEmbed } = require("discord.js");
const { Color, isColor } = require("coloras");

module.exports = {
    name: "welcome",
    description: "Sets the welcome system",
    ownerOnly: false,
    options: [
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
          {
            type: 'SUB_COMMAND',
            description: 'Sets the channel for welcome',
            name: 'channel',            
            options : [
          {
            type: 'CHANNEL',
            description: 'Channel for Chatbot',
            name: 'name',
            required: true,
        },
              ],
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
            name: 'url',
            type: 'STRING',
            description: "Choose a url for title.",
            required: false,
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
            name: 'color',
            type: 'STRING',
            description: "Choose a color in (RGB, HEX, HSL, HSV, CMYK).",
            required: false,
        },
        {
            name: 'footer',
            type: 'STRING',
            description: "Choose a footer.",
            required: false,
        },
        {
            name: "author",
            type: "USER",
            required: false,
            description: 'Choose a author.'
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
            description: 'Test the Welcome System',
            name: 'test',
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
				await db.set(`Weltog_${interaction.guild.id}`, toggle);
				return interaction.editReply(
					`The Welcome Toggle for **${
						interaction.guild.name
					}** has been set to: **${toggle}**`
				);
  
}

if (option === 'help') {
  const hembed = new MessageEmbed()
    .setTitle("Error")
    .setDescription(":x: You are not authorized to use this command :(")
    .setColor("#FF0000")
    .setTimestamp();
    
    if(!interaction.member.permissions.has("PERMISSIONS.FLAGS_ADMINISTRATOR")) {
      return message.channel.send({ embeds: [ hembed ]});
    }

  const prefix = '/';

  const embed = new MessageEmbed()
    .setTitle("Greetings Setup")
    .setAuthor(interaction.member.displayName)
    .setColor(bot.color)
    .setTimestamp()
    .setDescription(`**Welcome to the setup.**\nHere are the parameters available which you can set for the greeting message, background image and will it be a embed or not.\n\n`)
    .addField("Parameters you can use in message of Welcome/leave -", "```{user}``` - Mentions the joining or leaving member\n```{user_name}``` - Just gives the username of the join/leave member\n```{user_tag}``` - Shows the user tag. Ex - User#1234\n```{user_id}``` - Shows the user id\n```{server_name}``` - Shows the server name\n```{server_id}``` - Shows the server id\n```{membercount}``` - Shows the member count of the server\n```{user_createdAt}``` - Shows member account creation date\n```{user_createdAgo}``` - Shows the member creation time ago")
    .setFooter(`Requested by ${interaction.member.displayName}`);

  interaction.followUp({ embeds: [embed] });
}

if (option === 'embed-toggle') {

const emtoggle = interaction.options.getString('option')
				await db.set(`Welemtog_${interaction.guild.id}`, emtoggle);
				return interaction.editReply(
					`The Welcome Embed Toggle for **${
						interaction.guild.name
					}** has been set to: **${emtoggle}**`
				);
  
}

if (option === 'channel') {

const channel = interaction.options.getChannel('name');
				if (!channel)
					return interaction.editReply(':x: | **Specify the channel**');
				await db.set(`welcome_channel_${interaction.guild.id}`, channel.id);
				return interaction.editReply(
					'**The Welcome channel has been set to** ' + channel.toString()
				);
  
}

if (option === 'embed') {

const author = interaction.options.getUser('author');

        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const couleurr = interaction.options.getString('color');
        const url = interaction.options.getString('url');
        const image = interaction.options.getString('image');
        const thumbnail = interaction.options.getString('thumbnail');
        const footer = interaction.options.getString('footer');

        const resultat = new MessageEmbed()
        .setTitle(title)

        if(description) {

let sMsg = description
					.replace(/{user}/g, `${interaction.member}`)
					.replace(/{user_tag}/g, `${interaction.user.tag}`)
					.replace(/{user_name}/g, `${interaction.user.username}`)
					.replace(/{user_id}/g, `${interaction.member.id}`)
					.replace(/{server_name}/g, `${interaction.guild.name}`)
					.replace(/{server_id}/g, `${interaction.guild.id}`)
					.replace(/{membercount}/g, `${interaction.guild.memberCount}`)
					.replace(/{guild}/g, `${interaction.guild.name}`)
					.replace(
						/{user_createdAgo}/g,
						`${moment(interaction.user.createdTimestamp).fromNow()}`
					)
					.replace(
						/{user_createdAt}/g,
						`${moment(interaction.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`
					);
          
          resultat.setDescription(sMsg)
        }
        if(couleurr) {
            if (!isColor(couleurr).color) return interaction.editReply({ content: `<a:Attention:883349868062576701> You must enter a valid colour. The colour can be in RGB, HEX, HSL, HSV, CMYK.` });
            const color = new Color(couleurr);
            resultat.setColor(color.toHex())
        }

        if(url){
            if(url.includes('https://') || url.includes('http://')){ 
                resultat.setURL(url)
            }
            else{
                return interaction.editReply({ content: `<a:Attention:883349868062576701> The link is not valid.`})
            }
        }

        if(image){
            if(image.includes('https://') || image.includes('http://')){ 
                resultat.setImage(image)
            }
            else{
                return interaction.editReply({ content: `<a:Attention:883349868062576701> The link for the image is not valid.`})
            }
        }

        if(thumbnail){
            if(thumbnail.includes('https://') || thumbnail.includes('http://')){ 
                resultat.setThumbnail(thumbnail)
            }
            else {
                return interaction.editReply({ content: `<a:Attention:883349868062576701> The link for the thumbnail is not valid.`})
            }
        }

        if(author){
            resultat.setAuthor(author.tag, author.displayAvatarURL({ dynamic: true }))
        }
        
        if(footer){
            resultat.setFooter(footer)
        }
let welcome = await db.set(`wel_${interaction.guild.id}`, resultat)

  let welcc = await db.get(`wel_${interaction.guild.id}`) 
    return interaction.editReply({content: "Setted Embed For Welcome System", 
embeds: [ welcc ]})  
}

if (option === 'test') {

const add = await bot.emit("guildMemberAdd", interaction.member);
  
     if (!add) { 
       return interaction.editReply('Please setup Welcome Channel and Message Using `/welcome channel` and `/welcome embed` first!', interaction.channel) 
       
     }
       if(add) { 
         return interaction.editReply("Tested Welcome. If the message didn't send to the channel, something might be wrong with the permissions.") 
         
       }

}
      
    }}
  