const Globals = require("./bin/Globals.js");
const Translator = require("./bin/Translator/Translator");
const Discord = require("discord.js");
const Key = require("./conf/botkey.js");
const FightManager = require("./bin/FightManager");
const crypto = require("crypto");
const AreasManager = require("./bin/Areas/AreasManager.js");
const conf = require("./conf/conf");
const DatabaseInitializer = require("./bin/DatabaseInitializer");
const ModuleHandler = require("./bin/Modules/ModuleHandler");
const DBL = require("dblapi.js");
const dbl = new DBL(conf.discordbotskey, bot);

var bot = new Discord.Client();

var timeStart = Date.now();
let syncStartWith = Date.now();
let totalGameStartTime = Date.now();

process.on('unhandledRejection', up => {
    throw up
});


console.log("Shard id: " + bot.shard.id + " Starting ...");

//console.log(Globals);

bot.on("ready", () => {
    console.log("Bot Connected");

    bot.user.setPresence({
        game: {
            name: "On " + bot.guilds.size + " guilds !",
        },
    });

    if (conf.env === "prod") {

        setInterval(() => {
            console.log("(Shard : " + bot.shard.id + ")Sending stats to https://discordbots.org/ ...");
            dbl.postStats(bot.guilds.size, bot.shard.id, bot.shard.count);
            console.log("Data sent");
        }, 1800000);
    }

    console.log("Loading servers stats ...");
    DatabaseInitializer.serversStats(bot.guilds);
    console.log("Servers stats loaded");

    console.log("Shard : " + bot.shard.id + " ready");
    console.log("Shard : " + bot.shard.id + " load finished, took : " + ((Date.now() - timeStart) / 1000) + " seconds");

});

// Key Don't open
bot.login(Key);

let moduleHandler = new ModuleHandler();

// UNDER CONSTRUCTION SUBJECT TO CHANGE
var connectedUsers = {};
var connectedGuilds = {};

Globals.connectedUsers = connectedUsers;
Globals.connectedGuilds = connectedGuilds;

syncStartWith = Date.now();
console.log("Loading Areas...");
Globals.areasManager = new AreasManager();
console.log("Areas loaded, took : " + ((Date.now() - syncStartWith) / 1000) + " seconds");


syncStartWith = Date.now();
console.log("Loading Fight Manager...");
Globals.fightManager = new FightManager();
console.log("Fight Manager loaded, took : " + ((Date.now() - syncStartWith) / 1000) + " seconds");
Globals.discordClient = bot;

console.log("Game World loaded, took : " + ((Date.now() - totalGameStartTime) / 1000) + " seconds");




bot.on('message', async (message) => {
    try {
        await moduleHandler.run(message);
    } catch (err) {
        let msgError = "Oops something goes wrong, report the issue here (https://github.com/FightRPG-DiscordBotRPG/FightRPG-Discord-BugTracker/issues)\n";

        let errorsLines = err.stack.split("\n");
        let nameAndLine = errorsLines[1].split(" ");
        nameAndLine = nameAndLine[nameAndLine.length - 1].split("\\");
        nameAndLine = nameAndLine[nameAndLine.length - 1].split(")")[0];

        msgError += "```js\n" + errorsLines[0] + "\nat " + nameAndLine + "\n```";

        console.log(err);
        message.channel.send(msgError).catch((e) => null);
    }

});

bot.on('guildCreate', (guild) => {
    bot.user.setPresence({
        game: {
            name: "On " + bot.guilds.size + " guilds !",
        },
    });
    DatabaseInitializer.newGuild(guild);
});

bot.on('guildDelete', () => {
    bot.user.setPresence({
        game: {
            name: "On " + bot.guilds.size + " guilds !",
        },
    });
});