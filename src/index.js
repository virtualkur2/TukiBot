const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const { prefix, invoke } = require('../config.json');
const botToken = process.env.DISCORD_BOT_TOKEN;

const invokeBot = `${prefix}${invoke}`;

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file => file.endsWith('.js'));

console.log(commandFiles);

const client = new Discord.Client();
client.commands = new Discord.Collection();;

for(file of commandFiles) {
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
  let args = message.content.slice(prefix.length).split(/ +/);
  args.shift();
  if(!args.length) {
     return client.commands.get('noargs').execute(message, invokedBy, ignoreTime);
  }
  const command = args.shift().toLowerCase();
  if (command === 'ping') {
    client.commands.get('ping').execute(message, args);
  }
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
