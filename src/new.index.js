const { Client, Intents, Collection } = require('discord.js');
require('dotenv').config();

const botToken = process.env.DISCORD_BOT_TOKEN;

let intents = new Intents(Intents.NON_PRIVILEGED);
const client = new Client({intents: intents});
