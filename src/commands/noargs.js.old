const shuffle = require('../utils').shuffle;
const cheers = [
  'KLK loco',
  'Háblame el mío',
  'Háblate lacra que lo que hay?',
  'Que pasó el mío?',
  'Si eres chigüire',
  'Te tengo un beta lacra',
  'Que lo que er mio?',
  'Que pasó llave abre cancha que le voy a reventar el güiro a esta bruja',
  'Rescata bruja',
  'Qué pasó sapo?',
  'Háblame cloro',
  'Pendiente de un beta?',
  'Habla menol',
  'Como \'ta el convive?',
  'Como tá la vaina?',
  'Qué es lo tuyo Diaablo?',
  'Qué pachó el mio tas alzado o que\' lo que?',
  'Qué paso el micri?',
  'Háblame claro ahí menol',
];
 //'Upa mami, tas miamol con te quiero, quisiera se\' mantequilla pa\' derretilme en tu bollo mi amol',

const noArgs = {
  name: 'noargs',
  description: 'Saludo malandro',
  execute(msg) {
    let saludos = shuffle([...cheers]);
    let saludo = saludos[Math.floor(Math.random() * (cheers.length - 1))];
    msg.channel.send(`${msg.author} ${saludo}`);
  }
  // execute(message, invokedBy, ignoreTime) {
  //   let invokedTimes = 0;
  //   let hasInvoked = false;
  //   invokedBy.forEach(invoker => {
  //     if(invoker.author === message.author) {
  //       invokedTimes = ++invoker.invokedTimes;
  //       hasInvoked = !hasInvoked;
  //     }
  //   });
  //   if(!hasInvoked) {
  //     invokedBy.push({
  //       author: message.author,
  //       invokedTimes: ++invokedTimes,
  //     });
  //   }
  //   switch (invokedTimes) {
  //     case 1:
  //       message.channel.send(`${message.author} KLK loco!!!`);
  //       break;
  //     case 2:
  //       message.channel.send(`${message.author} Háblame mano!!!`);
  //       break;
  //     case 3:
  //       message.channel.send(`${message.author} Ahh vaina!!!`);
  //       break;
  //     case 4:
  //       message.channel.send(`${message.author} Tu eres gafo?`);
  //       break;
  //     case 5:
  //       message.channel.send(`${message.author} Noooo bruja!!!`);
  //       invokedBy.forEach(invoker => {
  //         if(invoker === message.author) invoker.lastInvoke = Date.now();
  //       });
  //       break;
  //     default:
  //       let lastInvoke = invokedBy.filter(invoker => invoker.author === message.author)[0].lastInvoke;
  //       let ignoredTime = Date.now() - lastInvoke;
  //       if(ignoredTime > ignoreTime) {
  //         let invokerIndex = invokedBy.indexOf(message.author);
  //         invokedBy.splice(invokerIndex, 1);
  //       }
  //       break;
  //   }
  //   return;
  // }
}

module.exports = noArgs;
