const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Sends a random dog picture'),
    async execute(interaction) {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();

        if (!data || !data.message) {
            return interaction.reply('Could not fetch a dog picture at this time. Try again later!');
        }

        return interaction.reply(data.message);
    },
};
