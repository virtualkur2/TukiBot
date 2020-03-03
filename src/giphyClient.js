const Giphy = require('giphy-js-sdk-core');
const client = Giphy(process.env.GIPHY_API_KEY);

const giphyClient = {
  search: (type, queryOptions) => {return client.search(type, queryOptions);},
  getCategories: () => {return client.categoriesForGifs({});},
  getTermSuggestions: term => {return client.termSuggestions(term);}
}

module.exports = giphyClient;
