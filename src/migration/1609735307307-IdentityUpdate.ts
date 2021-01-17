import {MigrationInterface, QueryRunner} from 'typeorm';

export class IdentityUpdate1609735307307 implements MigrationInterface {
    name = 'IdentityUpdate1609735307307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `identity` ADD `firstName` varchar(32) NOT NULL');
        await queryRunner.query('ALTER TABLE `identity` ADD `lastName` varchar(128) NOT NULL');
        await queryRunner.query('ALTER TABLE `identity` ADD `email` varchar(128) NOT NULL');
        await queryRunner.query('ALTER TABLE `identity` ADD `discord` varchar(32) NOT NULL');
        await queryRunner.query('ALTER TABLE `identity` ADD `nickLol` varchar(32) NOT NULL');
        await queryRunner.query('ALTER TABLE `identity` DROP COLUMN `username`');
        await queryRunner.query('ALTER TABLE `identity` ADD `username` varchar(32) NOT NULL');
        await queryRunner.query('ALTER TABLE `identity` DROP COLUMN `passwordHash`');
        await queryRunner.query('ALTER TABLE `identity` ADD `passwordHash` varchar(128) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `identity` DROP COLUMN `passwordHash`');
        await queryRunner.query('ALTER TABLE `identity` ADD `passwordHash` varchar(120) NOT NULL');
        await queryRunner.query('ALTER TABLE `identity` DROP COLUMN `username`');
        await queryRunner.query('ALTER TABLE `identity` ADD `username` varchar(30) NOT NULL');
        await queryRunner.query('ALTER TABLE `identity` DROP COLUMN `nickLol`');
        await queryRunner.query('ALTER TABLE `identity` DROP COLUMN `discord`');
        await queryRunner.query('ALTER TABLE `identity` DROP COLUMN `email`');
        await queryRunner.query('ALTER TABLE `identity` DROP COLUMN `lastName`');
        await queryRunner.query('ALTER TABLE `identity` DROP COLUMN `firstName`');
    }

}
