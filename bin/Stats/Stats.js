'use strict';
const conn = require("../../conf/mysql.js");
const Globals = require("../Globals.js");

class Stats {

    // Generic Stats Class
    // Used by All Player/Enemies
    constructor(id) {
        this.id = id;
        this.strength = 0;
        this.intellect = 0;
        this.constitution = 0;
        this.armor = 0;
        this.dexterity = 0;
        this.charisma = 0;
        this.wisdom = 0;
        this.will = 0;
        this.perception = 0;
        this.luck = 0;
    }

    getStat(statName) {
        if (this[statName] >= 0) {
            return this[statName];
        }
        return 0;
    }

    toApi() {
        let r = {};
        let statsPossible = Object.keys(Globals.statsIds);
        //console.log(JSON.stringify(statsPossible))
        for (let i in statsPossible) {
            r[statsPossible[i]] = this[statsPossible[i]];
        }
        return r;
    }

    getOptimalArmor(level = 1) {
        return ((8 * (Math.pow(level, 2))) / 7 + 5);
    }

    getOptimalCrit(level = 1) {
        return level * 8;
    }

    getOptimalStun(level = 1) {
        return level * 8;
    }


}

async function loadPossibleStats() {
    let res = await conn.query("SELECT * FROM stats;");
    Stats.prototype.possibleStats = [];
    for (let stat of res) {
        Stats.prototype.possibleStats.push(stat.nom);
    }
}

loadPossibleStats();

module.exports = Stats;
