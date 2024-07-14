const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('define')
        .setDescription('Gibt die Definition eines Wortes zurück.')
        .addStringOption(option =>
            option.setName('wort')
                .setDescription('Das Wort, das du definieren möchtest')
                .setRequired(true)),
    async execute(interaction) {
        const word = interaction.options.getString('wort');

        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const definitions = response.data[0].meanings[0].definitions.map(def => def.definition).join('\n');

            const embed = new EmbedBuilder()
                .setColor('#1e90ff')
                .setTitle(`Definition von ${word}`)
                .setDescription(definitions)
                .setFooter({ text: `Angefordert von ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            if (error.response && error.response.status === 404) {
                await interaction.reply(`Es wurde keine Definition für **${word}** gefunden.`);
            } else {
                console.error(error);
                await interaction.reply('Es gab einen Fehler beim Abrufen der Definition.');
            }
        }
    },
};
