import App from "./App";

import * as Discord from 'discord.js';

const app = new App({intents: Discord.GatewayIntentBits.Guilds});

function initializeBot() {
    app.main();
}

initializeBot();
