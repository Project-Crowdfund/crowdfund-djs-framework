## About

crowdfund-djs-framework is a framework for building bots with [`discord.js`](https://github.com/discordjs/discord.js)

* The framework serves as a template which is easily extendable and easy to implement by using interfaces and classes.
* It is type-safe and uses <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" width="12.5"></img> 
[TypeScript](https://www.typescriptlang.org/) allowing for much easier programming and lessening the workload.
* It's object-oriented, just like discord.js and uses classes for its abstractions like the module system it uses.
* Provides you with a built-in event and slash command handler, which uses the module system allowing for multiple 
commands and events per file.
* Uses the [GNU GPL3 License](https://github.com/Project-Crowdfund/crowdfund-djs-framework/blob/main/LICENSE).

## Usage

To use crowdfund-djs-framework, you simply need to clone the git repository or use it as a template for your own.

```shell
git clone https://github.com/Project-Crowdfund/crowdfund-djs-framework
```

### Installation

**Node.js 16.9.0 or newer is required.** This is because this is the minimum node version for discord.js. Thus, everything
in this repository will at least target that version.

```shell
npm ci
yarn install
pnpm install
```

### Configuration

crowdfund-djs-framework requires a Discord Token to function, it takes this from the config directory (which is also
hidden in `.gitignore` to prevent token leaking). The JSON format is the following.

```json
{
  "token": {
    "discord": "your-discord-api-token-here",
    "discord-client-id": "your-discord-client-id-here"
  }
}
```

### Building and running

If you've done the above steps correctly, you should be able to build and run the discord bot.

The `package.json` is already provided with a few scripts for your ease of use (though, it's preferred you change things
like the name in there.)

To start your Discord bot, simply run...

```shell
npm run start
yarn run start
```

## Contributing

To contribute, please check the [contributing guidelines](https://github.com/Project-Crowdfund/crowdfund-djs-framework/blob/main/CONTRIBUTING.md) for issues, pull requests, and commits.