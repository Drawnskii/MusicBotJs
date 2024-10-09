const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumes the paused song.'),
    async execute(interaction) {
        const player = useMainPlayer();
        const queue = player.nodes.get(interaction.guild.id); // Get the queue for the current server

        await interaction.deferReply(); // Defer the reply while processing

        // Check if there's an active queue
        if (!queue) {
            return interaction.followUp('There is no active music queue in this server.');
        }

        // Check if the song is paused
        if (!queue.node.isPaused()) {
            return interaction.followUp('The song is not paused.');
        }

        try {
            const currentTrack = queue.node.current; // Get the current track
            queue.node.resume(); // Resume the currently paused song

            return interaction.followUp(`▶️ Resuming song: **${currentTrack.title}**`);
        } catch (e) {
            return interaction.followUp(`Something went wrong while trying to resume the song: ${e}`);
        }
    }
};
