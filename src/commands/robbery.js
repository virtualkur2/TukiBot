const path = require('path');
const giphyClient = require('../giphyClient');
const shuffle = require('../utils').shuffle;
const robberyGifs = {q: 'robbery fail', limit: 20, offset: 0, rating: 'PG'} // <- Muy pocos gifs

let gifData = [];

const robberyCommand = {
  name: 'robbery',
  description: 'Show robbery fail gifs',
  gif:{
    attachment: path.join(__dirname, 'robbery.gif'),
    name: 'robbery.gif'
  },
  async execute(message, users) {
    try {
      if(!gifData.length) {
        response = await giphyClient.search('gifs', robberyGifs);
        console.info(`Robbery Gif's list refreshed at: ${new Date()}`);
        gifData = shuffle(response.data);
      }
      const gif = gifData.shift();
      console.info(`Command: ${this.name}.`);
      console.info(`Extracting url from list: ${gif.images.fixed_height.url}.`);
      console.info(`List now contains ${gifData.length} elements`);
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
