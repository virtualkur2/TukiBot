const path = require('path');
const https = require('https');
// const giphyClient = require('../giphyClient');
const shuffle = require('../utils').shuffle;
const robberyGifs = {q: 'robbery fail', limit: 20, offset: 0, rating: 'PG'} // <- Muy pocos gifs

let gifData = [];

const robberyCommand = {
  name: 'robbery',
  description: 'Te tiro un quieto, menol',
  gif:{
    attachment: path.join(__dirname, 'robbery.gif'),
    name: 'robbery.gif'
  },
  async execute(message, users) {
    try {
      if(!gifData.length) {
        response = await new Promise((resolve, reject) => {
          https.get('https://omnipc.ddns.net/api/tuki/robbery', res => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            let error;
            // Any 2xx status code signals a successful response but
            // here we're only checking for 200.
            if (statusCode !== 200) {
              error = new Error('Request Failed.\n' +
                                `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
              error = new Error('Invalid content-type.\n' +
                                `Expected application/json but received ${contentType}`);
            }
            if(error) {
              console.error(error.message);
              res.resume();
              return reject(error);
            }
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', chunk => { rawData += chunk; });
            res.on('end', () => {
              try {
                const response = JSON.parse(rawData);
                console.info(`Robbery Gif's list refreshed at: ${new Date()}`);
                let files = response.data.map(fileName => `https://omnipc.ddns.net/api/tuki/${fileName}`);
                gifData = shuffle(files);
                resolve();
              } catch (e) {
                console.error(e.message);
                return reject(error);
              }
            });
          });
        });
      }
      const gif = gifData.shift();
      console.info(`Command: ${this.name}.`);
      console.info(`Extracting url from list: ${gif}`);
      console.info(`List now contains ${gifData.length} elements`);
      let msg = users[0] ? (users[1] ? `${users[0]} trató de robar a ${users[1]} y no pudo, que bolas!!!` : `Quieto ${users[0]} tas robao!!! Mielda menol, salió mal, pira pira.`) : 'Verga el mío, me caí con los kilos.';
      message.channel.send(msg, {
        files: [gif]
      });
    } catch(error) {
      console.log(error.message);
      message.channel.send(`Mensaje pal pran: ${error.message}\nArregla esta vaina, convive.`);
    }
  }
}

module.exports = robberyCommand;
