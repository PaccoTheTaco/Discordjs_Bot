const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Erzähle einen zufälligen Witz'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
            const joke = response.data;

            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle('Hier ist ein Witz für dich!')
                .setDescription(`${joke.setup}\n\n||${joke.punchline}||`)
                .setFooter({ text: `Angefordert von ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error:', error);
            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Fehler')
                .setDescription('Konnte keinen Witz abrufen. Bitte versuche es erneut.')
                .setTimestamp();

            await interaction.reply({ embeds: [errorEmbed] });
        }
    },
};
