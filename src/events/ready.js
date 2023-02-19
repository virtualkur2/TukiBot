const { Events } = require('discord.js');

const ready = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.info('I\'m ready!!!');
    console.info(`Logged in as ${client.user.tag}!`);
    console.info(`Logged Time: ${(new Date()).toUTCString()}`);
  }
}

module.exports = ready;