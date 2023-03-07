const { SlashCommandBuilder } = require('discord.js');
const shuffle = require('../utils').shuffle;

let saludosRandom = [];

const tuki = {
	data: new SlashCommandBuilder()
		.setName('tuki')
		.setDescription('Háblame, diablo'),
	async execute(interaction) {
		const saludos = [
			'Háblame',
			'Dígalo',
			'QLQ',
			'Pilas',
			'Pendiente',
			'Activo',
			'Llégate',
			'Tas claro',
			'Oído',
			'Épale',
			'Suéltalo',
			'Qué pasa',
			'Plomo',
		];
		if (!saludosRandom.length) {
			saludosRandom = shuffle(saludos);
		}
		const saludo = saludosRandom.pop();
		await interaction.reply(`${saludo} ${interaction.user}`);
	},
};

module.exports = tuki;