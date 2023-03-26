const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');
const shuffle = require('../utils').shuffle;
const messageNoGif = 'Mielda menol, me caí con los kilos';
let robberyRandom = [];

const robbery = {
	data: new SlashCommandBuilder()
		.setName('robar')
		.setDescription('Te tiro un quieto, menol')
		.addUserOption(option =>
			option.setName('source')
				.setDescription('Yunta 1'),
		)
		.addUserOption(option =>
			option.setName('target')
				.setDescription('Yunta 2'),
		),
	async execute(interaction) {
		const source = interaction.options.getUser('source');
		const target = interaction.options.getUser('target');
		const robberyPath = path.join(__dirname, '../assets/robbery');
		const robberyGifs = fs.readdirSync(robberyPath).filter(file => file.endsWith('.gif'));
		if (!(robberyGifs && robberyGifs.length)) {
			return interaction.reply(messageNoGif);
		}
		if (!robberyRandom.length) {
			robberyRandom = shuffle(robberyGifs);
		}
		const robberyImage = robberyRandom.pop();
		const robberyImageURL = path.join(robberyPath, robberyImage);
		const randomRobberyGif = new AttachmentBuilder(robberyImageURL);
		let message = 'Verga el mío, me caí con los kilos!!!';
		if (target && source) {
			message = `${source} trató de robar a ${target} y no pudo, que bolas!!!`;
		}
		if ((target && !source) || (source && !target)) {
			message = `Quieto ${source ?? target} tas robao!!! Mielda menol, salió mal, pira pira!!!`;
		}
		await interaction.reply({ files: [randomRobberyGif], content: message });
	},
};

module.exports = robbery;
