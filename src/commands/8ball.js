const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Antwortet auf eine Ja/Nein-Frage mit einer zufälligen Antwort.')
        .addStringOption(option =>
            option.setName('frage')
                .setDescription('Die Frage, die du stellen möchtest')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('frage');

        if (!question.endsWith('?')) {
            return interaction.reply({ content: 'Bitte stelle eine gültige Ja/Nein-Frage, die mit einem Fragezeichen endet.', ephemeral: true });
        }

        const responses = [
            'Ja.',
            'Nein.',
            'Vielleicht.',
            'Es ist sicher.',
            'Frag später noch einmal.',
            'Ich weiß es nicht.',
            'Sehr wahrscheinlich.',
            'Sieht gut aus.',
            'Nicht so toll.',
            'Zweifelhaft.'
        ];

        const emojis = [
            '👍',
            '👎',
            '🤔',
            '✅',
            '⏳',
            '❓',
            '🌟',
            '✨',
            '😕',
            '❗'
        ];

        const randomIndex = Math.floor(Math.random() * responses.length);
        const response = responses[randomIndex];
        const emoji = emojis[randomIndex];

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('🎱 8ball Antwort')
            .setDescription(`${emoji} **${response}**`)
            .addFields({ name: 'Frage', value: question })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
