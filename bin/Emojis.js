const conf = require("../conf/conf");

class Emojis {
    static getID(emojiName) {
        let em;
        if(conf.env === "prod") {
            em = Emojis.emojisProd[emojiName];
        } else {
            em = Emojis.emojisDev[emojiName];
        }
        return em != null ? em.id : Emojis.general[emojiName];
    }

    static getString(emojiName) {
        let em;
        if(conf.env === "prod") {
            em = Emojis.emojisProd[emojiName];
        } else {
            em = Emojis.emojisDev[emojiName];
        }
        return em != null ? em.string : Emojis.general[emojiName];
    }
}

Emojis.emojisProd = {
    "vmark" : {id : "314349398811475968", string: "<:check:314349398811475968>"},
    "xmark" : {id : "314349398824058880", string: "<:xmark:314349398824058880>"},
    "treasure": {id : "403457812535181313", string: "<:treasure:403457812535181313>"},
    "levelup": {id : "403456740139728906", string: "<:levelup:403456740139728906>"},
};
Emojis.emojisDev = {
    "vmark" : {id : "403148210295537664", string: ":vmark:"},
    "xmark" : {id : "403149357387350016", string: ":xmark:"},
    "treasure": {id : "403457812535181313", string: "<:treasure:403457812535181313>"},
    "levelup": {id : "403456740139728906", string: "<:levelup:403456740139728906>"},
};

Emojis.general = {
    "one" : "1⃣",
    "two" : "2⃣",
    "three" : "3⃣",
    "four" : "4⃣",
    "five" : "5⃣",
    "six" : "6⃣",
    "seven" : "7⃣",
    "eight" : "8⃣",
    "nine" : "9⃣",
    "red_circle" : "🔴",
    "blue_circle" : "🔵",
}

module.exports = Emojis;