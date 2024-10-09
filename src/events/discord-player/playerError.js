const { GuildQueueEvent } = require('discord-player')

module.exports = {
    name: GuildQueueEvent.playerError,
    async execute(queue, error) {
        console.log(`Player error event: ${error.message}`);
        console.log(error);
    }
}

