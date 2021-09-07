const { readdirSync } = require("fs"); 
const prefix = "/";
let color = "#F4B3CA"; 
const create_mh = require("../../modules/menu_help"); 
const { CommandInteraction, MessageEmbed } = require("discord.js"); 

module.exports = { 
  name: "help", 
  description: "Show all the Available bot Commands in Menu Form",
  ownerOnly: false, 
  options: [ 
    { 
      type: 'STRING', 
      description: 'particular command', 
      name: 'command', 
      required: false,
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
  let categories = []; 
  let cots = []; 
  if (!args[0]) { //categories to ignore 

    let ignored = [
      "owner", 
      "context"
    ];
    
    const emo = {
      admin: "🔑", 
      anime: "⚔", 
      fun: "🌈",
      info: "❓", 
      levels: "📊", 
      mod: "🔱",
      setup: "⚙",
      utility: "🔧" 
    } 
      
    let ccate = []; readdirSync("./commands/").forEach((dir) => { 
      if (ignored.includes(dir.toLowerCase())) return; 
      const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`; 
      let nome = dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase(); 
      let cats = new Object(); 
     
      cats = { 
        name: name, 
        value: `\`/help ${dir.toLowerCase()}\``, 
        inline: true, 
      }; 
      
      categories.push(cats); 
      ccate.push(nome);
    }); 
    
  const embed = new MessageEmbed() 
    .setTitle("Help Menu:") 
    .setDescription(`>>> My prefix is ${prefix}\nUse \`${prefix}help (category)\` to view commands base on their category!`) 
    .addFields(categories) 
    .setFooter(`Requested by ${interaction.member.displayName}`, interaction.user.avatarURL({ dynamic: true })) 
    .setTimestamp() 
    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
    .setColor(color); 
    
    let menus = create_mh(ccate);
    return interaction.editReply({ 
      embeds: [embed], 
      components: menus.smenu }) .then((msgg) => { 
      const menuID = menus.sid; 
      const select = async (interaction) => {
        if (interaction.customId != menuID) return;
        let { values } = interaction; 
        let value = values[0]; 
        let catts = []; 
        readdirSync("./commands/").forEach((dir) => { 
          if (dir.toLowerCase() !== value.toLowerCase()) return;
          const commands = readdirSync(`./commands/${dir}/`).filter( (file) => file.endsWith(".js")
                                                                    );
      const cmds = commands.map((command) => { 
        let file = require(`../../commands/${dir}/${command}`); 
        
        if (!file.name) return "No command name."; let name = file.name.replace(".js", ""); 
        if (bot.slashCommands.get(name).hidden) return; 
        
        let des = bot.slashCommands.get(name).description; 
        let emo = bot.slashCommands.get(name).emoji; 
        let emoe = emo ? `${emo} - ` : ""; 
        
        let obj = { 
          cname: `${emoe}\`${name}\``, 
          des, 
        };
        
        return obj;
      }); 
          
      let dota = new Object(); 
          cmds.map((co) => { 
            if (co == undefined) return; 
            dota = {
              name: `${cmds.length === 0 ? "In progress." : co.cname}`,
              value: co.des ? co.des : "No Description", 
              inline: true,
            };
            
            catts.push(dota);
          });
          
          cots.push(dir.toLowerCase());
        }); 
        
        if (cots.includes(value.toLowerCase())) { 
          const combed = new MessageEmbed() 
            .setTitle( `__${ value.charAt(0).toUpperCase() + value.slice(1) } Commands!__` )
            .setDescription( `Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n` ) 
            .addFields(catts) 
            .setColor(color); 
          
await interaction.deferUpdate(); 

return interaction.message.edit({ 
            embeds: [combed],
            components: menus.smenu, 
});
        } 
      };
      
const filter = (interaction) => {
  return ( !interaction.user.bot && interaction.user.id == interaction.user.id );
};
      
  const collector = msgg.createMessageComponentCollector({ 
    filter, 
                                                            componentType: "SELECT_MENU", 
                                                           }); 
      
      collector.on("collect", select);
      
      collector.on("end", () => null); 
    });
  } else { 
    
    let catts = [];
    readdirSync("./commands/").forEach((dir) => { 
      
      if (dir.toLowerCase() !== args[0].toLowerCase()) return; 
      const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js")
                                              ); 
      const cmds = commands.map((command) => {
        
        let file = require(`../../commands/${dir}/${command}`); 
        if (!file.name) return "No command name."; 
        
        let name = file.name.replace(".js", ""); 
        
        if (bot.slashCommands.get(name).hidden) return; 
        let des = bot.slashCommands.get(name).description; 
        let emo = bot.slashCommands.get(name).emoji;
        let emoe = emo ? `${emo} - ` : "";
        
        let obj = { 
          cname: `${emoe}\`${name}\``, 
          des, 
        };
        
        return obj;
      }); 
      
      let dota = new Object(); 
      cmds.map((co) => {
        if (co == undefined) return; 
        dota = { 
          name: `${cmds.length === 0 ? "In progress." : co.cname}`, 
          value: co.des ? co.des : "No Description", 
          inline: true,
        }; 
        
        catts.push(dota);
      }); 
      
      cots.push(dir.toLowerCase()); 
    }); 
    
    const command = bot.slashCommands.get(args[0].toLowerCase()) || bot.slashCommands.find( (c) => c.aliases && c.aliases.includes(args[0].toLowerCase()) 
                                                                                          ); 
    
    if (cots.includes(args[0].toLowerCase())) { 
      
      const combed = new MessageEmbed() 
        .setTitle( `__${ args[0].charAt(0).toUpperCase() + args[0].slice(1) } Commands!__` ) 
        .setDescription( `Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n` ) 
        .addFields(catts) 
        .setColor(color); 
      
return interaction.editReply({ 
  embeds: [combed]
});
    } 
    
    if (!command) {
      const embed = new MessageEmbed()
        .setTitle( `Invalid command! Use \`${prefix}help\` for all of my commands!` ) 
        .setColor("RED"); 
      
return await interaction.editReply({
  embeds: [embed] 
});
    } 
    
    const embed = new MessageEmbed() 
      .setTitle("Command Details:")
      .addField( "Command:", command.name ? `\`${command.name}\`` : "No name for this command." ) 
      .addField( "Aliases:", command.aliases ? `\`${command.aliases.join("` `")}\`` : "No aliases for this command." )
      .addField( "Usage:", command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : `\`${prefix}${command.name}\`` ) 
      .addField( "Command Description:", command.description ? command.description : "No description for this command." ) 
      .setFooter( `Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true, }) )
      .setTimestamp() 
      .setColor(color); 
    
return await interaction.editReply({ 
  embeds: [embed]
}); 
  } 
}
}