const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Get information about a user')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to get information about')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);

        const roles = member.roles.cache
            .filter(role => role.name !== '@everyone')
            .map(role => role.name)
            .join(', ') || 'None';

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${user.tag}'s Info`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'User Tag', value: user.tag, inline: false },
                { name: 'Joined Server', value: member.joinedAt.toDateString(), inline: true },
                { name: 'Account Created', value: user.createdAt.toDateString(), inline: true },
                { name: 'Roles', value: roles, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: `ID: ${user.id}` });

        await interaction.reply({ embeds: [embed] });
    },
};
