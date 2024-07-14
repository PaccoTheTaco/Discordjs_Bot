const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Erhalte Informationen über einen Benutzer')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Der Benutzer, über den Informationen abgerufen werden sollen')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);

        const roles = member.roles.cache
            .filter(role => role.name !== '@everyone')
            .map(role => role.name)
            .join(', ') || 'Keine';

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${user.tag}'s Info`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Benutzertag', value: user.tag, inline: false },
                { name: 'Beigetreten am', value: member.joinedAt.toDateString(), inline: true },
                { name: 'Konto erstellt am', value: user.createdAt.toDateString(), inline: true },
                { name: 'Rollen', value: roles, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: `ID: ${user.id}` });

        await interaction.reply({ embeds: [embed] });
    },
};
