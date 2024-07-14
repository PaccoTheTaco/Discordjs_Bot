const { SlashCommandBuilder } = require('@discordjs/builders');
const { evaluate } = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mathsolver')
        .setDescription('Solve a mathematical expression')
        .addStringOption(option => option.setName('expression').setDescription('Mathematical expression to solve').setRequired(true)),
    async execute(interaction) {
        const expression = interaction.options.getString('expression');

        try {
            const result = evaluate(expression);
            await interaction.reply(`Result: ${result}`);
        } catch (error) {
            await interaction.reply('Failed to solve the expression.');
        }
    }
};
