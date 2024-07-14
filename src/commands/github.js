const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Get information about a GitHub repository')
        .addStringOption(option => option.setName('owner').setDescription('Owner of the repository').setRequired(true))
        .addStringOption(option => option.setName('repo').setDescription('Name of the repository').setRequired(true)),
    async execute(interaction) {
        const owner = interaction.options.getString('owner');
        const repo = interaction.options.getString('repo');

        try {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
            const repoInfo = response.data;
            await interaction.reply(`Repository: ${repoInfo.full_name}\nDescription: ${repoInfo.description}\nStars: ${repoInfo.stargazers_count}\nForks: ${repoInfo.forks_count}\nURL: ${repoInfo.html_url}`);
        } catch (error) {
            await interaction.reply('Failed to fetch repository information.');
        }
    }
};
