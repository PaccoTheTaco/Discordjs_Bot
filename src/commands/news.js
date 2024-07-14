const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('news')
        .setDescription('Get the latest news headlines')
        .addStringOption(option => option.setName('query').setDescription('Search term for news').setRequired(false)),
    async execute(interaction) {
        const query = interaction.options.getString('query') || 'latest';
        const apiKey = process.env.NEWS_API_KEY;

        if (!apiKey) {
            return interaction.reply('News API key is missing. Please add it to your .env file.');
        }

        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);
            let articles = response.data.articles.slice(0, 5);

            // Filter out articles with "Removed" in the title, description, or URL, and articles from Yahoo
            articles = articles.filter(article =>
                article.title.toLowerCase() !== 'removed' &&
                article.description.toLowerCase() !== 'removed' &&
                !article.url.toLowerCase().includes('removed') &&
                !article.source.name.toLowerCase().includes('yahoo')
            );

            if (articles.length === 0) {
                return interaction.reply('No news articles found.');
            }

            const newsMessage = articles.map(article => `**${article.title}**\n${article.description}\n<${article.url}>`).join('\n\n');
            await interaction.reply(`**Latest news headlines:**\n\n${newsMessage}`);
        } catch (error) {
            console.error(error);
            await interaction.reply('Failed to fetch news.');
        }
    }
};
