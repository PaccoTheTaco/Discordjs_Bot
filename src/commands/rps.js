const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Spiele Schere-Stein-Papier')
        .addStringOption(option =>
            option.setName('choice')
                .setDescription('Deine Wahl')
                .setRequired(true)
                .addChoices(
                    { name: 'Stein', value: 'rock' },
                    { name: 'Papier', value: 'paper' },
                    { name: 'Schere', value: 'scissors' }
                )),
    async execute(interaction) {
        const userChoice = interaction.options.getString('choice');
        const choices = ['rock', 'paper', 'scissors'];
        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        let result = '';
        let color = '';

        if (userChoice === botChoice) {
            result = 'Unentschieden!';
            color = '#FFFF00'; // Gelb
        } else if (
            (userChoice === 'rock' && botChoice === 'scissors') ||
            (userChoice === 'paper' && botChoice === 'rock') ||
            (userChoice === 'scissors' && botChoice === 'paper')
        ) {
            result = 'Du gewinnst!';
            color = '#00FF00'; // Grün
        } else {
            result = 'Du verlierst!';
            color = '#FF0000'; // Rot
        }

        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('🪨📄✂️ Schere-Stein-Papier')
            .addFields(
                { name: 'Deine Wahl', value: userChoice.charAt(0).toUpperCase() + userChoice.slice(1), inline: true },
                { name: 'Wahl des Bots', value: botChoice.charAt(0).toUpperCase() + botChoice.slice(1), inline: true },
                { name: 'Ergebnis', value: result, inline: false }
            )
            .setFooter({ text: `Angefordert von ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
