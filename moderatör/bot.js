const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
const ayarlar = require('./ayarlar/ayarlar.json');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

//komut yükleme protokolü
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//sa-as
client.on("message", (message) =>{
  if(message.content.toLocaleLowerCase() === 'sa') {
   message.channel.send(`<@${message.author.id}> **As Dostum Hoşgeldin!**`);
}
})

//hg-bb
client.on('guildMemberAdd', member =>{
  const channel = member.guild.channels.cache.find(ch => ch.id === '826375848533164062')
  channel.send(`${member} Server\'a Hoşgeldin!`)    
})
client.on('guildMemberRemove', member =>{
  const channel = member.guild.channels.cache.find(ch => ch.id === '826375848533164062')
  channel.send(`${member} Tekrar Görüşmek Üzere!`)    
})

//const Discord = require("discord.js"); 
//const client = new Discord.Client();
const config = require('./ayarlar/config.example.js');

function doit(m, yapilacak) {
    switch(yapilacak) {
        case "sil":
            m.delete();
            break;
        case "ban":
            m.member.ban({days: 7, reason: 'Uygunsuz kelime.'});
            break;
        case "kick":
            m.member.kick({reason: 'Uygunsuz kelime.'});
            break; 
    }
}

/*
process.on('unhandledRejection', function(reason, p){
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
});
*/
client.on('message', msg => {
  if (msg.guild && config.blocked.some(word => msg.content.includes(word))) { // Eğer mesaj engellenen kelimeyi içeriyorsa,
    doit(msg, config.what2do); // Gerekeni yap.
  }
});


//botu gireceği ses kanalı
client.on("ready", () => {
  client.channels.cache.get('818734665753690143').join();
  });

 // Oynuyor Kısmı
client.on('ready', () => {
      var actvs = [
        `Eon147`,
        `Eon`, 
        '♥ A S T R ⍟ M E D A ♥',
        `${prefix}yardım`
    ];
    
    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING' });
    setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING'});
    }, 15000);
    
  
      console.log ('_________________________________________');
      console.log (`Kullanıcı İsmi     : ${client.user.username}`);
      console.log (`Sunucular          : ${client.guilds.cache.size}`);
      console.log (`Kullanıcılar       : ${client.users.cache.size}`);
      console.log (`Prefix             : ${ayarlar.prefix}`);
      console.log (`Durum              : Bot Çevrimiçi!`);
      console.log ('_________________________________________');
    
    });


client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.login(ayarlar.token);
