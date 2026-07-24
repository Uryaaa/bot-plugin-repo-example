const { nanoid } = require('nanoid');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomid')
        .setDescription('Generates a random ID using the nanoid package'),

    async execute(interaction) {
        await interaction.reply(`🎲 ${nanoid()}`);
    }
};
