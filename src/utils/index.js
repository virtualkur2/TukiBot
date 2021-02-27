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
    if(!message.mentions) {
      return;
    }
    return message.mentions.users.array();
  },
  shuffle: (array) => {
    if (!array || !array.length || array.length < 2) return array;
    for(let index = array.length - 1; index > 0; index--) {
      let shuffled_index = Math.floor(Math.random() * (index + 1));
      let tmp = array[index];
      array[index] = array[shuffled_index];
      array[shuffled_index] = tmp;
    }
    return array;
  }
}

module.exports = utils;
