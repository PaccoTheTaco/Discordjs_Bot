const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Erhalte ein zufälliges Katzenbild'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search');
            const imageUrl = response.data[0].url;

            const embed = new EmbedBuilder()
                .setColor('#ff9900')
                .setTitle('🐱 Zufälliges Katzenbild')
                .setImage(imageUrl)
                .setFooter({ text: `Angefordert von ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error:', error);
            await interaction.reply('Konnte kein Katzenbild abrufen. Bitte versuche es erneut.');
        }
    },
};
