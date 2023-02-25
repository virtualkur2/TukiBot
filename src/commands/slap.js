const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const giphyClient = require('../giphyClient');
const slapGifs = {q: 'slap', limit: 100};

const slap = {
  data: new SlashCommandBuilder()
    .setName('cachetada')
    .setDescription('Sisa!')
    .addUserOption(option =>
      option.setName('source')
      .setDescription('Yunta 1')
    )
    .addUserOption(option =>
      option.setName('target')
      .setDescription('Yunta 2')
    ),
  async execute(interaction) {
    const slaps = await giphyClient.search('gifs', slapGifs);
    const totalSlaps = slaps.data.length;
    const randomIndex = Math.floor(Math.random()*totalSlaps);
    const randomGif = new AttachmentBuilder(slaps.data[randomIndex].images.fixed_height.url);
    const source = interaction.options.getUser('source');
    const target = interaction.options.getUser('target');
    const message = source && target ?
      `Mielda ${target}, tremenda cachetada te sampó ${source}.` :
      source && !target ?
      `Agarra ahí ${source}, sóbese..` :
      !source && target ?
      `Agarra ahí ${target}, sóbese..` :
      `Ja weno!`;
    await interaction.reply({files: [randomGif], message: message});
  }
}

module.exports = slap;
