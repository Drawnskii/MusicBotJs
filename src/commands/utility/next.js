const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('next')
        .setDescription('Jumps to the next song.'),
    async execute(interaction) {
        const player = useMainPlayer();
        const queue = player.nodes.get(interaction.guild.id); // Get the queue for the current server
        const voiceChannel = interaction.member.voice.channel;

        await interaction.deferReply(); // Defer the reply while processing

        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to play the next track!');
        }

        // Check if there's an active queue
        if (!queue) {
            return interaction.followUp('There is no active music queue in this server.');
        }

        try {
            const currentTrack = queue.node.current;
            const track = queue.history.next(); // Resume the currently paused song

            return interaction.followUp(`⏭️ Now playing the next track: **${currentTrack.title}**!`);
        } catch (e) {
            return interaction.followUp(`Something went wrong while trying to resume the song: ${e}`);
        }
    }
};
