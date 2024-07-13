const { SlashCommandBuilder } = require('@discordjs/builders');

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

        await interaction.reply(`Server name: ${name}\nTotal members: ${memberCount}\nCreated at: ${createdAt}\nServer owner: ${ownerTag}`);
    },
};
