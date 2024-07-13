module.exports = {
    name: 'guildMemberRemove',
    execute(member) {
        const channel = member.guild.channels.cache.find(ch => ch.name === 'goodbye');
        if (!channel) return;
        channel.send(`Goodbye, ${member.displayName}. We're sad to see you go!`);
    },
};
