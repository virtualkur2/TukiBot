const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const giphyClient = require('../giphyClient');
const slapGifs = { q: 'slap', limit: 100 };

const slap = {
	data: new SlashCommandBuilder()
		.setName('cachetada')
		.setDescription('Sisa!')
		.addUserOption(option =>
			option.setName('source')
				.setDescription('Yunta 1'),
		)
		.addUserOption(option =>
			option.setName('target')
				.setDescription('Yunta 2'),
		),
	async execute(interaction) {
		const slaps = await giphyClient.search('gifs', slapGifs);
		const totalSlaps = slaps.data.length;
		const randomIndex = Math.floor(Math.random() * totalSlaps);
		const randomGif = new AttachmentBuilder(slaps.data[randomIndex].images.fixed_height.url);
		const source = interaction.options.getUser('source');
		const target = interaction.options.getUser('target');
		let message = 'Ja weno!';
		if (source && target) {
			message = `Mielda ${target}, tremenda cachetada te sampó ${source}.`;
		}
		if (source && !target) {
			message = `Agarra ahí ${source}, sóbese...`;
		}
		if (!source && target) {
			message = `Agarra ahí ${target}, sóbese...`;
		}
		await interaction.reply({ files: [randomGif], content: message });
	},
};

module.exports = slap;
