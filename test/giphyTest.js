require('dotenv').config();
const giphyClient = require('../src/giphyClient');

const search = giphyClient.search;
const getCategories = giphyClient.getCategories;
const getTermSuggestions = giphyClient.getTermSuggestions;
// getCategories()
//.then(res => {
//   console.log(res);
// })
// .catch(console.error);

// getTermSuggestions('robbery fail')
// .then(res => {
//   console.log(res);
// })
// .catch(console.error);
const term = 'robbery+fail';
const options = {q: term, limit: 20}

search('gifs', options)
.then(response => {
  console.log(response.data);
})
.catch(console.error);
testURL = 'https://api.giphy.com/v1/gifs/search?api_key=lF8tHgZuPCie3gXNRIWvX24sNQDCARSx&q=robbery+fails&limit=100';
robberyUrls = [
  'https://media2.giphy.com/media/5UrRVfvaQnBzHhnhu0/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media3.giphy.com/media/xGdytyLZKnXby/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media0.giphy.com/media/UXSB8HYbpLQNq/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media0.giphy.com/media/53zb5c7rRGRAk/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media0.giphy.com/media/LOhibRPKjgQZW/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media1.giphy.com/media/TLEWkD1I4TAzK/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media0.giphy.com/media/WavWUAKK6g9C8/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media2.giphy.com/media/XLMXnsAFzOgpO/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media3.giphy.com/media/XVklpe11msVuU/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media2.giphy.com/media/Apu6SgcK7blhS/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media1.giphy.com/media/sohUXhFTJGiys/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media2.giphy.com/media/MU1VyQ6AwTt16/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media2.giphy.com/media/SL5SpC5eLE96U/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media1.giphy.com/media/EK7D0QnesPEWI/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media2.giphy.com/media/M1K6W0fFEwQ4o/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media2.giphy.com/media/dF1WDGflOnYPK/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
  'https://media1.giphy.com/media/33Hvut3YRXyX65jDQo/200.gif?cid=c63486e54cd82be9d8308d544051d466e2d37e06f77973a9&rid=200.gif',
]