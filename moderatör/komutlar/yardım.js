const Discord = require('discord.js')
const ayarlar = require('../ayarlar/ayarlar.json') 

exports.run = async (client, message, args) => {
    var prefix = ayarlar.prefix;

//GENEL KOMUTU
    if(args[0] === "Genel" || args[0] === "genel" || args[0] === "General" || args[0] === "general") {
              let Genel = new Discord.MessageEmbed()
  .setAuthor('Genel', message.author.displayAvatarURL())
  .setColor('#2667FF')
  .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.displayAvatarURL())
   .setDescription(client.commands.filter(cmd => cmd.conf.kategori === 'Genel').map(cmd => `:white_small_square: - **${prefix}${cmd.help.name}** ${cmd.help.description}`).join("\n "))
        .addField("» Linkler", ` [Davet Et](https://discord.com/oauth2/authorize?client_id=BOTUNİDSİ&scope=bot&permissions=2108157183)` + "** | **" + `[Destek Sunucusu](https://discord.gg/2vPdmYz)`  + "** | **" + `[Oy Ver](https://bit.ly/3980hKq)`  + "** | **" + `[Web Sitesi](https://gnarge.xyz/)  `, false)
              return message.channel.send(Genel)
         
       
       return;
    }
//YARDIM KOMUTU
  
  let embed = new Discord.MessageEmbed()
  .setAuthor('Yardım', message.author.displayAvatarURL())
  .setThumbnail(client.user.avatarURL())
  .setColor('#FFFB05')
  
  .addField('`KOMUTLAR:`', `
  yaz : **İstediğiniz şeyi bota yazdırır.** 
  sunucu : **Sunucu hakkında bilgi verir.**
  info : **Kullanıcı hakkında bilgi verir.**
  `)
  .addField('`YÖNETİM:`', `
  ban : **İstediğiniz kişiye bot ban atar.** 
  kick : **istediğiniz kişiyi bot kick ler.**
  `)
  .addField("» Linkler", ` [Davet Et](https://discord.com/login?redirect_to=%2Foauth2%2Fauthorize%3Fclient_id%3D840939158703964180%26scope%3Dbot%26permissions%3D805314622)` + "** | **" + `[Destek Sunucusu](https://discord.gg/sazvmysTTj)`, false)
  

  .setFooter(message.author.tag, message.author.displayAvatarURL())
  message.channel.send(embed)

  
}
    

  exports.conf = {
    aliases: ['help','komutlar','yardım'], 
    permLevel: 0, 
    kategori: "Genel" 

  };

  exports.help = {
    name: 'yardım',  
    description: 'Komutlar hakkında bilgi verir.', 
    usage: 'yardım', 
  };
