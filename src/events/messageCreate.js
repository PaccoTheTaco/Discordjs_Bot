const axios = require('axios');

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
                message.channel.send(meme.url);
            } catch (error) {
                console.error('Error:', error);
                message.channel.send('Could not retrieve meme. Please try again.');
            }
        }

        if (message.content === '!serverinfo') {
            const { guild } = message;
            const { name, memberCount, createdAt } = guild;
            const owner = await guild.fetchOwner();
            const ownerTag = owner ? owner.user.tag : 'Owner not found';
            message.channel.send(`Server name: ${name}\nTotal members: ${memberCount}\nCreated at: ${createdAt}\nServer owner: ${ownerTag}`);
        }
    },
};
