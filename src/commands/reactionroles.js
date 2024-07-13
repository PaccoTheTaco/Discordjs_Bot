const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

const reactionRolesPath = path.join(__dirname, '../reactionRoles.json');

function saveReactionRoles(data) {
    fs.writeFileSync(reactionRolesPath, JSON.stringify(data, null, 4));
}

function loadReactionRoles() {
    if (fs.existsSync(reactionRolesPath)) {
        const rawData = fs.readFileSync(reactionRolesPath);
        return JSON.parse(rawData);
    }
    return [];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactionrole')
        .setDescription('Fügt eine Reaktionsrolle zu einer Nachricht hinzu.')
        .addStringOption(option =>
            option.setName('messageid')
                .setDescription('Die ID der Nachricht')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('Das Emoji, das verwendet werden soll')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Die Rolle, die zugewiesen werden soll')
                .setRequired(true)),
    async execute(interaction) {
        const messageId = interaction.options.getString('messageid');
        const emoji = interaction.options.getString('emoji');
        const role = interaction.options.getRole('role');

        const channel = interaction.channel;

        try {
            const message = await channel.messages.fetch(messageId);
            await message.react(emoji);

            const reactionRoles = loadReactionRoles();

            reactionRoles.push({
                messageId: messageId,
                emoji: emoji,
                roleId: role.id,
                guildId: interaction.guild.id,
                channelId: channel.id
            });

            saveReactionRoles(reactionRoles);

            interaction.reply(`Reaktionsrolle hinzugefügt: ${emoji} -> ${role.name}`);
        } catch (error) {
            console.error(error);
            interaction.reply('Fehler beim Hinzufügen der Reaktionsrolle.');
        }
    },
};
