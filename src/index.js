const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const { prefix, invoke } = require('../config.json');
const utils = require('./utils');
const events = require('./events');

const botToken = process.env.DISCORD_BOT_TOKEN;

const invokeBot = `${prefix}${invoke}`;

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

const client = new Discord.Client();

client.commands = new Discord.Collection();

for(let file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.info('I\'m ready!!!');
  console.info(`Logged in as ${client.user.tag}!`);
  console.info(`Logged Time: ${(new Date()).toUTCString()}`);
  console.log('Starting events.');
  // sayGoodBye Lois6b
  const lois = client.users.get('145845113585664000');
  const loisLeftTheBuildingAt = {
    days: [1, 2, 3, 4],
    hours: 18 + ((new Date()).getTimezoneOffset() / 60),
    minutes: 0
  }
  const sayGoodByeLois = new events.SaySomething(client, lois, loisLeftTheBuildingAt, 'goodbye');
  sayGoodByeLois.start();
  sayGoodByeLois.on('say', (tag) => {
    client.channels
      .get('633231067674968064')
      .send(`Mielda loco, el ${tag} salió pirao.`);
  });
  // wake up bitches
  const everyone = 'all';
  const wakeUpTime = {
    days: [1, 2, 3, 4, 5],
    hours: 6 + ((new Date()).getTimezoneOffset() / 60),
    minutes: Math.floor(Math.random() * 10)
  }
  const wakeUpBitches = new events.SaySomething(client, everyone, wakeUpTime, 'wakeup');
  wakeUpBitches.start();
  wakeUpBitches.on('say', (tag) => {
    if(tag && tag === 'all') {
      let msg = `A levantalse cuelda e' vagos, hay que producir. Moviendo ese culo, no quiero comiquita.`;
      console.log(`Bot says: ${msg}`);
      client.channels
        .get('633231067674968064')
        .send(msg);
    }
  })
});

const invokedBy = [];
const ignoreTime = 1000 * 60 * 5;
const slapOptions = {
  refreshGifTime : 1000 * 60 * 20,
  invokers: [],
  max: 5,
}

client.on('message', message => {
  if(!message.content.startsWith(invokeBot)|| message.author.bot) return;
  if(message.content.length > invokeBot.length && message.content.charAt(invokeBot.length) !== ' ') return;
  
  // actions to do when bot invoked
  let args = message.content.slice(invokeBot.length).split(' ');
  //remove void char
  if(!args[0]) args.shift();

  if(!args.length) {
     return client.commands.get('noargs').execute(message, invokedBy, ignoreTime);
  }
  const command = args.shift().toLowerCase();
  switch(command) {
    case 'jel':
      break;
    case 'ping':
      client.commands.get('ping').execute(message, args);
      break;
    case 'cachetada':
      const elapsed = Date.now();
      let firstSlap = true;
      slapOptions.invokers.forEach(invoker => {
        if(invoker.user === message.author) {
          firstSlap = !firstSlap;
        }
      });
      if(firstSlap) {
        slapOptions.invokers.push({
          user: message.author,
          date: Date.now(),
          count: 0,
          give: true
        });
      }
      let index = 0;
      for(let i = 0; i < slapOptions.invokers.length; i++) {
        if(slapOptions.invokers[i].user === message.author) {
          index = i;
          break;
        }
      }
      if(elapsed - slapOptions.invokers[index].date <= slapOptions.refreshGifTime) {
        if(slapOptions.invokers[index].count < slapOptions.max) {
          slapOptions.invokers[index].count++;
        } else {
          slapOptions.invokers[index].give = false;
        }
      } else {
        slapOptions.invokers[index].date = Date.now();
        slapOptions.invokers[index].count = 0;
        slapOptions.invokers[index].give = true;
      }
      if(slapOptions.invokers[index].give) {
        const user1 = utils.getUserFromMention(client, args[0]);
        const user2 = utils.getUserFromMention(client, args[1]);
        if(user1 && user1.username === 'TukiBOT') {
          if(!user2 || user2.username === 'TukiBOT') {
            return message.channel.send('Arranca de aquí diablo, ante que te meta tres tiros pa\' que seas serio.');
          }
        }
        const users = [user1, user2];
        client.commands.get('slap').execute(message, users);
      } else {
        message.channel.send('Bájale el mío, se te va a rompé la mano.');
      }
      break;
    case 'robar':
      const user1 = utils.getUserFromMention(client, args[0]);
      const user2 = utils.getUserFromMention(client, args[1]);
      if(user1 && user1.username === 'TukiBOT') {
        if(!user2 || user2.username === 'TukiBOT') {
          return message.channel.send(`${message.author} ¿Me vas a malandrear gafo? Toma, por sapo!!!`, {
            files: [client.commands.get('robbery').gif]
          });
        }
      }
      const users = [user1, user2];
      client.commands.get('robbery').execute(message, users);
      break;
    default:
      return;
  }
  // if (command === 'ping') {
  //   client.commands.get('ping').execute(message, args);
  // }
});

client.on('error', error => {
  console.error('The websocket connection encountered an error:', error);
});

client.login(botToken)
  .then(() => {

  })
  .catch(error => {
    console.error('An error occurred during login');
    console.error(error.message);
    console.log('Quitting app...');
    client.destroy();
  });

process.on('unhandledRejection', error => {
  console.log(`Error occured at: ${Date.now()}`);
  console.error('Unhandled promise rejection:', error);
});
