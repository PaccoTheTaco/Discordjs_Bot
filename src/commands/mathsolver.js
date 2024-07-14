const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { evaluate } = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mathsolver')
        .setDescription('Löse einen mathematischen Ausdruck')
        .addStringOption(option =>
            option.setName('expression')
                .setDescription('Mathematischer Ausdruck, der gelöst werden soll')
                .setRequired(true)),
    async execute(interaction) {
        const expression = interaction.options.getString('expression');

        try {
            const result = evaluate(expression);

            const embed = new EmbedBuilder()
                .setColor('#00FF00')
                .setTitle('🧮 Math Solver')
                .addFields(
                    { name: 'Ausdruck', value: `\`${expression}\`` },
                    { name: 'Ergebnis', value: `\`${result}\`` }
                )
                .setFooter({ text: `Angefordert von ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error:', error);

            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Fehler')
                .setDescription('Konnte den Ausdruck nicht lösen. Bitte überprüfe die Syntax und versuche es erneut.')
                .setTimestamp();

            await interaction.reply({ embeds: [errorEmbed] });
        }
    }
};
