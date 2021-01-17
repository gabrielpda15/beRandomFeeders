import {MigrationInterface, QueryRunner} from "typeorm";

export class TournamentComplement1610146166734 implements MigrationInterface {
    name = 'TournamentComplement1610146166734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `tournament` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(100) NOT NULL, `description` text NOT NULL, `prize` text NOT NULL, `openingDate` date NOT NULL, `expirationDate` date NOT NULL, `ended` tinyint NOT NULL, `ruleId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tournament_date` (`id` int NOT NULL AUTO_INCREMENT, `start` date NOT NULL, `end` date NOT NULL, `time` timestamp NOT NULL, `title` varchar(128) NOT NULL, `tournamentId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `subscription` (`uuid` varchar(32) NOT NULL, `description` text NOT NULL, `observation` text NOT NULL, `denied` tinyint NOT NULL, `main` tinyint NOT NULL, `identityId` int NOT NULL, `tournamentId` int NOT NULL, PRIMARY KEY (`identityId`, `tournamentId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `rule` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `rule` ADD `description` text NOT NULL");
        await queryRunner.query("ALTER TABLE `tournament` ADD CONSTRAINT `FK_1339355c8a1ac84e4075a6ac5a8` FOREIGN KEY (`ruleId`) REFERENCES `rule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `tournament_date` ADD CONSTRAINT `FK_ccb7a1067a38adf5f0448f518b6` FOREIGN KEY (`tournamentId`) REFERENCES `tournament`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `subscription` ADD CONSTRAINT `FK_a4fbfada88ef11d1a0fdee928d1` FOREIGN KEY (`identityId`) REFERENCES `identity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `subscription` ADD CONSTRAINT `FK_3dd3f959ebf8a23a890ee7fed58` FOREIGN KEY (`tournamentId`) REFERENCES `tournament`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `subscription` DROP FOREIGN KEY `FK_3dd3f959ebf8a23a890ee7fed58`");
        await queryRunner.query("ALTER TABLE `subscription` DROP FOREIGN KEY `FK_a4fbfada88ef11d1a0fdee928d1`");
        await queryRunner.query("ALTER TABLE `tournament_date` DROP FOREIGN KEY `FK_ccb7a1067a38adf5f0448f518b6`");
        await queryRunner.query("ALTER TABLE `tournament` DROP FOREIGN KEY `FK_1339355c8a1ac84e4075a6ac5a8`");
        await queryRunner.query("ALTER TABLE `rule` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `rule` ADD `description` varchar(16000) NOT NULL");
        await queryRunner.query("DROP TABLE `subscription`");
        await queryRunner.query("DROP TABLE `tournament_date`");
        await queryRunner.query("DROP TABLE `tournament`");
    }

}
