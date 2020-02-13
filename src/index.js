const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const { prefix, invoke } = require('../config.json');
const utils = require('./utils');
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
  console.log('I\'m ready!!!');
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
    default:
      return;
  }
  // if (command === 'ping') {
  //   client.commands.get('ping').execute(message, args);
  // }
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
