const { EmbedBuilder } = require('discord.js');

const goodbyeMessages = [
    "Goodbye, {member.displayName}. We're sad to see you go!",
    "Farewell, {member.displayName}. You'll be missed!",
    "{member.displayName}, we hope to see you again!",
    "It's hard to say goodbye, {member.displayName}. Take care!",
    "So long, {member.displayName}. Thanks for being with us!"
];

module.exports = {
    name: 'guildMemberRemove',
    execute(member) {
        const channel = member.guild.channels.cache.find(ch => ch.name === 'goodbye');
        if (!channel) return;

        const randomMessage = goodbyeMessages[Math.floor(Math.random() * goodbyeMessages.length)].replace('{member.displayName}', member.displayName);

        const joinDate = member.joinedAt;
        const leaveDate = new Date();
        const duration = Math.floor((leaveDate - joinDate) / (1000 * 60 * 60 * 24)); // Dauer in Tagen

        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('Auf Wiedersehen!')
            .setDescription(randomMessage)
            .addFields(
                { name: 'Mitglied seit', value: joinDate.toDateString(), inline: true },
                { name: 'Tage auf dem Server', value: `${duration} Tage`, inline: true }
            )
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({ text: `ID: ${member.id}` });

        channel.send({ embeds: [embed] });
    },
};
