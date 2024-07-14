const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('news')
        .setDescription('Erhalte die neuesten Nachrichtenüberschriften')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Suchbegriff für Nachrichten')
                .setRequired(false)),
    async execute(interaction) {
        const query = interaction.options.getString('query') || 'latest';
        const apiKey = process.env.NEWS_API_KEY;

        if (!apiKey) {
            return interaction.reply('News API key fehlt. Bitte füge ihn in deiner .env Datei hinzu.');
        }

        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);
            let articles = response.data.articles.slice(0, 5);

            // Filtere Artikel mit "Removed" im Titel, Beschreibung oder URL und Artikel von Yahoo aus
            articles = articles.filter(article =>
                article.title.toLowerCase() !== 'removed' &&
                article.description.toLowerCase() !== 'removed' &&
                !article.url.toLowerCase().includes('removed') &&
                !article.source.name.toLowerCase().includes('yahoo')
            );

            if (articles.length === 0) {
                return interaction.reply('Keine Nachrichtenartikel gefunden.');
            }

            const embed = new EmbedBuilder()
                .setColor('#1E90FF')
                .setTitle('📰 Neueste Nachrichtenüberschriften')
                .setFooter({ text: `Angefordert von ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp();

            articles.forEach(article => {
                embed.addFields(
                    { name: article.title, value: `${article.description}\n[Mehr lesen](${article.url})` }
                );
            });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Fehler')
                .setDescription('Konnte die Nachrichten nicht abrufen. Bitte versuche es später erneut.')
                .setTimestamp();

            await interaction.reply({ embeds: [errorEmbed] });
        }
    }
};
