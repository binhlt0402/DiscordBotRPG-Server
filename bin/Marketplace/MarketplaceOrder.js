﻿'use strict';
const conn = require("../../conf/mysql.js");
const Globals = require("../Globals");
const Translator = require("../Translator/Translator");
const User = require("../User.js");
const Item = require("../Item");


class MarketplaceOrder {

    constructor(idMarketplace, idItem, idCharacter, number, price) {
        this.idMarketplace = idMarketplace;
        this.idItem = idItem;
        this.idCharacter = idCharacter;
        this.number = number; 
        this.price = price;
    }

    update() {
        conn.query("UPDATE marketplacesorders SET price = ?", [this.price]);
    }

    place() {
        conn.query("INSERT INTO marketplacesorders VALUES (?,?,?,?,?)", [this.idMarketplace, this.idItem, this.idCharacter, this.number, this.price]);
    }

    remove() {
        conn.query("DELETE FROM marketplacesorders WHERE idItem = ?", [this.idItem]);
    }

    toStr(lang) {
        let item = new Item(this.idItem);
        let username = conn.query("SELECT userName FROM users WHERE idCharacter = ?", [this.idCharacter])[0]["userName"];
        return username + " - " + this.idItem + " - " + item.toStr(lang) + " - " + "x" + this.number + " - " + this.price + "G";
    }



}

module.exports = MarketplaceOrder;