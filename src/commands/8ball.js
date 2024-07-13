const { SlashCommandBuilder } = require('@discordjs/builders');

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

        const response = responses[Math.floor(Math.random() * responses.length)];
        await interaction.reply(response);
    },
};
