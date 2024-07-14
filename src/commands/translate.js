const { SlashCommandBuilder } = require('@discordjs/builders');
const translate = require('translate-google');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translate text to a specified language')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Text to translate')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('language')
                .setDescription('Language to translate to (e.g., en, es, fr)')
                .setRequired(true)),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const language = interaction.options.getString('language');

        try {
            const res = await translate(text, { to: language });
            await interaction.reply(`Translation: ${res}`);
        } catch (error) {
            console.error('Error during translation:', error);
            await interaction.reply(`Failed to translate text. Error: ${error.message}`);
        }
    }
};
