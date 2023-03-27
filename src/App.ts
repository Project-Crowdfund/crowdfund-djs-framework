import {Client, ClientOptions} from "discord.js";

import ConfigManager from "./managers/ConfigManager";
import ModuleManager from "./managers/ModuleManager";
import CommandManager from "./managers/CommandManager";

export default class App extends Client {
    public modules: ModuleManager;
    public config: ConfigManager;
    public commands: CommandManager;

    public constructor(opt: ClientOptions) {
        super(opt);

        this.modules = new ModuleManager(this);
        this.config = new ConfigManager();
        this.commands = new CommandManager(this);
    }

    public main(): void {
        ConfigManager.parseAppConfig().then((config) => {
            void this.login(config.token.discord);
            this.config.app = config;
        });

        void this.modules.loadModules();
    }
}

