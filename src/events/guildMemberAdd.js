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

        const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)].replace('{member}', `<@${member.id}>`);

        const accountCreationDate = member.user.createdAt.toDateString();

        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('Willkommen!')
            .setDescription(randomMessage)
            .addFields([{ name: 'Account erstellt am', value: accountCreationDate, inline: true }])
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({ text: `ID: ${member.id}` });

        channel.send({ embeds: [embed] });
    },
};
