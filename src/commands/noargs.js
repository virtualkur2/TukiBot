const noArgs = {
  name: 'noargs',
  description: 'No Arguments command',
  execute(message, invokedBy, ignoreTime) {
    let invokedTimes = 0;
    let hasInvoked = false;
    invokedBy.forEach(invoker => {
      if(invoker.author === message.author) {
        invokedTimes = ++invoker.invokedTimes;
        hasInvoked = !hasInvoked;
      }
    });
    if(!hasInvoked) {
      invokedBy.push({
        author: message.author,
        invokedTimes: ++invokedTimes,
      });
    }
    switch (invokedTimes) {
      case 1:
        message.channel.send(`${message.author} QLQ loco!!!`);
        break;
      case 2:
        message.channel.send(`${message.author} Háblame!!!`);
        break;
      case 3:
        message.channel.send(`${message.author} Ahh vaina!!!`);
        break;
      case 4:
        message.channel.send(`${message.author} Tu eres gafo?`);
        break;
      case 5:
        message.channel.send(`${message.author} Noooo bruja!!!`);
        invokedBy.forEach(invoker => {
          if(invoker === message.author) invoker.lastInvoke = Date.now();
        });
        break;
      default:
        let lastInvoke = invokedBy.filter(invoker => invoker.author === message.author)[0].lastInvoke;
        let ignoredTime = Date.now() - lastInvoke;
        if(ignoredTime > ignoreTime) {
          let invokerIndex = invokedBy.indexOf(message.author);
          invokedBy.splice(invokerIndex, 1);
        }
        break;
    }
    return;
  }
}

module.exports = noArgs;