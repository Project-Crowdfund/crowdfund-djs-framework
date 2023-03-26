import * as fs from "node:fs/promises";
import * as path from "node:path";

import {Client, Collection} from "discord.js";

import BaseModule from "src/classes/BaseModule";

export default class ModuleManager extends Collection<string, BaseModule> {
    private static readonly moduleDirectory: string = path.join(__dirname, "../modules");
    private client: Client;

    public constructor(client: Client) {
        super();
        this.client = client;
    }

    public async importModule(path: string): Promise<void> {
        let stat = fs.stat(path);

        if (!(path.endsWith('.ts') || path.endsWith('.js'))) throw new InvalidModule("Wrong file extension, did you type a typo?");
        if (!(await stat).isFile()) throw new InvalidModule("Not a file, maybe check in the directory?");

        await this._importModule(path);
    }

    public async removeModule(name: string): Promise<void> {
        this.get(name).destroy();
        this.delete(name);
        console.log(`Removed module ${name}.`)
    }

    public async loadModules(): Promise<void> {
        const files = (await fs.readdir(ModuleManager.moduleDirectory))
            .filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

        for (const file of files) {
            const filePath = path.join(ModuleManager.moduleDirectory);
            try {
                await this._importModule(filePath);
            } catch (error) {
                console.error(`Module ${file} could not be imported into ModuleManager. ${error}`)
            }
        }
    }

    /* Internal function for importing modules (doesn't check if the path is valid) */
    private async _importModule(path: string) {
        let module = (await import(path)).default;
        let instance: BaseModule = new module(this.client);

        if (!(instance instanceof BaseModule)) throw new InvalidModule("Default import is not a subclass of BaseModule.");

        this.set(instance.name, instance)
        console.log(`Imported module ${instance.name}`);
    }
}

class InvalidModule extends Error {
}
