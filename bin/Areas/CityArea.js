﻿'use strict';
const conn = require("../../conf/mysql.js");
const Area = require("./Area");
const Discord = require("discord.js");
const Translator = require("../Translator/Translator");
const Marketplace = require("../Marketplace/Marketplace");
const CraftingBuilding = require("../CraftSystem/CraftingBuilding");
const AreaTournament = require("../AreaTournament/AreaTournament");
const Shop = require("../Shops/Shop");

class CityArea extends Area {

    constructor(id) {
        super(id, id);
        this.services = {
            "marketplace": new Marketplace(),
            "craftingbuilding": new CraftingBuilding(),
            "shop": null,
        }

        this.authorizedBonuses = ["xp_craft"];
        this.services.marketplace.loadMakerplace(this.id);
        this.services.craftingbuilding.load(this.id);
        let res = conn.query("SELECT idShop FROM areasshops WHERE idArea = ?;", [this.id]);
        if (res[0] != null) {
            this.services.shop = new Shop(res[0].idShop);
        }
    }

    toStr(lang) {
        let tax = "";
        if (this.getOwnerID != null) {
            tax = "(" + (this.services.marketplace.getTax() * 100) + "% Tax)";
        }

        let craftingbuilding = this.getService("craftingbuilding");

        let forge;
        if (craftingbuilding != null) {
            let lvl = Translator.getString(lang, "general", "lvl");
            forge = "- Forge (Craft : " + lvl + " " + craftingbuilding.getMinLevel() + " - " + craftingbuilding.getMaxLevel() + ")";
        }

        return new Discord.RichEmbed()
            .setColor([0, 255, 0])
            .setAuthor(this.getName(lang) + " | " + this.minMaxLevelToString() + " | " + Translator.getString(lang, "area", "owned_by") + " : " + this.getOwner(lang), this.image)
            .addField(Translator.getString(lang, "general", "description"), this.getDesc(lang) + "\n\nAvancement de la ville : **" + 1 + "**")
            .addField("Services", "```- Marché " + tax + "\n" + forge + "```")
            .setImage(this.image);
    }

    toApi(lang) {
        let apiObj = super.toApi(lang);
        let craftingbuilding = this.getService("craftingbuilding");
        let shopbuilding = this.getService("shop");
        let minLevel = 0,
            maxLevel = 0,
            isActive = false,
            tax = 0;
        if (craftingbuilding != null) {
            minLevel = craftingbuilding.getMinLevel();
            maxLevel = craftingbuilding.getMaxLevel();
            isActive = craftingbuilding.isActive == true;

        }
        apiObj.craft = {
            isActive: isActive,
            minLevel: minLevel,
            maxLevel: maxLevel,
        }

        apiObj.marketplace = {
            tax: this.services.marketplace.getTax() * 100,
            isActive: true,
        }

        isActive = false;
        tax = 0;
        if (shopbuilding != null) {
            isActive = shopbuilding.isActive();
            tax = shopbuilding.getTax() * 100;
        }

        apiObj.shop = {
            isActive: isActive,
            tax: tax,
        }
        return apiObj;
    }


}



module.exports = CityArea;