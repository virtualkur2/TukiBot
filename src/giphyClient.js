const Giphy = require('giphy-js-sdk-core');
const client = Giphy(process.env.GIPHY_API_KEY);

const giphyClient = {
  search: (type, queryOptions) => {return client.search(type, queryOptions);},
}

module.exports = giphyClient;
