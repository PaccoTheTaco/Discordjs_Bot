const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar URL of the selected user, or your own avatar')
        .addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;
        await interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
    }
};
