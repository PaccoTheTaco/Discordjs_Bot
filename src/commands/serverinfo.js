const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Erhalte Informationen über den Server'),
    async execute(interaction) {
        const { guild } = interaction;
        const { name, memberCount, createdAt } = guild;
        let ownerTag = 'Besitzer nicht gefunden';

        try {
            const owner = await guild.fetchOwner();
            ownerTag = owner.user.tag;
        } catch (error) {
            console.error('Fehler beim Abrufen des Besitzers:', error);
        }

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Informationen über ${name}`)
            .addFields(
                { name: 'Servername', value: name, inline: true },
                { name: 'Mitglieder insgesamt', value: `${memberCount}`, inline: true },
                { name: 'Erstellt am', value: createdAt.toDateString(), inline: false },
                { name: 'Serverbesitzer', value: ownerTag, inline: true }
            )
            .setFooter({ text: `Angefordert von ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        // Füge das Server-Icon hinzu, falls vorhanden
        if (guild.iconURL()) {
            embed.setThumbnail(guild.iconURL());
        }

        await interaction.reply({ embeds: [embed] });
    },
};
