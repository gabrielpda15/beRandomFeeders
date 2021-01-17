import {MigrationInterface, QueryRunner} from "typeorm";

export class IdentityUUID1610567000417 implements MigrationInterface {
    name = 'IdentityUUID1610567000417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `identity` ADD `uuid` varchar(128) NOT NULL");
        await queryRunner.query("ALTER TABLE `identity` ADD UNIQUE INDEX `IDX_0bd0ba2c257649edf4ec6d6a59` (`uuid`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `identity` DROP INDEX `IDX_0bd0ba2c257649edf4ec6d6a59`");
        await queryRunner.query("ALTER TABLE `identity` DROP COLUMN `uuid`");
    }

}
