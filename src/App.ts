import {Client} from "discord.js";

import ConfigManager from "src/managers/ConfigManager";
import ModuleManager from "src/managers/ModuleManager";

export default class App extends Client {
    public modules: ModuleManager;
    public config: ConfigManager;

    public main(): void {
        this.modules = new ModuleManager(this);
        this.config = new ConfigManager();

        ConfigManager.parseAppConfig().then((config) => {
            void this.login(config.token.discord);
        });

        void this.modules.loadModules();
    }
}

