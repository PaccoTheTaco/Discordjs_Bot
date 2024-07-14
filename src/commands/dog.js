const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Sendet ein zufälliges Hundebild'),
    async execute(interaction) {
        const fetch = (await import('node-fetch')).default;
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();

            if (!data || !data.message) {
                return interaction.reply('Konnte kein Hundebild abrufen. Bitte versuche es später erneut!');
            }

            const embed = new EmbedBuilder()
                .setColor('#ff9900')
                .setTitle('🐶 Zufälliges Hundebild')
                .setImage(data.message)
                .setFooter({ text: `Angefordert von ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error:', error);
            await interaction.reply('Es gab einen Fehler beim Abrufen des Hundebildes. Bitte versuche es später erneut.');
        }
    },
};
