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
      const user1 = utils.getUserFromMention(client, args[0]);
      const user2 = utils.getUserFromMention(client, args[1]);
      const users = [user1, user2];
      client.commands.get('slap').execute(message, users);
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
