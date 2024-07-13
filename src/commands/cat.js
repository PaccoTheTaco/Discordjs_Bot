const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Get a random cat picture'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search');
            const imageUrl = response.data[0].url;
            await interaction.reply({ files: [imageUrl] });
        } catch (error) {
            console.error('Error:', error);
            await interaction.reply('Could not retrieve cat picture. Please try again.');
        }
    },
};
