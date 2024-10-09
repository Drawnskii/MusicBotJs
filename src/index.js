// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player')
const { YoutubeiExtractor } = require('discord-player-youtubei')

const fs = require('node:fs');
const path = require('node:path');

const dotenv = require('dotenv');

dotenv.config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

// Library discord-player set up
const player = new Player(client);

player.extractors.register(YoutubeiExtractor, {});

player.extractors.loadDefault(
	(ext) => !["YouTubeExtractor"].includes(ext)
);

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const discordjsEventsPath = path.join(__dirname, 'events', 'discordjs');
const discordPlayerEventsPath = path.join(__dirname, 'events', 'discord-player');


// Load discordjs events
const discordjsEventFiles = fs.readdirSync(discordjsEventsPath).filter(file => file.endsWith('.js'));

for (const file of discordjsEventFiles) {
	const filePath = path.join(discordjsEventsPath,file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Load discord-player events
const discordPlayerEventFiles = fs.readdirSync(discordPlayerEventsPath).filter(file => file.endsWith('.js'));

for (const file of discordPlayerEventFiles) {
	const filePath = path.join(discordPlayerEventsPath, file);
	const event = require(filePath)

	player.events.on(event.name, (...args) => event.execute(...args));
}

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
