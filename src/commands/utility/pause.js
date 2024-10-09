const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the current song.'),
    async execute(interaction) {
        const player = useMainPlayer();
        const queue = player.nodes.get(interaction.guild.id); // Get the queue for the current server
        const voiceChannel = interaction.member.voice.channel;

        await interaction.deferReply();

        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to pause the music!');
        }

        // Check if there's an active queue
        if (!queue) {
            return interaction.followUp('There is no active music queue in this server.');
        }

        // Check if a track is playing
        if (!queue.currentTrack) {
            return interaction.followUp('There is no song currently playing.');
        }

        try {
            const currentTrack = queue.node.current;
            queue.node.pause(); // Pause the currently playing song

            return interaction.followUp(`⏸️ **${currentTrack.title}** paused!`);
        } catch (e) {
            return interaction.followUp(`Something went wrong while trying to pause the song: ${e}`);
        }
    }
};
