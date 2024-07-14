const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Werfe eine Münze'),
    async execute(interaction) {
        const result = Math.random() < 0.5 ? 'Kopf' : 'Zahl';
        const resultEmoji = result === 'Kopf' ? '👑' : '🪙';

        const embed = new EmbedBuilder()
            .setColor('#ffcc00')
            .setTitle('🪙 Münzwurf')
            .setDescription(`Die Münze landete auf: **${result}** ${resultEmoji}`)
            .setFooter({ text: `Angefordert von ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
