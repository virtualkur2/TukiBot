const { Events } = require('discord.js');

const interactionCreate = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) {
			return;
		}
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) {
			console.error(`[ERROR] No se encuentra un comando llamado ${interaction.commandName}`);
			return;
		}
		try {
			console.log(`[LOG: ${new Date().toUTCString()}] Comando recibido: ${interaction.commandName}`);
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Mielda menol, no entendí el beta!', ephemeral: true });
		}
	},
};

module.exports = interactionCreate;