const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Play Rock-Paper-Scissors')
        .addStringOption(option =>
            option.setName('choice')
                .setDescription('Your choice')
                .setRequired(true)
                .addChoices(
                    { name: 'rock', value: 'rock' },
                    { name: 'paper', value: 'paper' },
                    { name: 'scissors', value: 'scissors' }
                )),
    async execute(interaction) {
        const userChoice = interaction.options.getString('choice');
        const choices = ['rock', 'paper', 'scissors'];
        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        let result = '';
        let color = '';

        if (userChoice === botChoice) {
            result = 'It\'s a tie!';
            color = '#FFFFFF'; // Weiß
        } else if (
            (userChoice === 'rock' && botChoice === 'scissors') ||
            (userChoice === 'paper' && botChoice === 'rock') ||
            (userChoice === 'scissors' && botChoice === 'paper')
        ) {
            result = 'You win!';
            color = '#00FF00'; // Grün
        } else {
            result = 'You lose!';
            color = '#FF0000'; // Rot
        }

        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('Rock-Paper-Scissors')
            .addFields(
                { name: 'Your Choice', value: userChoice, inline: true },
                { name: 'Bot\'s Choice', value: botChoice, inline: true },
                { name: 'Result', value: result, inline: false }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
