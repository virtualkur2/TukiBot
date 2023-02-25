const { SlashCommandBuilder } = require('discord.js');
const shuffle = require('../utils').shuffle;

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
];

const tuki = {
	data: new SlashCommandBuilder()
		.setName('tuki')
		.setDescription('Háblame, diablo'),
	async execute(interaction) {
		const saludo = shuffle(saludos)[0];
		await interaction.reply(`${saludo} ${interaction.user}`);
	},
};

module.exports = tuki;