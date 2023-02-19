const giphyClient = require('../giphyClient');
const slapGifs = {q: 'slap', limit: 100};
let count = 0;
const slapCommand = {
  name: 'slap',
  description: 'Te mete senda cachetada',
  execute(message, users) {
    count++;
    console.log(count);
    giphyClient.search('gifs', slapGifs)
      .then(response => {
        const totalResponses = response.data.length;
        const randomIndex = Math.floor(Math.random()*totalResponses);
        const randomGif = response.data[randomIndex];
        console.log(users[0]);
        let msg = users[0] ? (users[1] ? `Mielda ${users[1]}, tremenda cachetada te sampó ${users[0]}.` : `Agarra ahí ${users[0]}, sóbese.`) : 'Ja weno.';
        message.channel.send(msg, {
          files: [randomGif.images.fixed_height.url]
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  }
}

module.exports = slapCommand;
