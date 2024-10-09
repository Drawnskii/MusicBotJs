const { GuildQueueEvent } = require('discord-player')

module.exports = {
    name: GuildQueueEvent.Error,
    async execute(queue, error) {
        console.log(`General player error event: ${error.message}`);
        console.log(error);
    }
}

