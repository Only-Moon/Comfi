const Discord = require('discord.js')
const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
config: {
    name: "hp",
    description: "Help Menu",
    category: 'utility',
    usage: "1) !help \n2) !help [module name]\n3) !help [command (name or alias)]",
    example: "1) !help\n2) !help util\n3) !help ban",
    aliases: ['hpp']
},
run: async (bot, message, args) => {
    const avatar = message.author.displayAvatarURL();
        embed = new Discord.MessageEmbed()
          .setTitle('Hello!')
          .setDescription('⇉ ᧙ <a:pinkheartsu_HE:796373357280362517> ﹒﹒﹒Overview  ﹒﹒﹒<a:pinkheartsu_HE:796373357280362517>᧙ \n   \n જ <a:bun_bounce_HE:798617643775033394> Administration \n જ <a:llama_roll_HE:855602231986487326>  Emoji \n જ <:currency_HE:812034164891189289>  Economy \n જ <a:730643342169210890:798458300219785216> Fun \n જ <a:pinktea_HE:796373339651571744>  Images \n જ <a:Pink_Bow_HE:783028553897869332>  Information \n જ <a:heartcharm_HE:783028559580495923> Moderation \n જ <a:cat_tada_HE:779274421574959127>  Music \n જ <a:paw_HE:797027740007661578>  Utility \n \n ⇉ ੭ <a:pinkheartsu_HE:796373357280362517>  ─ ─ ─ ─ ─ ─ ─ ─ ─ ').setFooter('Click on the Button Emojis to jump to the Command Category.')
          .setColor('#F4B3CA')
          .setThumbnail(bot.user.displayAvatarURL());

        let btn1 = new MessageButton()
            .setStyle('red')
            .setLabel('Admin commands')
            .setCustomId('1');
        let btn2 = new MessageButton()
            .setStyle('red')
            .setLabel('Emoji commands')
            .setCustomId('2');
        let btn3 = new MessageButton()
            .setStyle('blurple')
            .setLabel('Economy commands')
            .setCustomId('3');
        let btn4 = new MessageButton()
            .setStyle('blurple')
            .setLabel('Fun Commands ')
            .setCustomId('4');
        let btn5 = new MessageButton()
            .setStyle('blurple')
            .setLabel('Images Commands ')
            .setCustomId('5');
        let btn6 = new MessageButton()
            .setStyle('blurple')
            .setLabel('Info Commands ')
            .setCustomId('6');
        let btn7 = new MessageButton()
            .setStyle('green')
            .setLabel('Mod Commands ')
            .setCustomId('7');
        let btn8 = new MessageButton()
            .setStyle('green')
            .setLabel('Music Commands ')
            .setCustomId('8');
        let btn9= new MessageButton()
            .setStyle('gray')
            .setLabel('Utility Commands ')
            .setCustomId('9'); 
        let btn10 = new MessageButton()  .setStyle('LINK') 
           .setLabel('Support Server!')
           .setURL('https://discord.gg/remYPHCVgW');    
        
let row = new MessageActionRow()
            .addComponents(btn1)
            .addComponents(btn2)
            .addComponents(btn3)
            .addComponents(btn4);

let row2 = new MessageActionRow()
            .addComponents(btn5)
            .addComponents(btn6)
            .addComponents(btn7)
            .addComponents(btn8);
            
let row3 = new MessageActionRow()
            .addComponents(btn9)
            .addComponents(btn10);


let msg = await message.channel.send({
            components: [row, row2, row3],
            embeds: [embed]
});

}
}