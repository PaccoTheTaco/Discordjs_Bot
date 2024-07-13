const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a member with a reason and duration')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The member to timeout')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for timeout')
                .setRequired(false))
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('The duration of the timeout in minutes')
                .setRequired(true)),
    async execute(interaction) {
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const duration = interaction.options.getInteger('duration');
        const logChannel = interaction.guild.channels.cache.find(ch => ch.name === 'log');

        if (member) {
            await member.timeout(duration * 60 * 1000, reason);
            await interaction.reply(`${member.user.tag} has been timed out for ${duration} minutes for: ${reason}`);
            if (logChannel) logChannel.send(`${member.user.tag} was timed out by ${interaction.user.tag} for ${duration} minutes for: ${reason}`);
        } else {
            await interaction.reply('That user isn\'t in this server!', { ephemeral: true });
        }
    },
};
