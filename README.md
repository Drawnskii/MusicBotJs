# 🎶 Music Bot for Discord 🎵

**Description:**  
A powerful and user-friendly music bot for Discord that allows users to play, pause, skip, and manage music tracks seamlessly within voice channels. This bot leverages the capabilities of the Discord.js and Discord Player libraries to deliver an exceptional audio experience.

## Features:

- **Play Tracks:** Play individual tracks or entire playlists from various sources (YouTube, Spotify, SoundCloud, etc.).
- **Playback Controls:** Play, pause, resume, and stop playback with simple commands.
- **Voice Channel Support:** Join and leave voice channels automatically based on user commands.
- **Autocompletion:** Enjoy autocompletion for track searches to enhance user experience.
- **Customizable Commands:** Extend functionality with custom commands as needed.

## Getting Started:

1. **Installation:**
   - Clone the repository: `git clone https://github.com/Drawnskii/MusicBotJs.git`
   - Navigate to the project directory: `cd MusicBotJs`
   - Install dependencies: `npm install`

2. **Configuration:**
   - Create a `.env` file in the root directory and set your Discord bot token and other necessary environment variables.
   - Example:
     ```
     DISCORD_TOKEN=YOUR_BOT_TOKEN
     CLIENT_ID=BOT_CLIENT_ID
     GUILD_ID=YOUR_SERVER_ID
     ```

3. **Run the Bot:**
   - Start the bot: `node src/index.js`

## Commands:

- `/play [query]` - Plays a track or playlist from the provided URL or query.
- `/stop` - Stops the current playback.
- `/pause` - Pauses the current track.
- `/resume` - Resumes the paused track.
- `/skip` - Skips to the next track in the queue.
- `/queue` - Displays the current music queue.

## Contributing:

Contributions are welcome! Please feel free to submit issues or pull requests.

## License:

This project is licensed under the MIT License.
