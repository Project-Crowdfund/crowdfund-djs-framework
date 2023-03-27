import {Interaction, SlashCommandBuilder} from "discord.js";

import BaseModule, {ModuleOptions} from '../../classes/BaseModule';
import CommandManager from "../../managers/CommandManager";
import App from "../../App";

/**
 * Implementation of this abstract class is up to the module creator. Within the constructor, you can simply pass through
 * an array of objects that implements `BaseCommand`.
 *
 * However, it is up to you how you wish to implement it. As long as you push to the commands array *before* the
 * `this.enableCommands()` is called, your command should be in the `CommandManager` (which extends `Discord.Collection`).
 *
 * You can control when `enableCommands()` is called by overriding the `initialize()` function.
 */
export default abstract class CommandModule extends BaseModule {
    public readonly commands: Array<BaseCommand>;

    protected constructor(opt: ModuleOptions, commands?: Array<BaseCommand>) {
        super(opt);
        this.commands = commands || []; /* Let the module creator decide how they want to create and integrate commands. */
    }

    protected async enableCommands(manager: CommandManager) {
        await manager.setCommand(this.commands);
    }

    protected async disableCommands(manager: CommandManager) {
        for (const command of this.commands) manager.delete(command.data.name);
    }

    public initialize(client: App) {
        void this.enableCommands(client.commands);
    }

    public destroy(client: App) {
        void this.disableCommands(client.commands);
    }
}

/***
 * This interface can be implemented by anyone, and the provided command class is only for reference.
 *
 * This framework is meant to be easily extendable, and this format will be the one that the register command function will rely on.
 */
export interface BaseCommand {
    data: SlashCommandBuilder,
    execute(interaction: Interaction): void | unknown
}

/**
 * This is an sample `Command` class which implements `BaseCommand`. If you wish to use a different class or
 * implement your own, implement `BaseCommand` in your class.
 */
export abstract class Command implements BaseCommand {
    private readonly _module: BaseModule; /* Provide access to the main module's functions in the command class. */
    public readonly data: SlashCommandBuilder;

    protected constructor(module: CommandModule | BaseModule, data: SlashCommandBuilder) {
        this._module = module;
        this.data = data;
    }

    public abstract execute(interaction: Interaction): Promise<void | unknown>;
}