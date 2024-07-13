const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Get information about the server'),
    async execute(interaction) {
        const { guild } = interaction;
        const { name, memberCount, createdAt } = guild;
        let ownerTag = 'Owner not found';

        try {
            const owner = await guild.fetchOwner();
            ownerTag = owner.user.tag;
        } catch (error) {
            console.error('Error fetching owner:', error);
        }

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${name}'s Info`)
            .addFields(
                { name: 'Server Name', value: name, inline: true },
                { name: 'Total Members', value: `${memberCount}`, inline: true },
                { name: 'Created At', value: createdAt.toDateString(), inline: false },
                { name: 'Server Owner', value: ownerTag, inline: true }
            )
            .setTimestamp();

        // Add the server icon if it exists
        if (guild.iconURL()) {
            embed.setThumbnail(guild.iconURL());
        }

        await interaction.reply({ embeds: [embed] });
    },
};
