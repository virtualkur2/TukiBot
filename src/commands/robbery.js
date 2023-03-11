const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const axios = require('axios');
const shuffle = require('../utils').shuffle;
const baseTukiURL = 'https://omnipc.ddns.net/api/tuki/';
const messageNoGif = 'Mielda menol, me caí con los kilos';
let robberyRandom = [];

const robbery = {
  data: new SlashCommandBuilder()
    .setName('robar')
    .setDescription('Te tiro un quieto, menol')
    .addUserOption(option =>
      option.setName('source')
      .setDescription('Yunta 1')
    )
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Yunta 2')
    ),
  async execute(interaction) {
    const robberyURL = new URL('robbery', baseTukiURL).toString();
    const robberyGifs = await axios.get({
      method: 'get',
      url: robberyURL,
      responseType: 'json',
    })
    .then(response => response.data)
    .catch(e => console.error(e));
    if(!(robberyGifs && robberyGifs.length)) {
      return interaction.reply(message);
    }
    if (!robberyRandom.length) {
      robberyRandom = shuffle(robberyGifs);
    }
    const robberyImage = robberyRandom.pop();
    const robberyImageURL = new URL(robberyImage, robberyURL).toString();
    const randomRobberyGif = new AttachmentBuilder(robberyImageURL);
    let message = 'Verga el mío, me caí con los kilos!!!';
    if(target && source) {
      message = `${source} trató de robar a ${target} y no pudo, que bolas!!!`;
    }
    if((!target && source) || (source && !target)) {
      message = `Quieto ${source ?? target} tas robao!!! Mielda menol, salió mal, pira pira!!!`;
    }
    await interaction.reply({ files: [randomRobberyGif], content: message });
  }
}