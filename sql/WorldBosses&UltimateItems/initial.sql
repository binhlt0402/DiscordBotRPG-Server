INSERT INTO itemsrarities VALUES (6, "mythic", "#FFA500");
INSERT INTO itemssoustypes VALUES (13, 'crystal'), (14, 'energy_potion');

INSERT INTO itemsbase VALUES (45, 1, 6, "unknown", 4), (46, 2, 6, "unknonw", 6), (47, 3, 6, "unknonw", 6), (48, 4, 6, "unknonw", 6), (49, 5, 6, "unknown", 13), (50, 6, 1, "unknown", 14), (51, 6, 2, "unknown", 14), (52, 6, 3, "unknown", 14), (53, 6, 4, "unknown", 14), (54, 6, 5, "unknown", 14), (55, 6, 6, "unknown", 14);
INSERT INTO `discord_bot_rpg`.`localizationitems` VALUES 
(45, "en", "Chaos Sword", "This sword is made of magic from chaos shards from another dimension."), (45, "fr", "Épée du Chaos", "Cette épée est faite de magie venant d'éclats du chaos appartenant d'une autre dimension."),

(46, "en", "Chaos Chest Armor", "This chest armor is made of magic from chaos shards from another dimension."), (46, "fr", "Ce plastron est fait de magie venant d'éclats du chaos appartenant d'une autre dimension.", ""),

(47, "en", "Chaos Leggings", "Theses leggings are made of magic from chaos shards from another dimension."), (47, "fr", "Jambières du Chaos", "Ces jambières sont faites de magie venant d'éclats du chaos appartenant d'une autre dimension."),

(48, "en", "Chaos Helmet", "This helmet is made of magic from chaos shards from another dimension."), (48, "fr", "Casque du Chaos", "Ce casque est fait de magie venant d'éclats du chaos appartenant d'une autre dimension."),

(49, "en", "Chaos Shard", "Crystallized chaos from another dimension. As you get closer you can hear screams, cries and a strange and continuous noise from this object."), (49, "fr", "Éclat de Chaos", "Du chaos cristallisé venant d'une autre dimension. En vous approchant de plus près vous pouvez entendre des cris, des pleurs et un bruit étrange et continu provenant de cet objet."),

(50, "en", "Homemade Energy Drink", "This drink is probably the least effective that exists, but you will still feel a little less tired."), (50, "fr", "Boisson Énergisante Artisanale", "Cette boisson est sûrement la moins efficace qui existe, cependant vous vous sentirez tout de même un peu moins fatigué."),

(51, "en", "Energy Drink", "One of the most popular drinks to avoid sleeping!"), (51, "fr", "Boisson Énergisante", "Une des boissons les plus répandues pour éviter de dormir !"),

(52, "en", "Exotic Energy Drink", "A drink with an extraordinary taste, surely the best on the market."), (52, "fr", "Boisson Énergisante Exotique", "Une boisson avec un goût hors du commun, sûrement ce qu'il y'a de mieux sur le marché."),

(53, "en", "Golden Energy Drink", "A golden drink is something you've never seen before! It also seems to have a very special taste!"), (53, "fr", "Boisson Énergisante Dorée", "Une boisson couleur or, c'est quelque chose de jamais vu ! Elle semble aussi avoir un goût très particulier !"),

(54, "en", "Multicoloured Energy Drink", "You are facing a magnificent spectacle, this drink is illuminated with colors. Its taste is, like its colour, just as varied."), (54, "fr", "Boisson Énergisante Multicolore", "Vous faites face à un spectacle magnifique, cette boisson est illuminée de couleurs. Son goût est, à l'instar de sa couleur tout aussi varié."),

(55, "en", "Divine Energy Drink", "This drink seems to be a gift from the gods, it shines on all sides and seems to want to be drunk at all costs."), (55, "fr", "Boisson Énergisante Divine", "Cette boisson semble être un cadeau des dieux, elle brille de toute part et semble vouloir à tout prix qu'on la boive.");


-- MySQL Workbench Synchronization
-- Generated: 2018-12-02 16:05
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Roncarlos

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE TABLE IF NOT EXISTS `discord_bot_rpg`.`bosses` (
  `idBoss` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `hpBase` BIGINT(19) UNSIGNED NOT NULL DEFAULT 1000000,
  PRIMARY KEY (`idBoss`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `discord_bot_rpg`.`localizationbosses` (
  `idBoss` INT(10) UNSIGNED NOT NULL,
  `lang` VARCHAR(5) NOT NULL,
  `nameBoss` VARCHAR(45) NOT NULL DEFAULT 'generic',
  PRIMARY KEY (`idBoss`, `lang`),
  INDEX `fk_LocalizationBosses_Languages1_idx` (`lang` ASC),
  CONSTRAINT `fk_LocalizationBosses_Bosses1`
    FOREIGN KEY (`idBoss`)
    REFERENCES `discord_bot_rpg`.`bosses` (`idBoss`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_LocalizationBosses_Languages1`
    FOREIGN KEY (`lang`)
    REFERENCES `discord_bot_rpg`.`languages` (`lang`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `discord_bot_rpg`.`regionsbosses` (
  `idBoss` INT(10) UNSIGNED NOT NULL,
  `idRegion` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`idBoss`, `idRegion`),
  INDEX `fk_RegionsBosses_Regions1_idx` (`idRegion` ASC),
  CONSTRAINT `fk_RegionsBosses_Bosses1`
    FOREIGN KEY (`idBoss`)
    REFERENCES `discord_bot_rpg`.`bosses` (`idBoss`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RegionsBosses_Regions1`
    FOREIGN KEY (`idRegion`)
    REFERENCES `discord_bot_rpg`.`regions` (`idRegion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `discord_bot_rpg`.`spawnedbosses` (
  `idSpawnedBoss` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `actualHp` BIGINT(19) UNSIGNED NOT NULL DEFAULT 100,
  `maxHp` BIGINT(19) UNSIGNED NOT NULL DEFAULT 100,
  `idBoss` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`idSpawnedBoss`),
  INDEX `fk_SpawnedBosses_Bosses1_idx` (`idBoss` ASC),
  CONSTRAINT `fk_SpawnedBosses_Bosses1`
    FOREIGN KEY (`idBoss`)
    REFERENCES `discord_bot_rpg`.`bosses` (`idBoss`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `discord_bot_rpg`.`spawnedbossesareas` (
  `idSpawnedBoss` INT(10) UNSIGNED NOT NULL,
  `idArea` INT(10) UNSIGNED NOT NULL,
  INDEX `fk_SpawnedBossesAreas_Areas1_idx` (`idArea` ASC),
  PRIMARY KEY (`idSpawnedBoss`),
  CONSTRAINT `fk_SpawnedBossesAreas_Areas1`
    FOREIGN KEY (`idArea`)
    REFERENCES `discord_bot_rpg`.`areas` (`idArea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SpawnedBossesAreas_SpawnedBosses1`
    FOREIGN KEY (`idSpawnedBoss`)
    REFERENCES `discord_bot_rpg`.`spawnedbosses` (`idSpawnedBoss`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `discord_bot_rpg`.`charactersattacks` (
  `idCharacter` INT(10) UNSIGNED NOT NULL,
  `idSpawnedBoss` INT(10) UNSIGNED NOT NULL,
  `damage` BIGINT(19) UNSIGNED NOT NULL DEFAULT 0,
  `attackCount` INT(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`idCharacter`, `idSpawnedBoss`),
  INDEX `fk_CharactersAttacks_SpawnedBosses1_idx` (`idSpawnedBoss` ASC),
  CONSTRAINT `fk_CharactersAttacks_Characters1`
    FOREIGN KEY (`idCharacter`)
    REFERENCES `discord_bot_rpg`.`characters` (`idCharacter`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CharactersAttacks_SpawnedBosses1`
    FOREIGN KEY (`idSpawnedBoss`)
    REFERENCES `discord_bot_rpg`.`spawnedbosses` (`idSpawnedBoss`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `discord_bot_rpg`.`bossspawninfo` (
  `idBoss` INT(10) UNSIGNED NOT NULL,
  `idArea` INT(10) UNSIGNED NOT NULL,
  `spawnDate` VARCHAR(255) NULL DEFAULT NULL,
  `idSpawnedBoss` INT(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`idBoss`),
  INDEX `fk_BossSpawnInfo_Areas1_idx` (`idArea` ASC),
  INDEX `fk_BossSpawnInfo_SpawnedBosses1_idx` (`idSpawnedBoss` ASC),
  CONSTRAINT `fk_BossSpawnInfo_Bosses1`
    FOREIGN KEY (`idBoss`)
    REFERENCES `discord_bot_rpg`.`bosses` (`idBoss`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BossSpawnInfo_Areas1`
    FOREIGN KEY (`idArea`)
    REFERENCES `discord_bot_rpg`.`areas` (`idArea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BossSpawnInfo_SpawnedBosses1`
    FOREIGN KEY (`idSpawnedBoss`)
    REFERENCES `discord_bot_rpg`.`spawnedbosses` (`idSpawnedBoss`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO bosses VALUES (1, 1000000), (2, 2000000), (3, 2500000), (4, 5000000);
INSERT INTO regionsbosses VALUES (1, 1), (2,2), (3,3), (4,4);
INSERT INTO localizationbosses VALUES (1, "en", "Clusters of Spirits of Ancient Adventurers"), (1, "fr", "Amas d'Esprits d'Anciens Aventuriers"),
(2, "en", "Angry Nature Spirit"), (2, "fr", "Esprit de la Nature en Colère"),
(3, "en", "Spirit of an Ancient Desert God"), (3, "fr", "Esprit d'un Ancien Dieu du Désert"), 
(4, "en", "Demon World Destroyer"), (4, "fr", "Démon Destructeur de Mondes");

CREATE TABLE IF NOT EXISTS `discord_bot_rpg`.`wbrewardstates` (
  `idSpawnedBoss` INT UNSIGNED NOT NULL,
  `state` INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`idSpawnedBoss`),
  CONSTRAINT `fk_WBRewardStates_SpawnedBosses1`
    FOREIGN KEY (`idSpawnedBoss`)
    REFERENCES `discord_bot_rpg`.`spawnedbosses` (`idSpawnedBoss`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB