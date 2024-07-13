const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Tell a random joke'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
            const joke = response.data;
            await interaction.reply(`${joke.setup}\n${joke.punchline}`);
        } catch (error) {
            console.error('Error:', error);
            await interaction.reply('Could not retrieve joke. Please try again.');
        }
    },
};
