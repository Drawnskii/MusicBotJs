const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the playback and disconnects the bot from the voice channel.'),
    async execute(interaction) {
        const player = useMainPlayer();
        const queue = player.nodes.get(interaction.guild.id); // Get the queue for the current server
        const voiceChannel = interaction.member.voice.channel;

        await interaction.deferReply(); // Defer the reply while processing
        
        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to stop the playback!');
        }

        // Check if there's an active queue
        if (!queue) {
            return interaction.followUp('There is no active music queue in this server.');
        }

        try {
            queue.node.stop(); // Stops the currently playing song and disconnects the bot

            return interaction.followUp('**Playback stopped and the bot has disconnected from the voice channel!** 🛑');
        } catch (e) {
            return interaction.followUp(`Something went wrong while trying to stop the playback: ${e}`);
        }
    }
};
