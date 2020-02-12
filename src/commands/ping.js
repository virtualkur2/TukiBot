const pingCommand = {
  name: 'ping',
  description: 'Ping!',
  execute(message, args) {
    message.channel.send('Ay vaaaale, este quiere pinga.');
  }
}

module.exports = pingCommand;
