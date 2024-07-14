const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.content === '!ping') {
            message.channel.send('Pong!');
        }

        if (message.content === '!meme') {
            try {
                const response = await axios.get('https://api.imgflip.com/get_memes');
                const memes = response.data.data.memes;
                const meme = memes[Math.floor(Math.random() * memes.length)];

                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Random Meme')
                    .setImage(meme.url)
                    .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp();

                message.channel.send({ embeds: [embed] });
            } catch (error) {
                console.error('Error:', error);
                message.channel.send('Could not retrieve meme. Please try again.');
            }
        }

        if (message.content === '!serverinfo') {
            const { guild } = message;
            const { name, memberCount, createdAt } = guild;
            let ownerTag = 'Owner not found';

            try {
                const owner = await guild.fetchOwner();
                ownerTag = owner.user.tag;
            } catch (error) {
                console.error('Error fetching owner:', error);
            }

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`${name}'s Info`)
                .addFields(
                    { name: 'Server Name', value: name, inline: true },
                    { name: 'Total Members', value: `${memberCount}`, inline: true },
                    { name: 'Created At', value: createdAt.toDateString(), inline: false },
                    { name: 'Server Owner', value: ownerTag, inline: true }
                )
                .setTimestamp();

            if (guild.iconURL()) {
                embed.setThumbnail(guild.iconURL());
            }

            message.channel.send({ embeds: [embed] });
        }
    },
};
