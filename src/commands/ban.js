const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member with a reason')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The member to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for banning')
                .setRequired(false)),
    async execute(interaction) {
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const logChannel = interaction.guild.channels.cache.find(ch => ch.name === 'log');

        if (member) {
            await member.ban({ reason });
            await interaction.reply(`${member.user.tag} has been banned for: ${reason}`);
            if (logChannel) logChannel.send(`${member.user.tag} was banned by ${interaction.user.tag} for: ${reason}`);
        } else {
            await interaction.reply('That user isn\'t in this server!', { ephemeral: true });
        }
    },
};
