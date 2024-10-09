const { GuildQueueEvent } = require('discord-player')

module.exports = {
    name: GuildQueueEvent.PlayerStart,
    async execute(queue, track) {
        queue.metadata.channel.send(`Started playing **${track.title}**!`);
    }
}

