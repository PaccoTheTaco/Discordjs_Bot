const { SlashCommandBuilder } = require('@discordjs/builders');

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
        await interaction.reply(`User: ${user.tag}\nJoined at: ${member.joinedAt}\nRoles: ${member.roles.cache.map(role => role.name).join(', ')}`);
    },
};
