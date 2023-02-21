const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const botToken = process.env.DISCORD_BOT_TOKEN;
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Register events
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	const handler = (...args) => event.execute(...args);
	if (event.once) {
		client.once(event.name, handler);
	}
	else {
		client.on(event.name, handler);
	}
}


// Register commands
client.commands = new Collection();
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
		continue;
	}
	console.log(`[WARNING] El comando en ${filePath} no contiene los campos "data" o "execute"`);
}

client.login(botToken);
