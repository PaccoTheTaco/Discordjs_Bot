const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Erhalte Informationen über ein GitHub-Repository')
        .addStringOption(option =>
            option.setName('owner')
                .setDescription('Besitzer des Repositorys')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('repo')
                .setDescription('Name des Repositorys')
                .setRequired(true)),
    async execute(interaction) {
        const owner = interaction.options.getString('owner');
        const repo = interaction.options.getString('repo');

        try {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
            const repoInfo = response.data;

            const embed = new EmbedBuilder()
                .setColor('#4078c0')
                .setTitle(repoInfo.full_name)
                .setURL(repoInfo.html_url)
                .setDescription(repoInfo.description || 'Keine Beschreibung verfügbar.')
                .addFields(
                    { name: '⭐ Sterne', value: repoInfo.stargazers_count.toString(), inline: true },
                    { name: '🍴 Forks', value: repoInfo.forks_count.toString(), inline: true },
                    { name: '📅 Erstellt am', value: new Date(repoInfo.created_at).toLocaleDateString(), inline: true },
                    { name: '📅 Zuletzt aktualisiert', value: new Date(repoInfo.updated_at).toLocaleDateString(), inline: true }
                )
                .setFooter({ text: `Angefordert von ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error:', error);
            await interaction.reply('Fehler beim Abrufen der Repository-Informationen. Bitte überprüfe den Besitzer und den Repository-Namen.');
        }
    }
};
