﻿'use strict';
const Area = require("./Area");
const Globals = require("../Globals");
const conn = require("../../conf/mysql");

class DungeonArea extends Area {

    constructor(id) {
        super(id, id);
        this.fightPossible = true;
        this.authorizedBonuses = ["xp_fight", "xp_collect", "gold_drop", "item_drop", "collect_drop"];
    }

    async isFirstFloor() {
        if (this.paths.from.length >= 1) {
            if (this.paths.from.length === 1) {
                return Globals.areasManager.getArea(this.paths.from[0]).constructor !== DungeonArea;
            } else {
                let fromArea = Globals.areasManager.getArea(this.paths.from[0]);
                for (let idArea of this.paths.from) {
                    fromArea = Globals.areasManager.getArea(idArea);
                    if (fromArea.constructor !== DungeonArea) {
                        return true;
                    }
                }
            }
        } else {
            // = 0 Meaning no link OR not loaded 
            // Then we do a request to be sure
            // This is useful when areas are loaded
            let res = await conn.query("SELECT * FROM areaspaths INNER JOIN areas ON areas.idArea = areaspaths.idArea1 WHERE idArea2 = ?", [this.id]);
            for (let item of res) {
                if (item.idAreaType != 3) {
                    return true;
                }
            }
        }
        return false;
    }

    async isLastFloor() {
        if (this.paths.to.length >= 1) {
            if (this.paths.to.length === 1) {
                return Globals.areasManager.getArea(this.paths.to[0]).constructor !== DungeonArea;
            } else {
                for (let idArea of this.paths.to) {
                    let toArea = Globals.areasManager.getArea(idArea);
                    if (toArea.constructor === DungeonArea) {
                        return false;
                    }
                }
            }
        } else {
            // = 0 Meaning no link OR not loaded 
            // Then we do a request to be sure
            // This is useful when areas are loaded
            let res = await conn.query("SELECT * FROM areaspaths INNER JOIN areas ON areas.idArea = areaspaths.idArea2 WHERE idArea1 = ?", [this.id]);
            for (let item of res) {
                if (item.idAreaType === 3) {
                    return false;
                }
            }
        }

        return true;
    }

    getEntrance() {
        let area = this;
        while (Globals.areasManager.getArea(area.paths.from[0]).constructor === DungeonArea) {
            area = Globals.areasManager.getArea(area.paths.from[0]);
        }
        return Globals.areasManager.getArea(area.paths.from[0]);
    }

    getNextFloorOrExit() {
        if (this.paths.to.length === 1) {
            return Globals.areasManager.getArea(this.paths.to[0]);
        } else {
            let areaToReturn = Globals.areasManager.getArea(this.paths.to[0]);
            for (let idArea of this.paths.to) {
                areaToReturn = Globals.areasManager.getArea(idArea)
                if (areaToReturn.constructor === DungeonArea) {
                    return areaToReturn;
                }
            }
            return areaToReturn;
        }
    }

    async canTravelTo() {
        return await this.isFirstFloor();
    }
}

module.exports = DungeonArea;