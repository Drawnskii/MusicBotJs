const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const ping = interaction.client.ws.ping;

		const embed = new EmbedBuilder()
			.setColor(0xe2641b)
			.setDescription(`**🏓 Pong! ** ${ping}ms`);

		await interaction.reply({ embeds: [embed] });
	},
};
