const utils = {
  getUserFromMention: (client, mention) => {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1);

      if (mention.startsWith('!')) {
        mention = mention.slice(1);
      }
      console.log(client.users.get(mention));
      return client.users;
    }
    return;
  },
  getMentionedUsers: (message) => {
    if (!message.mentions) {
      return;
    }
    return message.mentions.users.array();
  },
  shuffle: (arr) => {
    if (!Array.isArray(arr)) return arr;
    const array = arr.map(e => e);
    if (array.length < 2) return array;
    for (let index = array.length - 1; index > 0; index--) {
      let shuffled_index = Math.floor(Math.random() * (index + 1));
      let tmp = array[index];
      array[index] = array[shuffled_index];
      array[shuffled_index] = tmp;
    }
    return array;
  }
}

module.exports = utils;
