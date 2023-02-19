const { SlashCommandBuilder } = require('discord.js');

const ping = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ja weno'),
  async execute(interaction) {
    await interaction.reply('Ay vaaaale, este quiere pinga.');
  }
}

module.exports = ping;
