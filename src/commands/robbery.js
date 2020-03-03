const path = require('path');
const giphyClient = require('../giphyClient');
const shuffle = require('../utils').shuffle;
const robberyGifs = {q: 'robbery+fail', limit: 20} // <- Muy pocos gifs

let date = Date.now();
let gifReloadTime = 1000 * 60 * 60 * 24;
let gifData = [];
let gifIndex = 0;

const robberyCommand = {
  name: 'robbery',
  description: 'Show robbery fail gifs',
  gif:{
    attachment: path.join(__dirname, 'robbery.gif'),
    name: 'robbery.gif'
  },
  async execute(message, users) {
    const executedAt = Date.now();
    try {
      if(!gifData.length || (executedAt - date) > gifReloadTime) {
        date = Date.now();
        response = await giphyClient.search('gifs', robberyGifs);
        gifData = shuffle(response.data);
        gifIndex = 0;
      }
      if(gifIndex > gifData.length - 1) {
        gifIndex = 0;
        gifData = shuffle(gifData);
      }
      const gif = gifData[gifIndex++];
      let msg = users[0] ? (users[1] ? `${users[0]} trató de robar a ${users[1]} y no pudo, que bolas!!!` : `Quieto ${users[0]} tas robao!!! Mielda menol, salió mal, pira pira.`) : 'Verga el mío, me caí con los kilos.';
      message.channel.send(msg, {
        files: [gif.images.fixed_height.url]
      });
    } catch(error) {
      console.log(error.message);
      message.channel.send(`Mensaje pal pran: ${error.message}\nArregla esta vaina, convive.`);
    }
  }
}

module.exports = robberyCommand;
