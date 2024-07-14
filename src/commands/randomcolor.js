const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomcolor')
        .setDescription('Generiere eine zufällige Farbe'),
    async execute(interaction) {
        const color = getRandomColor();

        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('🎨 Zufällige Farbe')
            .setDescription(`Die zufällig generierte Farbe ist: **${color}**`)
            .setFooter({ text: `Angefordert von ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
