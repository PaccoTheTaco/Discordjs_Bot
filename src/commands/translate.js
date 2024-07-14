const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const translate = require('translate-google');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Übersetze Text in eine angegebene Sprache')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Zu übersetzender Text')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('language')
                .setDescription('Sprache, in die übersetzt werden soll (z.B., en, es, fr)')
                .setRequired(true)),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const language = interaction.options.getString('language');

        try {
            const translatedText = await translate(text, { to: language });

            const embed = new EmbedBuilder()
                .setColor('#1E90FF')
                .setTitle('🌐 Übersetzung')
                .addFields(
                    { name: 'Originaltext', value: text },
                    { name: 'Übersetzt in', value: language },
                    { name: 'Übersetzung', value: translatedText }
                )
                .setFooter({ text: `Angefordert von ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Fehler bei der Übersetzung:', error);

            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Fehler')
                .setDescription(`Fehler bei der Übersetzung des Textes. Fehler: ${error.message}`)
                .setTimestamp();

            await interaction.reply({ embeds: [errorEmbed] });
        }
    }
};
