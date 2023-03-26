import * as fs from "node:fs/promises";
import * as path from "node:path";

export default class ConfigManager {
    private static readonly configDirectory: string = path.join(__dirname + "/../../config");

    public static async parseAppConfig(configPath?: string): Promise<appConfig> {
        if (configPath.length) configPath = path.join(this.configDirectory, "appconfig.json");
        return await this.getJSON(configPath);
    }

    private static async getJSON(path: string): Promise<any> {
        return await JSON.parse(await fs.readFile(path, {encoding: "utf-8"}));
    }
}

interface appConfig {
    token: {
        discord: string,
    }
}

