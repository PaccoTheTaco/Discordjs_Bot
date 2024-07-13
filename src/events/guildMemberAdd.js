const { EmbedBuilder } = require('discord.js');

const welcomeMessages = [
    "Welcome to the server, {member}!",
    "Glad to have you here, {member}!",
    "Hey {member}, welcome aboard!",
    "It's great to see you, {member}!",
    "{member}, you've joined the best server ever!"
];

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
        if (!channel) return;

        const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)].replace('{member}', member);

        const accountCreationDate = member.user.createdAt.toDateString();

        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('Welcome!')
            .setDescription(randomMessage)
            .addFields([{ name: 'Account created on', value: accountCreationDate, inline: true }])
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();

        channel.send({ embeds: [embed] });
    },
};
