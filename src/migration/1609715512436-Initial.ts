import {MigrationInterface, QueryRunner} from 'typeorm';

export class Initial1609715512436 implements MigrationInterface {
    name = 'Initial1609715512436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `identity` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(30) NOT NULL, `passwordHash` varchar(120) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `identity`');
    }

}
