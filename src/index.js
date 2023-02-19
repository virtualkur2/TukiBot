const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const botToken = process.env.DISCORD_BOT_TOKEN;
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

for(const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    continue;
  }
  console.log(`[WARNING] El comando en ${filePath} no contiene los campos "data" o "execute"`);
}

// Interactions
client.on(Events.InteractionCreate, async interaction => {
  if(!interaction.isChatInputCommand()) {
    return;
  }
  const command = interaction.client.commands.get(interaction.commandName);
  if(!command) {
    console.error(`[ERROR] No se encuentra un comando llamado ${interaction.commandName}`);
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Mielda menol, no entendí el beta!', ephemeral: true });
  }
  console.log(interaction);
});


client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(botToken);
