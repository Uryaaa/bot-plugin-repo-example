const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('example')
        .setDescription('An example plugin command'),

    async execute(interaction) {
        await interaction.reply('Hello from an installed plugin! 👋');
    }
};
