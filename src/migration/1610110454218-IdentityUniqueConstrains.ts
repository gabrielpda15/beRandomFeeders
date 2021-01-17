import {MigrationInterface, QueryRunner} from 'typeorm';

export class IdentityUniqueConstrains1610110454218 implements MigrationInterface {
    name = 'IdentityUniqueConstrains1610110454218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `identity` CHANGE `username` `username` varchar(32) NOT NULL');
        await queryRunner.query('ALTER TABLE `identity` ADD UNIQUE INDEX `IDX_b1d0a62d2325c62c1536a84024` (`username`)');
        await queryRunner.query('ALTER TABLE `identity` DROP COLUMN `passwordHash`');
        await queryRunner.query('ALTER TABLE `identity` ADD `passwordHash` varchar(256) NOT NULL');
        await queryRunner.query('ALTER TABLE `identity` CHANGE `email` `email` varchar(128) NOT NULL');
        await queryRunner.query('ALTER TABLE `identity` ADD UNIQUE INDEX `IDX_0d9005670fa2ee7dcc48842f64` (`email`)');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `identity` DROP INDEX `IDX_0d9005670fa2ee7dcc48842f64`');
        await queryRunner.query('ALTER TABLE `identity` CHANGE `email` `email` varchar(128) NOT NULL');
        await queryRunner.query('ALTER TABLE `identity` DROP COLUMN `passwordHash`');
        await queryRunner.query('ALTER TABLE `identity` ADD `passwordHash` varchar(128) NOT NULL');
        await queryRunner.query('ALTER TABLE `identity` DROP INDEX `IDX_b1d0a62d2325c62c1536a84024`');
        await queryRunner.query('ALTER TABLE `identity` CHANGE `username` `username` varchar(32) NOT NULL');
    }

}
