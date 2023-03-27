import App from "../App";

export default abstract class BaseModule {
    public readonly name: string;
    public readonly version: string;

    public readonly isCoreModule: boolean;

    protected constructor(opt: ModuleOptions) {
        this.name = opt.name;
        this.version = opt.version;
        this.isCoreModule = opt.features.isCoreModule || false;
    }

    public abstract initialize(client: App): void;

    public abstract destroy(client: App): void;
}

export interface ModuleOptions {
    name: string,
    version: string,
    features: {
        hasSlashCommands?: boolean,
        hasEvents?: boolean,
        isCoreModule?: boolean,
    }
}
