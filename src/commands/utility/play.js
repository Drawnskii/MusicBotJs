const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a track or playlist from a given URL.')
        .addStringOption(option => 
            option.setName('query')
                .setDescription('The query of the track or playlist')
                .setAutocomplete(true)
                .setRequired(true)
        ),
    async autocompleteRun(interaction) {
        const player = useMainPlayer();
        const query = interaction.options.getString('query', true);
        
        try {
            const results = await player.search(query);
            // Check if there are any tracks available
            if (!results.tracks.length) {
                return interaction.respond([{ name: 'No results found', value: 'no_results' }]);
            }

            // Returns a list of song with their title
            return interaction.respond(
                results.tracks.slice(0, 10).map((t) => ({
                    name: t.title,
                    value: t.url
                }))
            );
        } catch {
            return interaction.respond([{ name: 'Search somthing!', value: 'no_results' }]);
        }
    },
    async execute(interaction) {
        const player = useMainPlayer();
        const query = interaction.options.getString('query');
        const searchResult = await player.search(query, { requestedBy: interaction.user });
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply('You need to be in a voice channel to play music!');
        }

        await interaction.deferReply();

        if (!searchResult.hasTracks()) {
            // Check for results for the query
            await interaction.followUp(`We found no tracks for **${query}**!`);
            return;
        }

        try {
            const result = await player.play(voiceChannel, searchResult, {
                nodeOptions: {
                    metadata: interaction
                }
            });

            // Check if a playlist was added
            if (result.playlist) {
                return interaction.followUp(`🎶 Playlist **${result.playlist.title}** added to the queue!`);
            } 
            // Check if a track was added
            else if (result.track) {
                return interaction.followUp(`🎶 Track **${result.track.title}** added to the queue!`);
            } else {
                return interaction.followUp(`❌ No valid track or playlist found!`);
            }
        } catch (error) {
            // Log the error
            console.error('Error adding playlist:', error);
            // Respond to the user only if there is no valid track or playlist
            return interaction.followUp(`An error occurred: ${error.message}. But the playlist has been added!`);
        }
    }
};
