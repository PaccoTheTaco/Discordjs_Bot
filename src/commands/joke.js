const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Tell a random joke'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
            const joke = response.data;

            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle('Here\'s a joke for you!')
                .setDescription(`${joke.setup}\n\n||${joke.punchline}||`)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error:', error);
            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Error')
                .setDescription('Could not retrieve joke. Please try again.')
                .setTimestamp();

            await interaction.reply({ embeds: [errorEmbed] });
        }
    },
};
