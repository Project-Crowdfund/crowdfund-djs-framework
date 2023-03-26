import App from "src/App";

import * as Discord from 'discord.js';

const app = new App({intents: Discord.GatewayIntentBits.Guilds});

function initializeBot() {
    app.main();
}

initializeBot();
