const fs = require('fs');
const path = require('path');

const reactionRolesPath = path.join(__dirname, '../reactionRoles.json');

function loadReactionRoles() {
    if (fs.existsSync(reactionRolesPath)) {
        const rawData = fs.readFileSync(reactionRolesPath);
        return JSON.parse(rawData);
    }
    return [];
}

module.exports = {
    name: 'messageReactionAdd',
    async execute(reaction, user, client) {
        if (user.bot) return;

        const reactionRoles = loadReactionRoles();

        const roleData = reactionRoles.find(r =>
            r.messageId === reaction.message.id &&
            r.emoji === reaction.emoji.name &&
            r.guildId === reaction.message.guild.id &&
            r.channelId === reaction.message.channel.id
        );

        if (roleData) {
            const role = reaction.message.guild.roles.cache.get(roleData.roleId);
            const member = reaction.message.guild.members.cache.get(user.id);
            const botMember = reaction.message.guild.members.cache.get(client.user.id);

            if (!role || !member || !botMember) return;

            if (!botMember.permissions.has('MANAGE_ROLES') || role.position >= botMember.roles.highest.position) {
                return user.send({
                    embeds: [{
                        color: 0xff0000,
                        title: 'Fehler!',
                        description: `Ich habe nicht die Berechtigung, die Rolle **${role.name}** hinzuzufügen.`,
                        timestamp: new Date(),
                        footer: {
                            text: `Server: ${reaction.message.guild.name}`
                        }
                    }]
                });
            }

            try {
                await member.roles.add(role);
                user.send({
                    embeds: [{
                        color: 0x00ff00,
                        title: 'Rolle hinzugefügt!',
                        description: `Du hast die Rolle **${role.name}** auf dem Server **${reaction.message.guild.name}** erhalten.`,
                        timestamp: new Date(),
                        footer: {
                            text: `Server: ${reaction.message.guild.name}`
                        }
                    }]
                });
            } catch (error) {
                console.error(error);
            }
        }
    },
};
