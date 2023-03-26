export default abstract class BaseModule {
    public readonly name: string;
    public readonly version: string;

    protected constructor(options: ModuleOptions) {
        this.name = options.name;
        this.version = options.version;
    }

    public initialize(): void {
        throw new NotImplementedError("module initialize was not implemented.");
    }

    public destroy(): void {
    }
}

export interface ModuleOptions {
    name: string,
    version: string,
    features: {
        hasSlashCommands?: boolean,
    }
}

class NotImplementedError extends Error {
}