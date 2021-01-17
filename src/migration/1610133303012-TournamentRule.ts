import {MigrationInterface, QueryRunner} from "typeorm";

export class TournamentRule1610133303012 implements MigrationInterface {
    name = 'TournamentRule1610133303012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `rule` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(80) NOT NULL, `description` varchar(16000) NOT NULL, `icon` varchar(32) NOT NULL, `initials` varchar(16) NOT NULL, `bg` varchar(16) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `rule`");
    }

}
