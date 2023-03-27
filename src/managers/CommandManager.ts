import {Collection, RouteLike, Routes, Snowflake} from "discord.js";

import App from '../App';
import {BaseCommand} from "../classes/module/CommandModule";
import ConfigManager from "../managers/ConfigManager";

export default class CommandManager extends Collection<string, BaseCommand> {
    protected client: App;

    public constructor(client: App) {
        super();
        this.client = client;
    }

    public async setCommand(slashCommand: Array<BaseCommand> | BaseCommand) {
        if (Array.isArray(slashCommand)) {
            for (const command of slashCommand) {
                super.set(command.data.name, command);
            }
            return;
        }
        super.set(slashCommand.data.name, slashCommand);
    }

    private async _register(route: string) {
        const commands: Array<any> = [];
        const rest = this.client.rest;

        await this.forEach(({data}) => {
            commands.push(data.toJSON());
        })

        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            await rest.put(<RouteLike>route, { body: commands });

            console.log(`Finished refreshing ${commands.length} application (/) commands.`);
        } catch (error) {
            console.error(`Could not refresh ${commands.length} application (/) commands.\n\n${error}`);
        }
    }

    public async registerToGuild(id: Snowflake) {
        if (!this.client.config.app) this.client.config.app = await ConfigManager.parseAppConfig();
        await this._register(Routes.applicationGuildCommands(this.client.config.app.token["discord-client-id"], id));
    }

    public async registerToAll() {
        if (!this.client.config.app) this.client.config.app = await ConfigManager.parseAppConfig();
        await this._register(Routes.applicationCommands(this.client.config.app.token["discord-client-id"]))
    }
}