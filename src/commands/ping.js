const pingCommand = {
  name: 'ping',
  description: 'Ja weno',
  execute(message, args) {
    message.channel.send('Ay vaaaale, este quiere pinga.');
  }
}

module.exports = pingCommand;
